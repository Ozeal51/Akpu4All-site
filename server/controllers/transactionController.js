const { validationResult } = require('express-validator')
const Transactions = require('../models/Transactions')

const normalizeTransaction = (transaction) => ({
  id: transaction._id,
  transactionNumber: transaction.transactionNumber,
  user: transaction.user,
  order: transaction.order,
  orderNumber: transaction.orderNumber,
  reference: transaction.reference,
  provider: transaction.provider,
  providerReference: transaction.providerReference,
  channel: transaction.channel,
  method: transaction.method,
  amount: transaction.amount,
  currency: transaction.currency,
  status: transaction.status,
  fees: transaction.fees,
  metadata: transaction.metadata,
  paidAt: transaction.paidAt,
  processedAt: transaction.processedAt,
  notes: transaction.notes,
  createdAt: transaction.createdAt,
  updatedAt: transaction.updatedAt,
})

const getTransactions = async (req, res) => {
  const transactions = await Transactions.find({ user: req.user.id }).sort({ createdAt: -1 })
  res.status(200).json({ success: true, count: transactions.length, transactions: transactions.map(normalizeTransaction) })
}

const getAllTransactions = async (req, res) => {
  const transactions = await Transactions.find().sort({ createdAt: -1 }).populate('user order')
  res.status(200).json({ success: true, count: transactions.length, transactions: transactions.map(normalizeTransaction) })
}

const createTransaction = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() })
  }

  const transaction = await Transactions.create({
    user: req.user.id,
    order: req.body.order,
    orderNumber: req.body.orderNumber || '',
    reference: req.body.reference,
    provider: req.body.provider,
    providerReference: req.body.providerReference,
    channel: req.body.channel,
    method: req.body.method,
    amount: req.body.amount,
    currency: req.body.currency,
    status: req.body.status,
    fees: req.body.fees,
    metadata: req.body.metadata,
    paidAt: req.body.paidAt,
    processedAt: req.body.processedAt,
    notes: req.body.notes,
  })

  res.status(201).json({ success: true, transaction: normalizeTransaction(transaction) })
}

module.exports = { getTransactions, getAllTransactions, createTransaction }
