import axios from 'axios';

// POST to trigger Celery worker (HTTP bridge)
export async function triggerCeleryTask(task) {
  // You can use an environment variable for the worker URL.
  const CELERY_URL = process.env.CELERY_URL || "http://localhost:5001/trigger";
  try {
    const res = await axios.post(CELERY_URL, {
      task_type: task.type,
      payload: task.payload,
      task_id: task.id
    });
    return res.data;
  } catch (err) {
    console.error("Error communicating with Celery:", err.message);
    throw err;
  }
}