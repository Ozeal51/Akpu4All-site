const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema(
  {
    transactionNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
      index: true,
    },
    orderNumber: {
      type: String,
      trim: true,
      default: '',
      index: true,
    },
    reference: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    provider: {
      type: String,
      default: 'manual',
      trim: true,
    },
    providerReference: {
      type: String,
      default: '',
      trim: true,
    },
    channel: {
      type: String,
      default: 'web',
      trim: true,
    },
    method: {
      type: String,
      default: 'cash_on_delivery',
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: 'NGN',
      uppercase: true,
    },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed', 'refunded'],
      default: 'pending',
      index: true,
    },
    fees: {
      type: Number,
      default: 0,
      min: 0,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    paidAt: {
      type: Date,
      default: null,
    },
    processedAt: {
      type: Date,
      default: null,
    },
    notes: {
      type: String,
      default: '',
      trim: true,
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

transactionSchema.pre('validate', function (next) {
  if (!this.transactionNumber) {
    this.transactionNumber = `TXN-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
  }

  if (!this.reference) {
    this.reference = `REF-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
  }

  next()
})

module.exports = mongoose.model('Transaction', transactionSchema)
