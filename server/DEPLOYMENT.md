# Akpu4All API Server - Production Deployment Guide

## Overview

This is a production-grade REST API server for the Akpu4All food ordering platform. The server is built with Express.js and MongoDB, and is ready for deployment on Render.

## Requirements

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB Atlas**: Cloud database (free tier available)
- **Render.com**: Hosting platform

## Project Structure

```
server/
├── config/
│   └── db.js                 # Database configuration & connection pooling
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── productController.js  # Product management
│   ├── orderController.js    # Order processing
│   ├── vendorController.js   # Vendor management
│   └── ...                   # Other controllers
├── middleware/
│   ├── auth.js              # JWT authentication & authorization
│   ├── security.js          # Helmet, rate limiting
│   └── logger.js            # Error handling & logging
├── models/
│   ├── User.js              # User schema
│   ├── Product.js           # Product schema
│   ├── Order.js             # Order schema
│   └── ...                  # Other schemas
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   ├── productRoutes.js     # Product endpoints
│   ├── orderRoutes.js       # Order endpoints
│   └── ...                  # Other routes
├── seed/
│   └── seedDatabase.js      # Database initialization script
├── utils/
│   └── generateToken.js     # JWT token generation
├── logs/                     # Runtime logs (production)
├── .env.example             # Environment variables template
├── render.json              # Render deployment config
├── index.js                 # Main application file
└── package.json             # Dependencies & scripts
```

## Setup Instructions

### 1. Local Development

```bash
# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Add your configuration to .env:
# - MONGO_URI: Your MongoDB Atlas connection string
# - JWT_SECRET: A strong random string
# - CLIENT_URLS: Your frontend URL(s)

# Seed the database (optional)
npm run seed

# Start development server with hot-reload
npm run dev

# Server runs on: http://localhost:5000
# Health check: http://localhost:5000/health
```

### 2. Production Build

```bash
# Install production dependencies only
npm install --production

# Set environment variables
export NODE_ENV=production
export MONGO_URI="your_mongodb_atlas_uri"
export JWT_SECRET="your_jwt_secret"
export CLIENT_URLS="https://yourdomain.com"

# Start server
npm start

# Verify with health check
curl https://yourdomain.com/health
```

## Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
# Server
NODE_ENV=production
PORT=5000

# Database
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/akpu4all?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your-super-secret-key-here
JWT_EXPIRE=7d

# Client URLs (CORS)
CLIENT_URLS=https://yourdomain.com,https://www.yourdomain.com

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## API Endpoints

### Health Check
- **GET** `/health` - Server health status (used by Render for monitoring)

### Authentication
- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - User login
- **GET** `/api/auth/me` - Get current user (requires auth)
- **PUT** `/api/auth/profile` - Update profile (requires auth)
- **PUT** `/api/auth/password` - Change password (requires auth)

### Products
- **GET** `/api/products` - Get all products with filters
- **GET** `/api/products/:id` - Get product details
- **POST** `/api/products` - Create product (admin)
- **PUT** `/api/products/:id` - Update product (admin)
- **DELETE** `/api/products/:id` - Delete product (admin)

### Orders
- **GET** `/api/orders` - List orders (admin)
- **GET** `/api/orders/my-orders` - Get user's orders (requires auth)
- **GET** `/api/orders/:id` - Get order details (requires auth)
- **POST** `/api/orders` - Create order (requires auth)
- **PUT** `/api/orders/:id/status` - Update order status (admin)

### Users (Admin)
- **GET** `/api/users` - List all users (admin)
- **GET** `/api/users/:id` - Get user details (admin)
- **PATCH** `/api/users/:id/status` - Update user status (admin)
- **DELETE** `/api/users/:id` - Delete user (admin)

### Other Endpoints
- See `/api` endpoint for full list

## Security Features

✅ **HTTPS Enforcement** - Helmet.js for security headers
✅ **Rate Limiting** - Prevents API abuse (100 req/15min general, 5 req/15min auth)
✅ **JWT Authentication** - Secure token-based auth
✅ **Input Validation** - express-validator on all inputs
✅ **CORS Configuration** - Whitelist trusted domains only
✅ **Password Hashing** - bcryptjs with salt rounds
✅ **Error Handling** - Centralized error management
✅ **Logging** - Structured logging for debugging

## Database Setup (MongoDB Atlas)

### Create MongoDB Atlas Cluster

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up or log in
3. Create a new project
4. Create a free M0 cluster
5. Create a database user with strong password
6. Add your IP address to whitelist (or allow all: 0.0.0.0/0)
7. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
   ```
8. Replace `<username>`, `<password>`, `<cluster>`, `<database>` with your values
9. Add to `.env` as `MONGO_URI`

### Database Seeding

```bash
# Populate database with initial data
npm run seed

# This will create:
# - Sample users (admin, vendor, customer)
# - Sample products (meals & drinks)
# - Sample orders
# - Sample transactions
```

## Deployment on Render

### Step 1: Prepare Repository

```bash
# Ensure all code is committed
git add .
git commit -m "Prepare server for production deployment"
git push origin main
```

### Step 2: Create Render Service

1. Go to https://render.com (sign up if needed)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure settings:
   - **Name**: `akpu4all-api`
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid if needed)

### Step 3: Set Environment Variables

In Render dashboard:

1. Go to your Web Service
2. Settings → Environment Variables
3. Add each variable from `.env.example`:
   - `NODE_ENV=production`
   - `MONGO_URI=your_mongodb_uri`
   - `JWT_SECRET=your_jwt_secret` (use a strong random string)
   - `CLIENT_URLS=https://yourdomain.com`
   - Other optional variables

### Step 4: Health Checks

Render uses the `/health` endpoint to monitor your service:

```bash
# Test locally
curl http://localhost:5000/health

# Should return:
# {
#   "success": true,
#   "status": "healthy",
#   "timestamp": "2026-05-05T10:30:00.000Z",
#   "uptime": 3600,
#   "environment": "production"
# }
```

### Step 5: Deploy

1. Render automatically deploys on git push to the main branch
2. Monitor deployment in Render dashboard
3. Check logs for any errors
4. Verify with: `https://your-api.render.com/health`

### Troubleshooting Render Deployment

**Build fails with "npm install" error:**
- Check Node version: ensure v18+
- Verify all dependencies are listed in package.json
- Check for .env file (should not be committed)

**Cannot connect to MongoDB:**
- Verify MONGO_URI environment variable is set
- Check MongoDB Atlas whitelist includes Render's IP (0.0.0.0/0 is easiest)
- Test connection locally with same URI

**API returns 502 Bad Gateway:**
- Check server logs in Render dashboard
- Verify `/health` endpoint is accessible
- Check for uncaught exceptions

**CORS errors on frontend:**
- Verify CLIENT_URLS environment variable matches your frontend domain
- Include http/https in the URL
- Restart the service after changing environment variables

## Performance Optimization

- **Connection Pooling**: MongoDB connection pool set to 10 max, 5 min
- **Request Logging**: Debug-level logging only in development
- **Rate Limiting**: Prevents brute force attacks and API abuse
- **Caching**: Implement Redis caching for frequently accessed data (future)
- **Database Indices**: Ensure all frequently queried fields have indices

## Monitoring & Logs

### Local Logs
```bash
# Logs appear in terminal when running npm run dev
# In production, logs are written to server/logs/ directory
```

### Render Logs
- View in Render dashboard: Web Service → Logs
- Logs are retained for 24 hours (paid plans have longer retention)

### Key Metrics to Monitor
- Server uptime
- Error rate (5xx responses)
- Request latency
- Database connection pool usage
- JWT token validation failures

## Maintenance

### Database Backups
- MongoDB Atlas provides automated backups
- Configure backup retention in Atlas dashboard
- Download backups if needed for data migration

### Security Updates
```bash
# Check for outdated packages
npm audit

# Update packages
npm update

# Test and deploy
npm start
```

### Scaling
If traffic increases:
1. Upgrade Render plan to paid tier
2. Enable horizontal scaling (if using Render paid)
3. Implement caching (Redis)
4. Add database read replicas in MongoDB Atlas

## Support & Documentation

- **Express.js**: https://expressjs.com
- **MongoDB**: https://docs.mongodb.com
- **Mongoose**: https://mongoosejs.com
- **Render**: https://render.com/docs
- **JWT**: https://jwt.io

---

**Last Updated**: May 5, 2026
**API Version**: 2.0.0
**Maintained By**: Akpu4All Team
