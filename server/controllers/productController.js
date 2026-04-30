const { validationResult } = require('express-validator')
const mongoose = require('mongoose')
const Product = require('../models/Product')

const toSlug = (value = '') =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const buildFilters = (query) => {
  const filter = {}

  if (query.menuType) filter.menuType = query.menuType
  if (query.category) filter.category = new RegExp(query.category, 'i')
  if (query.featured === 'true') filter.isFeatured = true
  if (query.available === 'true') filter.isAvailable = true
  if (query.status) filter.status = query.status
  if (query.visibility) filter.visibility = query.visibility

  if (query.search) {
    filter.$or = [
      { name: new RegExp(query.search, 'i') },
      { description: new RegExp(query.search, 'i') },
      { category: new RegExp(query.search, 'i') },
      { tags: new RegExp(query.search, 'i') },
    ]
  }

  return filter
}

const normalizeProduct = (product) => ({
  id: product._id,
  name: product.name,
  slug: product.slug,
  description: product.description,
  price: product.price,
  currency: product.currency,
  category: product.category,
  menuType: product.menuType,
  status: product.status,
  visibility: product.visibility,
  image: product.image,
  images: product.images,
  tags: product.tags,
  priceBreakdown: product.priceBreakdown,
  stock: product.stock,
  servings: product.servings,
  preparationTime: product.preparationTime,
  isFeatured: product.isFeatured,
  isAvailable: product.isAvailable,
  rating: product.rating,
  sortOrder: product.sortOrder,
  createdAt: product.createdAt,
  updatedAt: product.updatedAt,
})

const getProducts = async (req, res) => {
  const filter = buildFilters(req.query)
  const products = await Product.find(filter).sort({ sortOrder: 1, isFeatured: -1, createdAt: -1 })

  res.status(200).json({
    success: true,
    count: products.length,
    products: products.map(normalizeProduct),
  })
}

const getProduct = async (req, res) => {
  const { id } = req.params
  const product = mongoose.isValidObjectId(id)
    ? await Product.findById(id)
    : await Product.findOne({ slug: id.toLowerCase() })

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' })
  }

  res.status(200).json({ success: true, product: normalizeProduct(product) })
}

const createProduct = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() })
  }

  const payload = { ...req.body }
  payload.slug = payload.slug || toSlug(payload.name)
  const product = await Product.create(payload)

  res.status(201).json({ success: true, product: normalizeProduct(product) })
}

const updateProduct = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() })
  }

  const { id } = req.params
  const product = mongoose.isValidObjectId(id)
    ? await Product.findById(id)
    : await Product.findOne({ slug: id.toLowerCase() })

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' })
  }

  Object.assign(product, req.body)
  if (req.body.name && !req.body.slug) {
    product.slug = toSlug(req.body.name)
  }

  await product.save()
  res.status(200).json({ success: true, product: normalizeProduct(product) })
}

const deleteProduct = async (req, res) => {
  const { id } = req.params
  const product = mongoose.isValidObjectId(id)
    ? await Product.findById(id)
    : await Product.findOne({ slug: id.toLowerCase() })

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' })
  }

  await product.deleteOne()
  res.status(200).json({ success: true, message: 'Product deleted successfully' })
}

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct }
