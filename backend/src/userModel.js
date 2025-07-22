import db from './db.js';
import bcrypt from 'bcryptjs';

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

export async function createUser(email, password) {
  const hashed = await bcrypt.hash(password, 10);
  const stmt = db.prepare("INSERT INTO users (email, password) VALUES (?, ?)");
  try {
    const res = stmt.run(email, hashed);
    return { id: res.lastInsertRowid, email };
  } catch (err) {
    if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
      throw new Error("Email already exists");
    }
    throw err;
  }
}

export function findUserByEmail(email) {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email);
}

export function findUserById(id) {
  return db.prepare("SELECT * FROM users WHERE id = ?").get(id);
}

export async function validatePassword(email, password) {
  const user = findUserByEmail(email);
  if (!user) return false;
  const valid = await bcrypt.compare(password, user.password);
  return valid ? user : false;
}
