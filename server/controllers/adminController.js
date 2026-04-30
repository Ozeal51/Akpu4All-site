const { validationResult } = require('express-validator')
const User = require('../models/User')
const Product = require('../models/Product')
const Order = require('../models/Order')
const Transactions = require('../models/Transactions')
const Vendors = require('../models/Vendors')
const Admin = require('../models/Admin')

const getSummary = async (req, res) => {
  const [users, products, orders, transactions, vendors, admins] = await Promise.all([
    User.countDocuments(),
    Product.countDocuments(),
    Order.countDocuments(),
    Transactions.countDocuments(),
    Vendors.countDocuments(),
    Admin.countDocuments(),
  ])

  const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5).select('orderNumber status pricing createdAt')
  const recentProducts = await Product.find().sort({ createdAt: -1 }).limit(5).select('name price category isAvailable createdAt')

  res.status(200).json({
    success: true,
    summary: { users, products, orders, transactions, vendors, admins },
    recentOrders,
    recentProducts,
  })
}

const getAdminProfiles = async (req, res) => {
  const profiles = await Admin.find().populate('user', 'name email role status').sort({ createdAt: -1 })
  res.status(200).json({ success: true, count: profiles.length, admins: profiles })
}

const createAdminProfile = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() })
  }

  const existingUser = await User.findById(req.body.user)
  if (!existingUser) {
    return res.status(404).json({ success: false, message: 'User not found' })
  }

  const existingAdmin = await Admin.findOne({ user: req.body.user })
  if (existingAdmin) {
    return res.status(409).json({ success: false, message: 'Admin profile already exists for this user' })
  }

  const admin = await Admin.create({
    user: req.body.user,
    displayName: req.body.displayName || existingUser.name,
    roleLevel: req.body.roleLevel || 'manager',
    permissions: Array.isArray(req.body.permissions) ? req.body.permissions : [],
    isSuperAdmin: Boolean(req.body.isSuperAdmin),
    status: req.body.status || 'active',
    notes: req.body.notes || '',
  })

  res.status(201).json({ success: true, admin })
}

module.exports = { getSummary, getAdminProfiles, createAdminProfile }
