const express = require('express')
const { body } = require('express-validator')
const { protect, adminOnly } = require('../middleware/auth')
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController')

const router = express.Router()

const productValidation = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be zero or greater'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('image').trim().notEmpty().withMessage('Product image is required'),
  body('menuType').optional().isIn(['meal', 'drink', 'bundle', 'other']).withMessage('Invalid menu type'),
  body('status').optional().isIn(['draft', 'published', 'archived']).withMessage('Invalid product status'),
  body('visibility').optional().isIn(['public', 'private']).withMessage('Invalid visibility'),
]

const productUpdateValidation = [
  body('name').optional().trim().notEmpty().withMessage('Product name cannot be empty'),
  body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be zero or greater'),
  body('category').optional().trim().notEmpty().withMessage('Category cannot be empty'),
  body('image').optional().trim().notEmpty().withMessage('Product image cannot be empty'),
  body('menuType').optional().isIn(['meal', 'drink', 'bundle', 'other']).withMessage('Invalid menu type'),
  body('status').optional().isIn(['draft', 'published', 'archived']).withMessage('Invalid product status'),
  body('visibility').optional().isIn(['public', 'private']).withMessage('Invalid visibility'),
]

router.get('/', getProducts)
router.get('/:id', getProduct)
router.post('/', protect, adminOnly, productValidation, createProduct)
router.put('/:id', protect, adminOnly, productUpdateValidation, updateProduct)
router.delete('/:id', protect, adminOnly, deleteProduct)

module.exports = router
