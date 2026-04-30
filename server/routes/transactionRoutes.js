const express = require('express')
const { body } = require('express-validator')
const { protect, adminOnly } = require('../middleware/auth')
const { getTransactions, getAllTransactions, createTransaction } = require('../controllers/transactionController')

const router = express.Router()

const transactionValidation = [
  body('order').notEmpty().withMessage('Order reference is required'),
  body('amount').isFloat({ min: 0 }).withMessage('Amount must be zero or greater'),
  body('reference').optional({ checkFalsy: true }).trim().isLength({ min: 4 }).withMessage('Transaction reference is invalid'),
  body('provider').optional({ checkFalsy: true }).trim().isLength({ min: 2 }).withMessage('Provider must be at least 2 characters'),
  body('channel').optional({ checkFalsy: true }).trim().isLength({ min: 2 }).withMessage('Channel must be at least 2 characters'),
  body('currency').optional({ checkFalsy: true }).trim().isLength({ min: 3, max: 3 }).withMessage('Currency must be a 3-letter code'),
  body('status').optional().isIn(['pending', 'success', 'failed', 'refunded']).withMessage('Invalid transaction status'),
]

router.get('/', protect, getTransactions)
router.get('/all', protect, adminOnly, getAllTransactions)
router.post('/', protect, transactionValidation, createTransaction)

module.exports = router
