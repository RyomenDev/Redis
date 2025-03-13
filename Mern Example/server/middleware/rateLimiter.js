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
  max: 5,  // per min 5 requests
  message: "❌ Too many requests. Please try again later.",
});

export default rateLimiter;

// import rateLimit from "express-rate-limit";
// import RedisStore from "rate-limit-redis";
// import redisClient from "../config/redis.js";

// const rateLimiter = rateLimit({
//   store: new RedisStore({
//     sendCommand: (...args) => redisClient.sendCommand(args),
//   }),
//   windowMs: 60 * 1000, // 1 minute
//   max: 5, // Limit each IP to 5 requests per `windowMs`
//   message: "❌ Too many requests. Please try again later.",
//   standardHeaders: true, // Return rate limit info in headers
//   legacyHeaders: false, // Disable X-RateLimit-* headers

//   // Custom handler when the limit is exceeded
//   handler: (req, res) => {
//     res.status(429).json({
//       success: false,
//       error: "❌ Too many requests. Please try again later.",
//     });
//   },
// });

// export default rateLimiter;
