# Akpu4All

Food-ordering platform CReated by Hosea Agbo for swallows in Nigeria, with a React + Vite client, Express API server, MongoDB and an additional Next.js backend workspace.

## Workspace Overview

```
akpu-4all/
├── Client/      # Main customer-facing React app (Vite)
├── server/      # Express + MongoDB auth/API server
├── Backend/     # Next.js workspace (separate backend app)
├── vercel.json  # Vercel config targeting Client build output
└── README.md
```

## Backend API Server (`server`)

### Stack
- Node.js v18+
- Express 5
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing

### Production Features
✅ **Security Hardening**
- Helmet.js for security headers
- Rate limiting (general: 100 req/15min, auth: 5 req/15min)
- JWT-based authentication with role-based access control
- Input validation with express-validator
- CORS whitelist configuration
- Password hashing with bcryptjs

✅ **Reliability**
- Connection pooling (5-10 MongoDB connections)
- Graceful shutdown handling
- Structured error logging
- Health check endpoint (`/health`)
- Automatic database reconnection

✅ **Monitoring & Logs**
- Structured JSON logging for production
- Separate log files for errors, warnings, and info
- Request/response tracking
- Unhandled exception catching

### API Endpoints

**Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Current user profile (requires auth)
- `PUT /api/auth/profile` - Update profile (requires auth)
- `PUT /api/auth/password` - Change password (requires auth)

**Products**
- `GET /api/products` - List all products with filters
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

**Orders**
- `GET /api/orders` - List all orders (admin)
- `GET /api/orders/my-orders` - Get current user's orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status (admin)

**Users (Admin)**
- `GET /api/users` - List all users (admin)
- `GET /api/users/:id` - Get user details (admin)
- `PATCH /api/users/:id/status` - Update user status (admin)
- `DELETE /api/users/:id` - Delete user (admin)

**Other**
- `GET /` - API welcome message
- `GET /health` - Health check
- `GET /api` - API routes listing

### Database Models

- **User** - User profiles with authentication
- **Product** - Menu items (meals & drinks)
- **Order** - Customer orders with status tracking
- **Vendor** - Vendor/restaurant profiles
- **Transaction** - Payment records
- **Admin** - Admin dashboard data

All models include:
- Automatic timestamps (createdAt, updatedAt)
- Status enums for tracking lifecycle
- Slug generation for SEO-friendly URLs
- JSON transforms to exclude sensitive fields

## Main Frontend (`Client`)

### Stack
- React 19
- React Router 7
- Tailwind CSS
- Framer Motion
- Vite

### Key Features
- Meal and drink browsing with search and filtering
- Cart and checkout flow
- Authentication pages and profile page
- Floating WhatsApp CTA
- Production chunk splitting via `Client/vite.config.js`
- Theme toggle (milky ↔ dark-green) with persistence

## Theme Toggle (Milky / Dark Green)

Implemented with `ThemeContext` + CSS variables:

- Toggle location: top-right area in `Navbar`
- Modes:
  - `milky` (light cream / soft white)
  - `dark-green`
- Smooth animated transitions for background and UI surfaces
- Readability/contrast overrides for text, borders, cards, and form controls
- Preference stored in local storage key: `akpu-theme`
- Restored automatically on reload

Core files:
- `Client/src/context/ThemeContext.jsx`
- `Client/src/context/theme.js`
- `Client/src/components/Navbar.jsx`
- `Client/src/index.css`

## API Server (`server`)

### Stack
- Node.js
- Express
- MongoDB / Mongoose
- JWT + bcryptjs

### Main folders
- `server/controllers`
- `server/models`
- `server/routes`
- `server/middleware`
- `server/config`

## Additional Backend Workspace (`Backend`)

- Next.js project scaffold with Tailwind
- Separate from `server` and `Client` runtime flow

## Local Development

### Prerequisites
- Node.js 18+
- npm 9+
- MongoDB (for `server`)

### 1) One-step dev (recommended)

```bash
cd akpu-4all
npm install
npm run dev
```

This starts both `server` and `Client` together from the project root.

### 2) Run Client only

```bash
cd Client
npm install
npm run dev
```

In development, the client calls the API directly at `http://localhost:5000/api`. Start the server first if you want live data instead of the local fallback catalog.

### 3) Run Express API Server only

```bash
cd server
npm install
npm run dev
```

## Build and Verify

### Client Production Build

```bash
cd Client
npm run build
```

### API Server Start

```bash
cd server
npm start
```

## Deployment

### Local Development (One-Command Setup)

```bash
# From project root
npm install:all    # Install dependencies for both server and client
npm run dev        # Start both server (port 5000) and client (port 5173)
```

This launches:
- **API Server**: http://localhost:5000
- **Health Check**: http://localhost:5000/health
- **Frontend**: http://localhost:5173

### Production Deployment on Render.com

For complete production deployment instructions, see: **[RENDER.md](./RENDER.md)**

**Quick Steps:**
1. Set up MongoDB Atlas (free tier available at https://www.mongodb.com/cloud/atlas)
2. Create two Render services (API + Frontend)
3. Configure environment variables
4. Deploy!

**Key Requirements:**
- `MONGO_URI`: MongoDB Atlas connection string
- `JWT_SECRET`: Strong random secret key
- `CLIENT_URLS`: Frontend domain for CORS

**Verification:**
```bash
# Test deployed API health
curl https://your-api.onrender.com/health

# Should return:
# { "success": true, "status": "healthy", ... }
```

### Vercel Deployment (Client Only)

Root `vercel.json` is configured for the `Client` app:

- Install: `cd Client && npm ci`
- Build: `cd Client && npm run build`
- Output: `Client/dist`
- Environment: Set `VITE_API_BASE_URL` to your API server URL

## Notes on Styling

- UI relies primarily on Tailwind classes in components
- Global theme behavior and transitions live in `Client/src/index.css`
- `data-theme` and `data-bs-theme` attributes are set on `<html>` by `ThemeProvider`

## Useful Scripts

### Client (`Client/package.json`)
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

### Server (`server/package.json`)
- `npm run dev`
- `npm start`

### Backend (`Backend/package.json`)
- `npm run dev`
- `npm run build`
- `npm run start`
