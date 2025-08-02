import db from './db.js';





export function createTask(task) {
  const stmt = db.prepare(
    "INSERT INTO tasks (type, payload, schedule, status, logs) VALUES (?, ?, ?, ?, ?)"
  );
  const result = stmt.run(
    task.type,
    JSON.stringify(task.payload),
    task.schedule,
    task.status || 'pending',
    task.logs || ''
  );
  return { ...task, id: result.lastInsertRowid };
}

export function getTasks() {
  return db.prepare("SELECT * FROM tasks").all();
}

export function getTaskById(id) {
  const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
  if (task) {
    task.payload = JSON.parse(task.payload);
  }
  return task;
}

export function updateTaskStatus(id, status, logs = '') {
  db.prepare(
    "UPDATE tasks SET status = ?, logs = ?, updated_at = datetime('now') WHERE id = ?"
  ).run(status, logs, id);
}
