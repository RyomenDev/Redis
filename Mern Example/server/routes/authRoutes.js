const express = require("express");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const redis = require("../config/redis");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// Session Setup
router.use(
  session({
    store: new RedisStore({ client: redis }),
    secret: "supersecret",
    resave: false,
    saveUninitialized: false,
  })
);

// User Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  req.session.user = user;
  res.json({ message: "Logged in", user });
});

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out" });
});

module.exports = router;
