## MERN App with Redis: Caching, Rate Limiting, and Session Management

This project integrates Redis into a **MERN stack** application for: ✅ Caching MongoDB queries (to reduce DB load)
✅ **Rate Limiting** (to prevent excessive API requests)
✅ **Session Management** (to store user sessions in Redis)

## 📂 Folder Structure

```

mern-redis-app
│── backend
│   │── config
│   │   ├── db.js             # MongoDB Connection
│   │   ├── redis.js          # Redis Connection
│   │── middleware
│   │   ├── cacheMiddleware.js # Redis Caching Middleware
│   │   ├── rateLimiter.js     # Redis Rate Limiting Middleware
│   │── models
│   │   ├── Product.js        # Product Model
│   │   ├── User.js           # User Model
│   │── routes
│   │   ├── productRoutes.js  # Product Routes (Caching)
│   │   ├── authRoutes.js     # Auth Routes (Session Management)
│   │── server.js             # Express Server
│── frontend
│   │── src
│   │   ├── components
│   │   │   ├── ProductDetails.jsx  # Fetch Cached Data
│   │   │   ├── Login.jsx           # User Login
│   │   ├── App.js
│── .env
│── package.json
│── README.md

```
