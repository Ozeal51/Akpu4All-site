const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    // Connection options for production
    const mongooseOptions = {
      maxPoolSize: 10, // Connection pool size for production
      minPoolSize: 5, // Minimum connections to maintain
      retryWrites: true, // Enable transaction support
      retryReads: true, // Automatic read retry
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, mongooseOptions)

    // Log connection details in production
    const env = process.env.NODE_ENV || 'development'
    console.log(`✅ MongoDB Connected: ${conn.connection.host} [${env}]`)
    console.log(`📊 Database: ${conn.connection.name}`)

    // Handle connection events
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected')
    })

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err.message)
    })

    return conn
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`)
    console.error('Stack:', error.stack)
    process.exit(1)
  }
}

module.exports = connectDB
