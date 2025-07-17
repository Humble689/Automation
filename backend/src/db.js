import Database from 'better-sqlite3';

const db = new Database('./database/tasks.sqlite');

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    payload TEXT,
    schedule TEXT,
    status TEXT,
    logs TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );
`);
      //ac
export default db;
