const getEffectiveNodeEnv = () => process.env.NODE_ENV || (process.env.RENDER ? 'production' : 'development')

// Logger utility for production logging
class Logger {
  constructor() {
    this.isDev = getEffectiveNodeEnv() !== 'production'
  }

  // Format timestamp
  getTimestamp() {
    return new Date().toISOString()
  }

  // Log to console (always)
  log(level, message, data = {}) {
    const logEntry = {
      timestamp: this.getTimestamp(),
      level,
      message,
      ...data,
      env: getEffectiveNodeEnv(),
    }

    // Always log to console (both dev and production for Render visibility
    console.log(`[${level}] ${message}`, data)
  }

  info(message, data) {
    this.log('INFO', message, data)
  }

  warn(message, data) {
    this.log('WARN', message, data)
  }

  error(message, data) {
    this.log('ERROR', message, data)
  }

  debug(message, data) {
    if (this.isDev) {
      this.log('DEBUG', message, data)
    }
  }
}

const logger = new Logger()

// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  const isDev = getEffectiveNodeEnv() !== 'production'

  // Log error
  logger.error('Unhandled Error', {
    message: err.message,
    status: err.status || 500,
    path: req.originalUrl,
    method: req.method,
    ip: req.ip,
    stack: isDev ? err.stack : undefined,
  })

  // Determine status code
  const statusCode = err.status || err.statusCode || 500

  // Response payload
  const response = {
    success: false,
    message: isDev ? err.message : 'Internal Server Error',
    ...(isDev && { stack: err.stack }),
  }

  res.status(statusCode).json(response)
}

// Async error wrapper to catch promise rejections
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

module.exports = {
  logger,
  errorHandler,
  asyncHandler,
}
