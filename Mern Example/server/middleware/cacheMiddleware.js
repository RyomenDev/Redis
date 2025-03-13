// const redis = require("../config/redis");
import redis from "../config/redis.js";

const cacheMiddleware = async (req, res, next) => {
  const { id } = req.params;
  const cachedData = await redis.get(`product:${id}`);

  if (cachedData) {
    console.log("Serving from Cache");
    return res.json(JSON.parse(cachedData));
  }

  next();
};

// module.exports = cacheMiddleware;
export default cacheMiddleware;
