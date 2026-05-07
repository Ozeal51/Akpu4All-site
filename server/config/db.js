const mongoose = require('mongoose')
const util = require('util')

const looksLikeMongoUri = (uri) => {
  if (!uri || typeof uri !== 'string') return false
  return /^mongodb(\+srv)?:\/\//i.test(uri)
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

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI

    if (!uri) {
      console.error('❌ MONGO_URI environment variable is not set.')
      printConnectionHints()
      process.exit(1)
    }

    if (!looksLikeMongoUri(uri)) {
      console.error('❌ MONGO_URI does not look like a valid MongoDB URI. Example: mongodb+srv://user:pass@cluster.mongodb.net/dbname')
      printConnectionHints()
      process.exit(1)
    }

    // Connection options tuned for production
    const mongooseOptions = {
      maxPoolSize: 10,
      minPoolSize: 5,
      retryWrites: true,
      retryReads: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
    }

    const conn = await mongoose.connect(uri, mongooseOptions)

    const env = process.env.NODE_ENV || 'development'
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
    console.error(`❌ MongoDB Connection Error: ${error && error.message ? error.message : util.inspect(error)}`)
    if (error && error.message) {
      // Provide targeted hints for common failure modes
      const msg = error.message.toLowerCase()
      if (msg.includes('authentication') || msg.includes('not authorized')) {
        console.error('- Authentication failed: check username/password in MONGO_URI and that the user has DB permissions.')
      }
      if (msg.includes('server selection') || msg.includes('could not reach any servers') || msg.includes('enotfound')) {
        console.error('- Network/DNS issue: Atlas host not reachable from this environment. Check allowlist and outbound internet/DNS rules.')
      }
      if (msg.includes('ssl') || msg.includes('tls')) {
        console.error('- TLS/SSL issue: ensure the environment supports TLS and that the URI is correct for SRV.')
      }
    }
    printConnectionHints()
    console.error('Stack:', error && error.stack ? error.stack : util.inspect(error))
    process.exit(1)
  }
}

module.exports = connectDB
