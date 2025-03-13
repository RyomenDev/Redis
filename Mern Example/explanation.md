# MERN App with Redis: Caching, Rate Limiting, and Session Management

This project integrates **Redis** into a **MERN stack** application for:

✅ **Caching MongoDB queries** (to reduce DB load)  
✅ **Rate Limiting** (to prevent excessive API requests)  
✅ **Session Management** (to store user sessions in Redis)  

This integration significantly boosts **performance & scalability**! 🚀

---

## 🚀 Features

### 1️⃣ Caching MongoDB Queries in Redis
- Reduces **database load** by storing frequently accessed data in Redis.
- Enhances **response time** for API requests.

### 2️⃣ Rate Limiting API Requests
- Prevents **abuse and overloading** by limiting the number of API requests per user.
- Uses Redis as a **distributed store** to track request counts.

### 3️⃣ Session Management with Redis
- Stores **user sessions** in Redis instead of default memory storage.
- Supports **auto-expiration** for inactive sessions.

---

## 🔧 Setup & Configuration

### 1️⃣ Ensure Cookies Are Sent in Axios Requests
When making requests from React, include credentials:

```js
axios.get("/api/protected-route", { withCredentials: true });
```

✅ `withCredentials: true` ensures cookies are sent in requests.

### 2️⃣ Ensure CORS Configuration Allows Credentials
CORS settings must explicitly allow credentials:

```js
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow cookies
  })
);
```

❌ **Important:** If `credentials: true`, `origin` must not be `*`.

### 3️⃣ Ensure Cookies Are Set Properly in Login Response
Ensure cookies are set correctly in authentication:

```js
res.cookie("token", token, {
  httpOnly: true, // Protects against JavaScript access
  secure: false, // HTTPS required in production
  sameSite: "Lax", // Prevents CSRF while allowing cross-origin
});
```

---

## 📝 Checklist
✅ **Frontend:** Axios requests use `{ withCredentials: true }`  
✅ **Backend:** `cookie-parser` middleware is included  
✅ **Backend:** CORS is correctly configured (`credentials: true`)  
✅ **Backend:** Cookies are set correctly (`httpOnly: true`, `sameSite: "Lax"`)  

Try these fixes and check if `req.cookies.token` works! 🚀

---

## 📌 Rate Limiting Implementation

✅ **Added `rateLimiter` middleware** to restrict requests before processing them.  
✅ **Catches errors** to prevent server crashes.  
✅ **Applies rate limiting** to `/products` API, allowing max **5 requests per minute per user**.  

Now, users can only make **5 requests per minute** to fetch products! 🚀

### Rate Limiter Configuration:

```js
import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import redisClient from "../config/redis.js";

const rateLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Max 5 requests per user per minute
  message: "❌ Too many requests. Please try again later.",
  standardHeaders: true, // Enables `RateLimit-*` headers
  legacyHeaders: false, // Disables deprecated headers
});

export default rateLimiter;
```

✅ **Handler option added** → Sends a JSON response with status `429 (Too Many Requests)`  
✅ **Standard headers enabled** → Allows clients to see rate limit details  
✅ **Legacy headers disabled** → Avoids deprecated headers  

---

Now, the application is optimized with **Redis-powered caching, rate limiting, and session management** for better performance and security! 🔥