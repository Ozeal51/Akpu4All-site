const express = require('express')
const { body } = require('express-validator')
const { register, login, getMe, updateProfile, changePassword } = require('../controllers/authController')
const { protect } = require('../middleware/auth')

const router = express.Router()

const registerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').optional({ checkFalsy: true }).trim().isLength({ min: 7, max: 20 }).withMessage('Phone number is invalid'),
]

const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
]

const profileValidation = [
  body('name').optional({ checkFalsy: true }).trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('phone').optional({ checkFalsy: true }).trim().isLength({ min: 7, max: 20 }).withMessage('Phone number is invalid'),
  body('avatar').optional({ checkFalsy: true }).isURL().withMessage('Avatar must be a valid URL'),
]

const changePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
]

router.post('/register', registerValidation, register)
router.post('/login', loginValidation, login)
router.get('/me', protect, getMe)
router.put('/profile', protect, profileValidation, updateProfile)
router.put('/change-password', protect, changePasswordValidation, changePassword)

module.exports = router
