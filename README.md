# Task Automation Bot

A full-stack project for scheduling and running automation tasks, such as sending emails.

## Structure

- **backend/**: Node.js Express API, connects to SQLite, talks to Celery worker
- **frontend/**: React UI for creating and viewing tasks
- **celery_worker/**: Python Flask server that runs tasks (e.g., sends email)
- **database/**: SQLite file (auto-created)

## Quick Start  

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

### 3. Celery Worker

```bash
cd celery_worker
pip install -r requirements.txt
# Set your SMTP credentials (see below)
python worker.py
```

### 4. Environment Variables

Create a `.env` file in celery_worker/:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your.email@gmail.com
SMTP_PASS=your_app_password
BACKEND_URL=http://localhost:5000
```

## Features

- Add and view automation tasks (e.g., sending email)
- Tasks are saved in SQLite
- Backend triggers the worker, which executes the automation
- Status and logs are reported back to the backend and visible in the UI

## Extending

- Add more task types (file backup, notifications, etc.)
- Use Celery + message queue for true async/scheduled execution

---

**Happy hacking!**
