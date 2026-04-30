const { validationResult } = require('express-validator')
const User = require('../models/User')
const { sendTokenResponse } = require('../utils/generateToken')

const register = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() })
  }

  const { name, email, password, phone } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already in use' })
    }

    const user = await User.create({ name, email, password, phone: phone || '' })
    sendTokenResponse(user, 201, res)
  } catch (error) {
    console.error('Register Error:', error)
    res.status(500).json({ success: false, message: 'Server error during registration' })
  }
}

const login = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() })
  }

  const { email, password } = req.body

  try {
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' })
    }

    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' })
    }

    user.lastLoginAt = new Date()
    await user.save({ validateBeforeSave: false })

    sendTokenResponse(user, 200, res)
  } catch (error) {
    console.error('Login Error:', error)
    res.status(500).json({ success: false, message: 'Server error during login' })
  }
}

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
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
        avatar: user.avatar,
        role: user.role,
        status: user.status,
        isVerified: user.isVerified,
        lastLoginAt: user.lastLoginAt,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

const updateProfile = async (req, res) => {
  try {
    const { name, phone, avatar } = req.body
    const updates = {}
    if (name) updates.name = name
    if (phone !== undefined) updates.phone = phone
    if (avatar !== undefined) updates.avatar = avatar

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    })

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
        avatar: user.avatar,
        role: user.role,
        status: user.status,
        isVerified: user.isVerified,
        lastLoginAt: user.lastLoginAt,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error updating profile' })
  }
}

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ success: false, message: 'Please provide current and new password' })
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' })
  }

  try {
    const user = await User.findById(req.user.id).select('+password')
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    const isMatch = await user.matchPassword(currentPassword)
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' })
    }

    user.password = newPassword
    await user.save()

    res.status(200).json({ success: true, message: 'Password updated successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

module.exports = { register, login, getMe, updateProfile, changePassword }
