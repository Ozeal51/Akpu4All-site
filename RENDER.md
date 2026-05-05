# Akpu4All - Render.com Deployment Configuration

This directory contains production-ready configurations for deploying Akpu4All on Render.com.

## Quick Start for Render Deployment

### 1. Prepare Your Repository

```bash
# Ensure all changes are committed
git add .
git commit -m "Prepare for production deployment on Render"
git push origin main
```

### 2. Create Services on Render

You need to create **2 separate services** on Render:

#### Service 1: API Backend

1. Go to https://render.com
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `akpu4all-api`
   - **Root Directory**: `server`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free tier (or paid)

5. **Environment Variables** (in Service settings):
   ```
   NODE_ENV=production
   PORT=5000
   MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/akpu4all?retryWrites=true&w=majority
   JWT_SECRET=<generate-random-string-here>
   CLIENT_URLS=https://<your-frontend-domain>
   ```

#### Service 2: Frontend Client

1. Click "New" → "Static Site" (or "Web Service" if using Node)
2. Connect your GitHub repository
3. Configure:
   - **Name**: `akpu4all-web`
   - **Root Directory**: `Client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Plan**: Free tier

4. **Environment Variables**:
   ```
   VITE_API_BASE_URL=https://<your-api-domain>/api
   ```

### 3. MongoDB Atlas Setup

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free M0 cluster
3. Create a database user (username + strong password)
4. Add Render's IP to whitelist:
   - Use `0.0.0.0/0` to allow all IPs (Render's IPs vary)
   - Or restrict to Render's IP ranges
5. Copy connection string and add to MONGO_URI env var

### 4. Set Up Domain & CORS

**Option A: Use Render's Default URLs**
- API: `https://akpu4all-api.onrender.com`
- Frontend: `https://akpu4all-web.onrender.com`
- Set `CLIENT_URLS=https://akpu4all-web.onrender.com` in API

**Option B: Use Custom Domain**
1. Add custom domain in Render service settings
2. Update CLIENT_URLS to match your frontend domain
3. Update VITE_API_BASE_URL in frontend

### 5. Verify Deployment

Once deployed, test the following:

```bash
# Health check
curl https://akpu4all-api.onrender.com/health

# API info
curl https://akpu4all-api.onrender.com/api

# Frontend loads
https://akpu4all-web.onrender.com
```

## Environment Variables Reference

### Backend (server/)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NODE_ENV` | Yes | Environment | `production` |
| `PORT` | No | Port (Render assigns) | `5000` |
| `MONGO_URI` | Yes | MongoDB Atlas URI | `mongodb+srv://user:pass@cluster.mongodb.net/akpu4all` |
| `JWT_SECRET` | Yes | JWT signing secret | (32+ char random string) |
| `JWT_EXPIRE` | No | Token expiration | `7d` |
| `CLIENT_URLS` | Yes | CORS whitelist | `https://domain.com` |
| `SMTP_HOST` | No | Email SMTP server | `smtp.gmail.com` |
| `SMTP_PORT` | No | SMTP port | `587` |
| `SMTP_USER` | No | Email account | `your@email.com` |
| `SMTP_PASS` | No | Email password | (app-specific password) |

### Frontend (Client/)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_API_BASE_URL` | Yes | Backend API URL | `https://api.domain.com/api` |

## File Structure

```
akpu-4all/
├── server/
│   ├── index.js                    # Main Express app (production-ready)
│   ├── package.json               # Dependencies + production scripts
│   ├── .env.example               # Environment template
│   ├── render.json                # Render.com deployment config
│   ├── DEPLOYMENT.md              # Detailed deployment guide
│   ├── config/
│   │   └── db.js                  # MongoDB with connection pooling
│   ├── middleware/
│   │   ├── auth.js               # JWT + role-based access
│   │   ├── security.js           # Helmet + rate limiting
│   │   └── logger.js             # Error handling + logging
│   ├── routes/                    # API endpoints
│   ├── controllers/               # Business logic
│   ├── models/                    # MongoDB schemas
│   ├── seed/                      # Database initialization
│   └── logs/                      # Runtime logs (production)
├── Client/
│   ├── package.json               # React + Vite build config
│   ├── vite.config.js            # Build optimization
│   ├── index.html                # Entry point
│   └── src/
│       ├── services/api.js       # Axios client (uses VITE_API_BASE_URL)
│       └── ...
└── README.md                      # Project overview
```

## Deployment Checklist

- [ ] All sensitive data (passwords, keys) in environment variables, NOT in code
- [ ] `.env` file is in `.gitignore` (never commit secrets)
- [ ] `MONGO_URI` is valid MongoDB Atlas connection string
- [ ] `JWT_SECRET` is a strong random string (32+ characters)
- [ ] `CLIENT_URLS` matches your frontend domain
- [ ] `/health` endpoint returns 200 OK
- [ ] Database seeding works: `npm run seed` in backend
- [ ] Frontend API calls use `VITE_API_BASE_URL` env var
- [ ] CORS is configured correctly (no `*`, use whitelist)
- [ ] Rate limiting is enabled to prevent abuse
- [ ] Error handling doesn't expose sensitive info
- [ ] Logs are properly configured for debugging
- [ ] HTTPS is enforced (Render does this automatically)

## Common Issues & Solutions

### Render Service Won't Start
**Problem**: Build or start command fails
**Solution**:
- Check build logs in Render dashboard
- Verify Node version >= 18.0.0
- Ensure all dependencies are in package.json
- Try building locally: `npm install && npm start`

### Cannot Connect to Database
**Problem**: `MongoDB Error: connect ECONNREFUSED`
**Solution**:
- Verify MONGO_URI environment variable is set correctly
- Check MongoDB Atlas whitelist includes 0.0.0.0/0 or Render's IP
- Test URI locally: `node -e "require('mongoose').connect(process.env.MONGO_URI)"`

### CORS Errors on Frontend
**Problem**: Browser blocks API requests with CORS error
**Solution**:
- Check CLIENT_URLS exactly matches frontend domain (with https://)
- Restart backend service after changing env vars
- Verify frontend uses correct API URL (VITE_API_BASE_URL)
- Check backend logs for CORS rejection

### 502 Bad Gateway
**Problem**: Render shows error page or blank response
**Solution**:
- Check `/health` endpoint manually
- View backend logs in Render dashboard
- Verify `npm start` command works locally
- Check for uncaught exceptions in code

### Frontend Shows Blank Page
**Problem**: Frontend builds but shows nothing
**Solution**:
- Check browser console for API errors
- Verify VITE_API_BASE_URL is correct
- Ensure backend is responding to API requests
- Check vite.config.js build configuration

## Performance Tips

1. **Database Indexing**: Ensure frequently queried fields have MongoDB indices
2. **Connection Pooling**: Already configured (5-10 connections)
3. **Rate Limiting**: Configured to prevent abuse and DDoS
4. **Caching**: Consider adding Redis for session/data caching
5. **CDN**: Use Cloudflare or similar for static assets
6. **Monitoring**: Enable Render's metrics to track uptime

## Scaling for Growth

**Traffic increasing?**

1. Upgrade Render plan to paid tier (enables auto-scaling)
2. Enable MongoDB Atlas scaling (create read replicas)
3. Implement caching layer (Redis)
4. Optimize database queries with proper indices
5. Add background job processing (Bull.js with Redis)

## Support & Resources

- **Render Docs**: https://render.com/docs
- **MongoDB Docs**: https://docs.mongodb.com
- **Express.js Guide**: https://expressjs.com
- **Mongoose ODM**: https://mongoosejs.com
- **Security Best Practices**: https://expressjs.com/en/advanced/best-practice-security.html

---

**For detailed backend deployment instructions, see**: `server/DEPLOYMENT.md`

**Last Updated**: May 5, 2026
**Status**: ✅ Production Ready
