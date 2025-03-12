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
│   │   │   ├── Dashboard.jsx       # User Dashboard
│   │   ├── App.jsx
│── .env
│── package.json
│── README.md

```

#### What Happens Here?

1. When a request is made to `/product/:id`, the **cacheMiddleware** checks Redis first.
2. If the product is found in Redis, it returns the cached data instantly.
3. If not, it queries MongoDB, stores the result in Redis, and returns it to the user.
4. The next time the same request is made, Redis serves the cached response instead of querying MongoDB.

#### Redis is a powerful tool in a MERN app for:

✅ **Caching MongoDB Queries** in Redis (improving performance)
✅ **Rate Limiting API Requests** (protecting APIs)
✅ **Session Management with Redis** (storing user sessions)
