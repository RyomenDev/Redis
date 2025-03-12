const Redis = require("ioredis");

const redis = new Redis(); // Default connection (localhost:6379)
redis.on("connect", () => console.log("Redis Connected"));
redis.on("error", (err) => console.error("Redis Error:", err));

module.exports = redis;
