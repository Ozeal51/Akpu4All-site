require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const transactionRoutes = require('./routes/transactionRoutes')
const vendorRoutes = require('./routes/vendorRoutes')
const adminRoutes = require('./routes/adminRoutes')

const app = express()
const port = process.env.PORT || 5000
const clientOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || 'http://localhost:5173,http://localhost:5174')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

connectDB()

app.use(
  cors({
    origin: clientOrigins,
    credentials: true,
  }),
)
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({ success: true, message: '🍽️ Akpu4All API is running!', version: '2.0.0' })
})

app.get('/api', (req, res) => {
  res.json({
    success: true,
    service: 'Akpu4All API',
    routes: ['/api/auth', '/api/products', '/api/orders', '/api/transactions', '/api/vendors', '/api/admin'],
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/transactions', transactionRoutes)
app.use('/api/vendors', vendorRoutes)
app.use('/api/admin', adminRoutes)

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` })
})

app.use((err, req, res, next) => {
  console.error('Server Error:', err)
  res.status(err.status || 500).json({ success: false, message: err.message || 'Internal Server Error' })
})

app.listen(port, () => {
  console.log(`\n🚀 Akpu4All Server running on port ${port}`)
  console.log(`📡 API: http://localhost:${port}`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}\n`)
})
