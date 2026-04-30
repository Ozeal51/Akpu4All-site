const express = require('express')
const { body } = require('express-validator')
const { protect, adminOnly } = require('../middleware/auth')
const { getOrders, getAllOrders, getOrder, createOrder, updateOrderStatus } = require('../controllers/orderController')

const router = express.Router()

const orderValidation = [
  body('items').isArray({ min: 1 }).withMessage('Order must include at least one item'),
  body('customer.name').optional({ checkFalsy: true }).trim().isLength({ min: 2 }).withMessage('Customer name must be at least 2 characters'),
  body('customer.email').optional({ checkFalsy: true }).isEmail().withMessage('Customer email must be valid').normalizeEmail(),
  body('delivery.address').optional({ checkFalsy: true }).trim().isLength({ min: 4 }).withMessage('Delivery address must be at least 4 characters'),
  body('paymentMethod').optional().isIn(['cash_on_delivery', 'transfer', 'card']).withMessage('Invalid payment method'),
  body('paymentStatus').optional().isIn(['pending', 'paid', 'failed', 'refunded']).withMessage('Invalid payment status'),
  body('source').optional().isIn(['web', 'mobile', 'admin', 'seed']).withMessage('Invalid order source'),
]

const statusValidation = [
  body('status').optional().isIn(['pending', 'confirmed', 'preparing', 'out_for_delivery', 'completed', 'cancelled']).withMessage('Invalid order status'),
  body('paymentStatus').optional().isIn(['pending', 'paid', 'failed', 'refunded']).withMessage('Invalid payment status'),
]

router.get('/', protect, adminOnly, getAllOrders)
router.get('/mine', protect, getOrders)
router.get('/:id', protect, getOrder)
router.post('/', protect, orderValidation, createOrder)
router.patch('/:id/status', protect, adminOnly, statusValidation, updateOrderStatus)

module.exports = router
