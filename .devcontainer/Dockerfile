FROM mcr.microsoft.com/devcontainers/base:ubuntu-22.04

# Install Node.js, npm, and Python
RUN apt-get update && \
    apt-get install -y curl python3 python3-pip python3-venv && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Install global npm tools if needed
# RUN npm install -g yarn

# Set up Python venv in the celery_worker directory
RUN python3 -m pip install --upgrade pip

# Install SQLite3 CLI (optional, for debugging)
RUN apt-get install -y sqlite3

# [Optional] Install git
RUN apt-get install -y git