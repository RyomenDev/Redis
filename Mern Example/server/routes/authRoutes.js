const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
// const redis = require("../config/redis");
// const RedisStore = require("connect-redis").default;

const router = express.Router();

// Session Setup
// router.use(
//   session({
//     store: new RedisStore({ client: redis }),
//     secret: "supersecret",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// User Login
// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username });

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }

//   req.session.user = user;
//   res.json({ message: "Logged in", user });
// });
router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res
    .cookie("token", token, { httpOnly: true })
    .json({ message: "Login successful" });
});

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out" });
});

router.get("/me", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const user = jwt.verify(token, process.env.JWT_SECRET);
  res.json({ user });
});

module.exports = router;
