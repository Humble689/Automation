#!/bin/bash

# Install Node dependencies
cd /workspaces/$(basename "$GITHUB_REPOSITORY")/backend && npm install
cd /workspaces/$(basename "$GITHUB_REPOSITORY")/frontend && npm install

# Set up Python venv and install requirements
cd /workspaces/$(basename "$GITHUB_REPOSITORY")/celery_worker
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
deactivate

echo "Setup complete! Start each service in its own terminal:
cd backend && npm run dev
cd frontend && npm start
cd celery_worker && source .venv/bin/activate && python worker.py
"