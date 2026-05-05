# 🚀 QUICK START: Deploy Akpu4All to Render

## 30-Second Deployment Summary

Your backend is **production-ready** and can be deployed to Render in 5 minutes!

---

## Step 1: Prepare MongoDB (2 minutes)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account or log in
3. Create a new M0 cluster (free)
4. Create database user with strong password
5. Add IP whitelist: `0.0.0.0/0` (or Render's IPs)
6. Copy connection string:
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/akpu4all?retryWrites=true&w=majority
   ```

---

## Step 2: Deploy to Render (3 minutes)

### Option A: Web Service (Recommended for Node.js)

1. Go to https://render.com
2. Sign in with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repo (`akpu-4all`)
5. Fill in settings:

   | Field | Value |
   |-------|-------|
   | **Name** | `akpu4all-api` |
   | **Root Directory** | `server` |
   | **Runtime** | Node |
   | **Build Command** | `npm install` |
   | **Start Command** | `npm start` |
   | **Plan** | Free (or Pro for better performance) |

6. Click **"Create Web Service"**

### Step 3: Set Environment Variables (in Render Dashboard)

Click your service → Settings → Environment Variables → Add these:

| Key | Value | Example |
|-----|-------|---------|
| `NODE_ENV` | `production` | production |
| `MONGO_URI` | Your MongoDB Atlas URI | `mongodb+srv://user:pass@cluster.mongodb.net/akpu4all?retryWrites=true&w=majority` |
| `JWT_SECRET` | Strong random string (32+ chars) | Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `CLIENT_URLS` | Your frontend URL | `https://yourfrontend.onrender.com` or your custom domain |

**Don't forget to click "Save" after adding each variable!**

---

## Step 4: Deploy! (Automatic)

1. Push your code to GitHub main branch:
   ```bash
   git add .
   git commit -m "Prepare for production deployment"
   git push origin main
   ```

2. Render automatically detects the push and starts building
3. Monitor in Render dashboard → Logs
4. ✅ Done! Your API is live when status shows "Live"

---

## Step 5: Verify Deployment (30 seconds)

```bash
# Test health endpoint (should return 200 OK)
curl https://akpu4all-api.onrender.com/health

# Should return:
# {
#   "success": true,
#   "status": "healthy",
#   "timestamp": "2026-05-05T...",
#   "uptime": ...,
#   "environment": "production"
# }
```

---

## 🎯 You're Done!

Your backend is now:

✅ Live on Render  
✅ Connected to MongoDB Atlas  
✅ Secured with JWT authentication  
✅ Protected with rate limiting  
✅ Monitored with health checks  
✅ Ready for frontend integration  

---

## API Endpoints Ready to Use

```
POST   https://akpu4all-api.onrender.com/api/auth/register
POST   https://akpu4all-api.onrender.com/api/auth/login
GET    https://akpu4all-api.onrender.com/api/products
POST   https://akpu4all-api.onrender.com/api/orders
GET    https://akpu4all-api.onrender.com/api/orders/my-orders
... and more!
```

---

## Common Issues & Quick Fixes

### ❌ Build fails: "npm install" error
**Solution**: Check Node version. Render uses Node 18+. All deps are in package.json ✓

### ❌ Cannot connect to MongoDB
**Solution**: 
- Check MONGO_URI is correct
- MongoDB Atlas → Network Access → Add 0.0.0.0/0
- Verify database user password (special chars need URL encoding)

### ❌ "502 Bad Gateway" error
**Solution**: Check `/health` endpoint. View logs in Render dashboard. Restart service.

### ❌ CORS errors from frontend
**Solution**: Update `CLIENT_URLS` in environment variables to match your frontend URL

### ❌ Service keeps restarting
**Solution**: Check Render logs for uncaught exceptions. Look for error messages.

---

## Next: Deploy Frontend

Update your frontend to use the API URL:

**File**: `Client/.env` or `Client/.env.production`
```
VITE_API_BASE_URL=https://akpu4all-api.onrender.com/api
```

Then deploy Client to Render or Vercel.

---

## Need More Details?

📖 Full guide: See `server/DEPLOYMENT.md`  
✅ Checklist: See `server/PRODUCTION_CHECKLIST.md`  
🛠️ Troubleshooting: See `RENDER.md`  

---

**Your backend is production-ready!** 🎉

Last Updated: May 5, 2026
