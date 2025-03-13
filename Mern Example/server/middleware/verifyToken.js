import jwt from "jsonwebtoken";

export async function verifyToken(req, res, next) {
  //   console.log(req.cookies.token);

  const token = req.cookies.token;
  console.log({ token });

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    console.log({ JWT_SECRET });

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log({ decoded });

    req.user = decoded; // Attach decoded user info to request
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}
