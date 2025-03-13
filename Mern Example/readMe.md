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
│   │   ├── verifyToken.js     # verify JWT token
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

# 🚀 Features

### Customer Management

- CRUD operations for product.

### Authentication System

- User registration & login
- JWT authentication with HTTP-only cookies
- Protected routes

### Security & Optimization

- Rate limiting using Redis
- Secure CORS setup

## 🛠️ Tech Stack

- **Frontend:** React.js, Axios, TailwindCSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Database:** MongoDB (MongoDB Compass recommended for local setup)
- **Cache & Rate Limiting:** Redis
- **Authentication:** JWT (JSON Web Tokens)
- **Containerization:** Docker

## 🔧 Prerequisites

Before running the project, ensure you have the following installed:

- **Docker & Docker Compose**
- **Node.js** (v18 or higher)
- **PNPM/Yarn/NPM** (package manager)

## 🐞 Troubleshooting

### 1. MongoDB Connection Error?

- Ensure MongoDB is running: mongod
- Check if `MONGO_URI` in `.env` is correct.

### 2. Redis Not Running?

- Start Redis with: `redis-server`
- Check connection in `backend/config/redis.js`

### 3. CORS Issues?

- Ensure **CORS_ORIGIN** is set correctly.
- Update CORS settings in `backend/index.js`

## 📥 Installation & Setup

### 1️⃣ Clone the Repository

### 2️⃣ Setup Backend

```
cd backend
npm install # Install dependencies
```

**Configure Environment Variables**

Create a .env file in the backend directory and add:

```
PORT=5000
MONGO_URI=mongodb://mongo:27017/projectDB
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://redis:6379
```

### 3️⃣ Setup Frontend

```
cd ../frontend
npm install # Install dependencies
```

### 4️⃣ Running the Project with Docker

Ensure Docker is running, then execute:

```
docker-compose up -d # IN SERVER
# OR
docker-compose up --build # IN SERVER
```

This will start the backend, frontend, MongoDB, and Redis in containers.

## 🏃 Running the Project

Once both frontend & backend are running, open the browser and visit:

```
http://localhost:5173
```
