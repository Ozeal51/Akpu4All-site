const { validationResult } = require('express-validator')
const mongoose = require('mongoose')
const Vendors = require('../models/Vendors')

const normalizeVendor = (vendor) => ({
  id: vendor._id,
  businessName: vendor.businessName,
  slug: vendor.slug,
  contactPerson: vendor.contactPerson,
  description: vendor.description,
  email: vendor.email,
  phone: vendor.phone,
  logo: vendor.logo,
  category: vendor.category,
  address: vendor.address,
  city: vendor.city,
  state: vendor.state,
  status: vendor.status,
  isActive: vendor.isActive,
  commissionRate: vendor.commissionRate,
  minimumOrderAmount: vendor.minimumOrderAmount,
  rating: vendor.rating,
  openingHours: vendor.openingHours,
  socialLinks: vendor.socialLinks,
  serviceAreas: vendor.serviceAreas,
  createdAt: vendor.createdAt,
  updatedAt: vendor.updatedAt,
})

const getVendors = async (req, res) => {
  const vendors = await Vendors.find().sort({ createdAt: -1 })
  res.status(200).json({ success: true, count: vendors.length, vendors: vendors.map(normalizeVendor) })
}

const getVendor = async (req, res) => {
  const vendor = mongoose.isValidObjectId(req.params.id)
    ? await Vendors.findById(req.params.id)
    : await Vendors.findOne({ slug: req.params.id.toLowerCase() })

  if (!vendor) {
    return res.status(404).json({ success: false, message: 'Vendor not found' })
  }

  res.status(200).json({ success: true, vendor: normalizeVendor(vendor) })
}

const createVendor = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() })
  }

  const vendor = await Vendors.create(req.body)
  res.status(201).json({ success: true, vendor: normalizeVendor(vendor) })
}

const updateVendor = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() })
  }

  const vendor = mongoose.isValidObjectId(req.params.id)
    ? await Vendors.findById(req.params.id)
    : await Vendors.findOne({ slug: req.params.id.toLowerCase() })

  if (!vendor) {
    return res.status(404).json({ success: false, message: 'Vendor not found' })
  }

  Object.assign(vendor, req.body)
  await vendor.save()
  res.status(200).json({ success: true, vendor: normalizeVendor(vendor) })
}

const deleteVendor = async (req, res) => {
  const vendor = mongoose.isValidObjectId(req.params.id)
    ? await Vendors.findById(req.params.id)
    : await Vendors.findOne({ slug: req.params.id.toLowerCase() })

  if (!vendor) {
    return res.status(404).json({ success: false, message: 'Vendor not found' })
  }

  await vendor.deleteOne()
  res.status(200).json({ success: true, message: 'Vendor deleted successfully' })
}

module.exports = { getVendors, getVendor, createVendor, updateVendor, deleteVendor }
