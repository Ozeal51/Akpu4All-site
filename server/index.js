require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const productRoutes = require("./routes/productRoutes");

app.use("/api/products", productRoutes);

// Import routes
const authRoutes = require('./routes/authRoutes')

// Connect to MongoDB
connectDB()

const app = express()

// Middlewares
app.use(cors({
  origin: [process.env.CLIENT_URL || 'http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/', (req, res) => {
  res.json({ success: true, message: '🍽️ Akpu4All API is running!', version: '1.0.0' })
})

// API Routes
app.use('/api/auth', authRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack)
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`\n🚀 Akpu4All Server running on port ${PORT}`)
  console.log(`📡 API: http://localhost:${PORT}`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV}\n`)
})
