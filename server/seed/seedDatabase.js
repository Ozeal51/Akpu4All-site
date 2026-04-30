require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('../config/db')
const User = require('../models/User')
const Product = require('../models/Product')
const Order = require('../models/Order')
const Transactions = require('../models/Transactions')
const Vendors = require('../models/Vendors')
const Admin = require('../models/Admin')
const { products, users, vendors, orders, transactions } = require('./data')

const resetCollections = async () => {
  await Promise.all([
    User.deleteMany({}),
    Product.deleteMany({}),
    Order.deleteMany({}),
    Transactions.deleteMany({}),
    Vendors.deleteMany({}),
    Admin.deleteMany({}),
  ])
}

const seedUsers = async () => {
  const createdUsers = await User.create(users)
  const adminUser = createdUsers.find((user) => user.role === 'admin')

  if (adminUser) {
    await Admin.create({
      user: adminUser._id,
      displayName: adminUser.name,
      roleLevel: 'super_admin',
      permissions: ['dashboard.read', 'products.write', 'orders.write', 'vendors.write', 'transactions.write'],
      isSuperAdmin: true,
      notes: 'Seeded administrative profile',
    })
  }

  return createdUsers
}

const seedProducts = async () => Product.create(products)

const seedVendors = async () => Vendors.create(vendors)

const seedOrders = async (seededUsers) => {
  const productDocs = await Product.find()
  const productMap = new Map(productDocs.map((product) => [product.name, product]))
  const customerMap = new Map(seededUsers.map((user) => [user.email, user]))

  const builtOrders = orders.map((order) => {
    const user = customerMap.get(order.customer.email)
    const resolvedItems = order.items.map((item) => {
      const product = productMap.get(item.productName)
      const quantity = item.quantity || 1
      const price = product?.price || 0

      return {
        product: product?._id,
        productName: product?.name || item.productName,
        image: product?.image || '',
        category: product?.category || '',
        price,
        quantity,
        lineTotal: price * quantity,
      }
    })

    const subtotal = resolvedItems.reduce((sum, item) => sum + item.lineTotal, 0)
    const deliveryFee = order.pricing?.deliveryFee || 0
    const tax = order.pricing?.tax || 0
    const discount = order.pricing?.discount || 0

    return {
      ...order,
      source: 'seed',
      user: user?._id,
      items: resolvedItems,
      pricing: {
        subtotal,
        deliveryFee,
        tax,
        discount,
        total: subtotal + deliveryFee + tax - discount,
        currency: 'NGN',
      },
    }
  })

  return Order.create(builtOrders)
}

const seedTransactions = async (seededUsers, seededOrders) => {
  const customerMap = new Map(seededUsers.map((user) => [user.email, user]))
  const orderMap = new Map(seededOrders.map((order) => [order.orderNumber, order]))

  const builtTransactions = transactions.map((transaction, index) => {
    const order = index === 0 ? orderMap.get('ORD-SEED-1001') : orderMap.get('ORD-SEED-1002')
    const user = index === 0 ? customerMap.get('customer@akpu4all.com') : customerMap.get('admin@akpu4all.com')

    return {
      ...transaction,
      user: user?._id,
      order: order?._id,
      orderNumber: order?.orderNumber,
      amount: order?.pricing?.total || 0,
      providerReference: transaction.reference,
      processedAt: new Date(),
      paidAt: new Date(),
      metadata: { seeded: true, orderNumber: order?.orderNumber },
    }
  })

  return Transactions.create(builtTransactions)
}

const seedDatabase = async () => {
  try {
    await connectDB()
    await resetCollections()

    const seededUsers = await seedUsers()
    await seedProducts()
    await seedVendors()
    const seededOrders = await seedOrders(seededUsers)
    await seedTransactions(seededUsers, seededOrders)

    console.log('✅ Database seeded successfully')
    console.log(`   Users: ${seededUsers.length}`)
    console.log(`   Products: ${products.length}`)
    console.log(`   Vendors: ${vendors.length}`)
    console.log(`   Orders: ${seededOrders.length}`)
    console.log(`   Transactions: ${transactions.length}`)

    await mongoose.connection.close()
    process.exit(0)
  } catch (error) {
    console.error('❌ Seed failed:', error)
    await mongoose.connection.close().catch(() => {})
    process.exit(1)
  }
}

seedDatabase()
