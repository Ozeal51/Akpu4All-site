const express = require('express')
const { body } = require('express-validator')
const { protect, adminOnly } = require('../middleware/auth')
const { getVendors, getVendor, createVendor, updateVendor, deleteVendor } = require('../controllers/vendorController')

const router = express.Router()

const vendorValidation = [
  body('businessName').trim().notEmpty().withMessage('Business name is required'),
  body('email').optional({ checkFalsy: true }).isEmail().withMessage('Please provide a valid vendor email').normalizeEmail(),
  body('phone').optional({ checkFalsy: true }).trim().isLength({ min: 7, max: 20 }).withMessage('Phone number is invalid'),
  body('commissionRate').optional().isFloat({ min: 0, max: 100 }).withMessage('Commission rate must be between 0 and 100'),
  body('minimumOrderAmount').optional().isFloat({ min: 0 }).withMessage('Minimum order amount must be zero or greater'),
]

router.get('/', getVendors)
router.get('/:id', getVendor)
router.post('/', protect, adminOnly, vendorValidation, createVendor)
router.put('/:id', protect, adminOnly, vendorValidation, updateVendor)
router.delete('/:id', protect, adminOnly, deleteVendor)

module.exports = router
