// const redis = require("../config/redis");

// const rateLimiter = async (req, res, next) => {
//   const ip = req.ip;
//   const requests = await redis.incr(ip);

//   if (requests === 1) await redis.expire(ip, 60); // Reset every 60 sec

//   if (requests > 5) {
//     return res
//       .status(429)
//       .json({ message: "Too many requests. Try again later." });
//   }

//   next();
// };

// module.exports = rateLimiter;

import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import redisClient from "../config/redis.js";

const rateLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
  windowMs: 60 * 1000,
  max: 10,
  message: "❌ Too many requests. Please try again later.",
});

export default rateLimiter;
