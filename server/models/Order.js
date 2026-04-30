const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    productName: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    image: {
      type: String,
      default: '',
      trim: true,
    },
    category: {
      type: String,
      default: '',
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Item price is required'],
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    lineTotal: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
)

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: '' },
    email: { type: String, trim: true, lowercase: true, default: '' },
    phone: { type: String, trim: true, default: '' },
    address: { type: String, trim: true, default: '' },
  },
  { _id: false },
)

const pricingSchema = new mongoose.Schema(
  {
    subtotal: { type: Number, default: 0, min: 0 },
    deliveryFee: { type: Number, default: 0, min: 0 },
    tax: { type: Number, default: 0, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    total: { type: Number, default: 0, min: 0 },
    currency: { type: String, default: 'NGN', uppercase: true },
  },
  { _id: false },
)

const deliverySchema = new mongoose.Schema(
  {
    address: { type: String, trim: true, default: '' },
    city: { type: String, trim: true, default: '' },
    notes: { type: String, trim: true, default: '' },
    deliveryWindow: { type: String, trim: true, default: '' },
  },
  { _id: false },
)

const statusHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'completed', 'cancelled'],
      required: true,
    },
    note: {
      type: String,
      trim: true,
      default: '',
    },
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    changedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
)

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    source: {
      type: String,
      enum: ['web', 'mobile', 'admin', 'seed'],
      default: 'web',
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    items: {
      type: [orderItemSchema],
      validate: {
        validator: (items) => Array.isArray(items) && items.length > 0,
        message: 'Order must contain at least one item',
      },
      required: true,
    },
    customer: {
      type: customerSchema,
      default: () => ({}),
    },
    pricing: {
      type: pricingSchema,
      default: () => ({}),
    },
    delivery: {
      type: deliverySchema,
      default: () => ({}),
    },
    statusHistory: {
      type: [statusHistorySchema],
      default: [],
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'completed', 'cancelled'],
      default: 'pending',
      index: true,
    },
    paymentMethod: {
      type: String,
      enum: ['cash_on_delivery', 'transfer', 'card'],
      default: 'cash_on_delivery',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
      index: true,
    },
    paymentReference: {
      type: String,
      trim: true,
      default: '',
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
    fulfilledAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
        return ret
      },
    },
  },
)

orderSchema.pre('validate', function (next) {
  if (!this.orderNumber) {
    this.orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
  }

  if (Array.isArray(this.items) && this.items.length) {
    const subtotal = this.items.reduce((sum, item) => {
      const lineTotal = Number(item.lineTotal ?? Number(item.price || 0) * Number(item.quantity || 1))
      return sum + lineTotal
    }, 0)

    const deliveryFee = Number(this.pricing?.deliveryFee || 0)
    const tax = Number(this.pricing?.tax || 0)
    const discount = Number(this.pricing?.discount || 0)
    const currency = this.pricing?.currency || 'NGN'
    const total = subtotal + deliveryFee + tax - discount

    this.pricing = {
      subtotal,
      deliveryFee,
      tax,
      discount,
      total: total < 0 ? 0 : total,
      currency,
    }
  }

  if (!Array.isArray(this.statusHistory)) {
    this.statusHistory = []
  }

  if (!this.statusHistory.length && this.status) {
    this.statusHistory.push({ status: this.status, note: 'Order created' })
  }

  next()
})

module.exports = mongoose.model('Order', orderSchema)
