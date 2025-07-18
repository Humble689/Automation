import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTaskStatus
} from './taskModel.js';
import { triggerCeleryTask } from './celeryClient.js';
import authRoutes, { authMiddleware } from './authRoutes.js';
import authRoutes, { authMiddleware } from './authRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Auth endpoints
app.use('/api/auth', authRoutes);

// Protect everything below this point
app.use(authMiddleware);

// Task routes (as before)
app.get('/api/tasks', (req, res) => {
  res.json(getTasks());
});

app.get('/api/tasks/:id', (req, res) => {
  const task = getTaskById(req.params.id);
  if (task) res.json(task);
  else res.status(404).json({ error: 'Task not found' });
});

app.post('/api/tasks', async (req, res) => {
  const { type, payload, schedule } = req.body;
  const task = createTask({ type, payload, schedule, status: 'pending' });
  try {
    await triggerCeleryTask(task);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to trigger worker' });
  }
});

app.post('/api/tasks/:id/status', (req, res) => {
  const { status, logs } = req.body;
  updateTaskStatus(req.params.id, status, logs);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
