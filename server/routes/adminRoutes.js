const express = require('express')
const { body } = require('express-validator')
const { protect, adminOnly } = require('../middleware/auth')
const { getSummary, getAdminProfiles, createAdminProfile } = require('../controllers/adminController')

const router = express.Router()

const adminProfileValidation = [
  body('user').notEmpty().withMessage('User id is required'),
  body('displayName').optional({ checkFalsy: true }).trim().isLength({ min: 2 }).withMessage('Display name must be at least 2 characters'),
  body('permissions').optional().isArray().withMessage('Permissions must be an array'),
]

router.get('/summary', protect, adminOnly, getSummary)
router.get('/profiles', protect, adminOnly, getAdminProfiles)
router.post('/profiles', protect, adminOnly, adminProfileValidation, createAdminProfile)

module.exports = router
