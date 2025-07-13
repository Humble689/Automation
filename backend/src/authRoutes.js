import express from 'express';
import jwt from 'jsonwebtoken';
import { createUser, validatePassword, findUserById } from './userModel.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });
}

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password required" });
  try {
    const user = await createUser(email, password);
    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password required" });
  const user = await validatePassword(email, password);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  const token = generateToken(user);
  res.json({ token });
});

// Middleware for protected routes
export function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ error: "Missing token" });
  const token = auth.substring(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = findUserById(payload.id);
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}

export default router;