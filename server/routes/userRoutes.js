const express = require('express')
const { body } = require('express-validator')
const { protect, adminOnly } = require('../middleware/auth')

const router = express.Router()

// User management controllers (to be created in userController.js)
// For now, these placeholder functions show the intended structure
const getUsers = async (req, res) => {
  try {
    const User = require('../models/User')
    const users = await User.find().select('-password').sort({ createdAt: -1 })
    res.status(200).json({
      success: true,
      count: users.length,
      users: users.map((u) => ({
        id: u._id,
        name: u.name,
        email: u.email,
        phone: u.phone,
        role: u.role,
        status: u.status,
        isVerified: u.isVerified,
        lastLoginAt: u.lastLoginAt,
        createdAt: u.createdAt,
      })),
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching users' })
  }
}

const getUserById = async (req, res) => {
  try {
    const User = require('../models/User')
    const user = await User.findById(req.params.id).select('-password')

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        isVerified: user.isVerified,
        lastLoginAt: user.lastLoginAt,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching user' })
  }
}

const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body
    const User = require('../models/User')

    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    user.status = status || user.status
    await user.save()

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        isVerified: user.isVerified,
        lastLoginAt: user.lastLoginAt,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error updating user' })
  }
}

const deleteUser = async (req, res) => {
  try {
    const User = require('../models/User')

    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    res.status(200).json({ success: true, message: 'User deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error deleting user' })
  }
}

// Validation rules
const statusValidation = [body('status').optional().isIn(['active', 'inactive', 'banned']).withMessage('Invalid user status')]

// Routes
router.get('/', protect, adminOnly, getUsers)
router.get('/:id', protect, adminOnly, getUserById)
router.patch('/:id/status', protect, adminOnly, statusValidation, updateUserStatus)
router.delete('/:id', protect, adminOnly, deleteUser)

module.exports = { router, getUsers, getUserById, updateUserStatus, deleteUser }
