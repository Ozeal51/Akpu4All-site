const mongoose = require('mongoose')
const util = require('util')

const looksLikeMongoUri = (uri) => {
  if (!uri || typeof uri !== 'string') return false
  return /^mongodb(\+srv)?:\/\//i.test(uri)
}

const normalizeMongoUri = (uri, fallbackDbName) => {
  try {
    const url = new URL(uri)
    const currentPath = url.pathname.replace(/^\/+|\/+$/g, '')

    if (!currentPath) {
      url.pathname = `/${fallbackDbName}`
      return url.toString()
    }

    return uri
  } catch (error) {
    return uri
  }
}

const printConnectionHints = () => {
  console.error('\n🔎 MongoDB connection hints:')
  console.error('- Verify the `MONGO_URI` environment variable is set in your deployment (Render / Docker / env file).')
  console.error('- If using MongoDB Atlas, ensure Network Access allows connections from your host (add Render IPs or use 0.0.0.0/0 for testing).')
  console.error('- Confirm the username/password in the URI are correct and that the user has access to the database.')
  console.error('- For SRV URIs (`mongodb+srv://`), ensure your DNS is resolving and outbound DNS is allowed from the host.')
  console.error('- Check `JWT_SECRET` and other env vars are set; server may exit if required envs are missing.')
  console.error('\nSee: https://docs.atlas.mongodb.com/security-ip-access-list/ for Atlas IP allowlisting.')
}

const connectDB = async ({
  maxRetries = 8,
  initialDelayMs = 2000,
  multiplier = 1.8,
  mongooseOptions: overrideOptions = {},
} = {}) => {
  const defaultDbName = process.env.MONGO_DB_NAME || 'akpu4all'
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI

  if (!uri) {
    console.error('❌ MONGO_URI (or MONGODB_URI) environment variable is not set.')
    printConnectionHints()
    // Do not crash immediately; let caller decide. Return a rejected promise.
    return Promise.reject(new Error('MONGO_URI not set'))
  }

  if (!looksLikeMongoUri(uri)) {
    console.error('❌ MONGO_URI does not look like a valid MongoDB URI. Example: mongodb+srv://user:pass@cluster.mongodb.net/dbname')
    printConnectionHints()
    return Promise.reject(new Error('Invalid MONGO_URI format'))
  }

  const normalizedUri = normalizeMongoUri(uri, defaultDbName)
  if (normalizedUri !== uri) {
    console.warn(`⚠️  MONGO_URI had no database name; defaulting to "/${defaultDbName}" instead of MongoDB's "/test" database.`)
  }

  const mongooseOptions = Object.assign(
    {
      maxPoolSize: 10,
      minPoolSize: 5,
      retryWrites: true,
      retryReads: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
    },
    overrideOptions
  )

  let attempt = 0
  let delay = initialDelayMs

  const tryConnect = async () => {
    attempt += 1
    try {
      console.log(`Attempt ${attempt} — connecting to MongoDB...`)
      const conn = await mongoose.connect(normalizedUri, mongooseOptions)
      const env = process.env.NODE_ENV || (process.env.RENDER ? 'production' : 'development')
      console.log(`✅ MongoDB Connected: ${conn.connection.host} [${env}]`)
      console.log(`📊 Database: ${conn.connection.name}`)

      mongoose.connection.on('disconnected', () => {
        console.warn('⚠️  MongoDB disconnected')
      })

      mongoose.connection.on('error', (err) => {
        console.error('❌ MongoDB connection error:', err && err.message ? err.message : util.inspect(err))
      })

      return conn
    } catch (error) {
      const msg = error && error.message ? error.message.toLowerCase() : ''
      console.error(`❌ MongoDB Connection Error (attempt ${attempt}): ${error && error.message ? error.message : util.inspect(error)}`)

      if (msg.includes('authentication') || msg.includes('not authorized')) {
        console.error('- Authentication failed: check username/password in MONGO_URI and that the user has DB permissions.')
      }
      if (msg.includes('server selection') || msg.includes('could not reach any servers') || msg.includes('enotfound') || msg.includes('querysrv') || msg.includes('query srv') || msg.includes('getaddrinfo')) {
        console.error('- Network/DNS issue: Atlas host not reachable from this environment. Check allowlist and outbound internet/DNS/DNS-SRV rules.')
        console.error("  - For SRV URIs (`mongodb+srv://`), ensure the host can perform DNS SRV lookups.")
      }
      if (msg.includes('ssl') || msg.includes('tls')) {
        console.error('- TLS/SSL issue: ensure the environment supports TLS and that the URI is correct for SRV.')
      }

      // Print common guidance each failure to surface next steps for the operator
      printConnectionHints()

      if (attempt >= maxRetries) {
        console.error(`❌ Reached max retries (${maxRetries}). Giving up.`)
        console.error('Stack:', error && error.stack ? error.stack : util.inspect(error))
        return Promise.reject(error)
      }

      // Wait for delay then retry
      console.log(`Retrying in ${Math.round(delay / 1000)}s... (attempt ${attempt + 1} of ${maxRetries})`)
      await new Promise((res) => setTimeout(res, delay))
      delay = Math.min(30000, Math.round(delay * multiplier))
      return tryConnect()
    }
  }

  return tryConnect()
}

module.exports = connectDB
