// const Redis = require("ioredis");

// const redis = new Redis(); // Default connection (localhost:6379)
// redis.on("connect", () => console.log("Redis Connected"));
// redis.on("error", (err) => console.error("Redis Error:", err));

// module.exports = redis;

import { createClient } from "redis";

const redisClient = createClient({ url: process.env.REDIS_URL });

redisClient.on("error", (err) => console.error("❌ Redis Error:", err));

await redisClient.connect();
console.log("✅ Redis Connected");

export default redisClient;


// import { createClient } from "redis";
// import dotenv from "dotenv";

// dotenv.config();

// const redisClient = createClient({
//   url: process.env.REDIS_URL,
//   socket: {
//     reconnectStrategy: retries => Math.min(retries * 50, 1000) // Auto-reconnect
//   }
// });

// redisClient.on("error", (err) => console.error("❌ Redis Error:", err));

// await redisClient.connect();
// console.log("✅ Redis Connected");

// export default redisClient;
