#!/usr/bin/env node
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const uriFromArg = process.argv[2]
const uri = uriFromArg || process.env.MONGO_URI
const defaultDbName = process.env.MONGO_DB_NAME || 'akpu4all'

const looksLikeMongoUri = (u) => !!u && /^mongodb(\+srv)?:\/\//i.test(u)

const short = (s) => (s && s.length > 60 ? s.slice(0, 36) + '...' + s.slice(-20) : s)

function normalizeMongoUri(inputUri) {
  try {
    const url = new URL(inputUri)
    const currentPath = url.pathname.replace(/^\/+|\/+$/g, '')
    if (!currentPath) {
      url.pathname = `/${defaultDbName}`
      return url.toString()
    }
    return inputUri
  } catch (error) {
    return inputUri
  }
}

async function run() {
  if (!uri) {
    console.error('❌ No MONGO_URI provided. Pass it as the first arg or set it in environment.')
    process.exit(2)
  }

  if (!looksLikeMongoUri(uri)) {
    console.error('❌ Provided MONGO_URI does not look valid:', uri)
    process.exit(2)
  }

  const normalizedUri = normalizeMongoUri(uri)

  if (normalizedUri !== uri) {
    console.log(`No database name detected; defaulting to /${defaultDbName} instead of MongoDB's /test database.`)
  }

  console.log('Attempting to connect to MongoDB using URI:', short(normalizedUri))

  try {
    await mongoose.connect(normalizedUri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      socketTimeoutMS: 10000,
    })
    const conn = mongoose.connection
    console.log('✅ Connected: host=', conn.host || conn.client.s.url || 'unknown')
    console.log('📊 Database:', conn.name || '(unknown)')
    await mongoose.disconnect()
    process.exit(0)
  } catch (err) {
    console.error('❌ Connection failed:', err && err.message ? err.message : err)
    const msg = (err && err.message) ? err.message.toLowerCase() : ''
    if (msg.includes('authentication') || msg.includes('not authorized')) {
      console.error('- Authentication error: check username/password and DB user privileges in the URI.')
    }
    if (msg.includes('server selection') || msg.includes('could not reach any servers') || msg.includes('enotfound')) {
      console.error('- Network/DNS issue: ensure your host can reach Atlas and that Atlas IP allowlist includes this host (or 0.0.0.0/0 for testing).')
    }
    if (msg.includes('ssl') || msg.includes('tls')) {
      console.error('- TLS/SSL error: check that TLS is supported and that the URI is correct for SRV.')
    }
    process.exit(1)
  }
}

run()
