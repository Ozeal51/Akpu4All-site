require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const { securityHeaders, apiLimiter, authLimiter } = require('./middleware/security')
const { logger, errorHandler, asyncHandler } = require('./middleware/logger')

const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const transactionRoutes = require('./routes/transactionRoutes')
const vendorRoutes = require('./routes/vendorRoutes')
const adminRoutes = require('./routes/adminRoutes')
const { router: userRoutes } = require('./routes/userRoutes')

const app = express()
const port = process.env.PORT || 5000
const environment = process.env.NODE_ENV || (process.env.RENDER ? 'production' : 'development')
const isDev = environment !== 'production'

// Validate required environment variables
const requiredEnvVars = ['JWT_SECRET']
const missingEnvVars = requiredEnvVars.filter((env) => !process.env[env])
if (missingEnvVars.length > 0) {
  logger.error('Missing required environment variables', { missing: missingEnvVars })
  process.exit(1)
}

if (!process.env.MONGO_URI && !process.env.MONGODB_URI) {
  logger.error('Missing required environment variable', { missing: ['MONGO_URI', 'MONGODB_URI'] })
  process.exit(1)
}

// Parse client origins
const clientOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || 'http://localhost:5173,http://localhost:5174')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const allowedOriginPatterns = [
  /^https?:\/\/localhost(?::\d+)?$/i,
  /^https:\/\/.+\.vercel\.app$/i,
  /^https:\/\/.+\.onrender\.com$/i,
  /^https:\/\/(?:www\.)?akpu4all\.com\.ng$/i,
]

const isAllowedOrigin = (origin) => {
  if (!origin) {
    return true
  }

  if (clientOrigins.includes(origin)) {
    return true
  }

  return allowedOriginPatterns.some((pattern) => pattern.test(origin))
}

logger.info('Server Configuration', {
  port,
  environment,
  clientOrigins,
})

// Trust proxy (required for rate-limiting behind Render's reverse proxy)
app.set('trust proxy', 1)

// Security middleware
app.use(securityHeaders)
app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        return callback(null, true)
      }

      logger.warn('Blocked CORS origin', { origin })
      return callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)

// Body parsing middleware with size limits
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true, limit: '2mb' }))

// Request logging middleware
app.use((req, res, next) => {
  logger.debug('Incoming Request', {
    method: req.method,
    path: req.path,
    ip: req.ip,
  })
  next()
})

// Public routes (no authentication required)
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🍽️ Akpu4All API is running!',
    version: '2.0.0',
    environment,
    timestamp: new Date().toISOString(),
  })
})

// Health check endpoint for Render monitoring
app.get('/health', (req, res) => {
  const mongoose = require('mongoose')
  const dbConnected = mongoose.connection.readyState === 1

  res.status(200).json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment,
    database: {
      connected: dbConnected,
      readyState: mongoose.connection.readyState,
      readyStates: {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting',
      },
      host: dbConnected ? mongoose.connection.host : null,
      name: dbConnected ? mongoose.connection.name : null,
    },
  })
})

app.get('/api', (req, res) => {
  res.json({
    success: true,
    service: 'Akpu4All API',
    version: '2.0.0',
    routes: ['/api/auth', '/api/products', '/api/orders', '/api/transactions', '/api/vendors', '/api/users', '/api/admin'],
    documentation: '/api/docs (coming soon)',
  })
})

// API routes with rate limiting
app.use('/api/auth', authLimiter, authRoutes)
app.use('/api/products', apiLimiter, productRoutes)
app.use('/api/orders', apiLimiter, orderRoutes)
app.use('/api/transactions', apiLimiter, transactionRoutes)
app.use('/api/vendors', apiLimiter, vendorRoutes)
app.use('/api/users', apiLimiter, userRoutes)
app.use('/api/admin', apiLimiter, adminRoutes)

// 404 handler
app.use((req, res) => {
  logger.warn('Route Not Found', {
    method: req.method,
    path: req.originalUrl,
  })
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    code: 'ROUTE_NOT_FOUND',
  })
})

// Global error handler (must be last)
app.use(errorHandler)

// Graceful shutdown handler
let server
const gracefulShutdown = async () => {
  logger.info('Graceful shutdown initiated')

  if (server) {
    server.close(async () => {
      logger.info('Server closed')

      // Close database connection
      try {
        await require('mongoose').connection.close()
        logger.info('Database connection closed')
      } catch (error) {
        logger.error('Error closing database connection', { error: error.message })
      }

      process.exit(0)
    })

    // Force shutdown after 10 seconds
    setTimeout(() => {
      logger.error('Forced shutdown after timeout')
      process.exit(1)
    }, 10000)
  }
}

// Handle termination signals
process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', {
    message: error.message,
    stack: error.stack,
  })
  process.exit(1)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection', {
    reason: reason instanceof Error ? reason.message : String(reason),
    promise: String(promise),
  })
})

// Start server only after DB connection in production by default.
// Set `SKIP_DB_WAIT=true` to start the HTTP server even if DB is not available
// (useful for local development or when you run migrations externally).
const startServer = () => {
  server = app.listen(port, () => {
    const env = process.env.NODE_ENV || 'development'
    const activeEnv = environment
    const startTime = new Date().toISOString()

    logger.info('Server Started Successfully', {
      port,
      environment: activeEnv,
      timestamp: startTime,
    })

    if (isDev) {
      console.log(`
╔═══════════════════════════════════════════════════╗
║   🍽️  AKPU4ALL API SERVER (${activeEnv.toUpperCase()})      ║
╚═══════════════════════════════════════════════════╝

🚀 Server running on port ${port}
📡 API:    http://localhost:${port}
❤️  Health: http://localhost:${port}/health
🌍 Environment: ${activeEnv}
⏰ Started: ${startTime}

Available Routes:
  • /api/auth       - Authentication
  • /api/products   - Product Management
  • /api/orders     - Order Management
  • /api/vendors    - Vendor Management
  • /api/users      - User Management
  • /api/admin      - Admin Dashboard
    `)
    }
  })
}

const startApp = async () => {
  const skipWait = String(process.env.SKIP_DB_WAIT || '').toLowerCase() === 'true'

  if (skipWait) {
    logger.warn('SKIP_DB_WAIT=true — starting server without waiting for MongoDB')
    startServer()
    // Still attempt to connect in background for logging and retries
    connectDB().catch((err) => {
      logger.error('Background DB connection failed', { message: err && err.message ? err.message : String(err) })
    })
    return
  }

  try {
    await connectDB()
    startServer()
  } catch (err) {
    logger.error('Could not establish MongoDB connection. Server not started.', { message: err && err.message ? err.message : String(err) })
    logger.info('You can set SKIP_DB_WAIT=true to start the server without DB, or fix the DB connectivity issue and restart.')
    process.exit(1)
  }
}

// Begin startup sequence
startApp()

