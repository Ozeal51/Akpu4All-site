const { validationResult } = require('express-validator')
const mongoose = require('mongoose')
const Order = require('../models/Order')
const Product = require('../models/Product')

const normalizeOrder = (order) => ({
  id: order._id,
  orderNumber: order.orderNumber,
  source: order.source,
  user: order.user,
  items: order.items,
  customer: order.customer,
  pricing: order.pricing,
  delivery: order.delivery,
  statusHistory: order.statusHistory,
  status: order.status,
  paymentMethod: order.paymentMethod,
  paymentStatus: order.paymentStatus,
  paymentReference: order.paymentReference,
  notes: order.notes,
  fulfilledAt: order.fulfilledAt,
  createdAt: order.createdAt,
  updatedAt: order.updatedAt,
})

const resolveItems = async (items = []) => {
  const resolved = []

  for (const item of items) {
    const productRef = item.product || item.productId
    const product = productRef
      ? await Product.findById(productRef)
      : await Product.findOne({ $or: [{ name: item.productName }, { slug: (item.slug || '').toLowerCase() }] })

    const productName = item.productName || item.name || product?.name
    if (!productName) continue

    const price = Number(item.price ?? product?.price ?? 0)
    const quantity = Math.max(1, Number(item.quantity ?? 1))

    resolved.push({
      product: product?._id,
      productName,
      image: item.image || product?.image || '',
      category: item.category || product?.category || '',
      price,
      quantity,
      lineTotal: price * quantity,
    })
  }

  return resolved
}

const getOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 })
  res.status(200).json({ success: true, count: orders.length, orders: orders.map(normalizeOrder) })
}

const getAllOrders = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 }).populate('user', 'name email role')
  res.status(200).json({ success: true, count: orders.length, orders: orders.map(normalizeOrder) })
}

const getOrder = async (req, res) => {
  const { id } = req.params
  const order = await Order.findById(id).populate('user', 'name email role')

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' })
  }

  if (req.user.role !== 'admin' && String(order.user?._id || order.user) !== String(req.user.id)) {
    return res.status(403).json({ success: false, message: 'Not authorized to view this order' })
  }

  res.status(200).json({ success: true, order: normalizeOrder(order) })
}

const createOrder = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() })
  }

  const items = await resolveItems(req.body.items)
  if (!items.length) {
    return res.status(400).json({ success: false, message: 'Order must contain at least one valid item' })
  }

  const order = await Order.create({
    user: req.user.id,
    source: req.body.source || 'web',
    items,
    customer: req.body.customer || {},
    pricing: req.body.pricing || {},
    status: req.body.status,
    paymentMethod: req.body.paymentMethod,
    paymentStatus: req.body.paymentStatus,
    paymentReference: req.body.paymentReference,
    delivery: req.body.delivery || {},
    notes: req.body.notes || '',
  })

  res.status(201).json({ success: true, order: normalizeOrder(order) })
}

const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' })
  }

  const { status, paymentStatus, delivery, note } = req.body
  const currentDelivery = typeof order.delivery?.toObject === 'function' ? order.delivery.toObject() : order.delivery || {}

  if (status && status !== order.status) {
    order.status = status
    order.statusHistory.push({ status, note: note || `Status updated to ${status}`, changedBy: req.user?.id || null })
    if (status === 'completed') {
      order.fulfilledAt = new Date()
    }
  }

  if (paymentStatus) order.paymentStatus = paymentStatus
  if (delivery) order.delivery = { ...currentDelivery, ...delivery }

  await order.save()
  res.status(200).json({ success: true, order: normalizeOrder(order) })
}

module.exports = { getOrders, getAllOrders, getOrder, createOrder, updateOrderStatus }
