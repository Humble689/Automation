import os
from flask import Flask, request, jsonify
import smtplib
from email.message import EmailMessage
import requests

app = Flask(__name__)

BACKEND_URL = os.environ.get('BACKEND_URL', 'http://localhost:5000')

def send_email_task(task_id, email, subject, body):
    try:
        smtp_host = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
        smtp_port = int(os.environ.get('SMTP_PORT', 587))
        smtp_user = os.environ.get('SMTP_USER')
        smtp_pass = os.environ.get('SMTP_PASS')

        msg = EmailMessage()
        msg['Subject'] = subject
        msg['From'] = smtp_user
        msg['To'] = email
        msg.set_content(body)

        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.send_message(msg)

        # Report status back to backend
        requests.post(f"{BACKEND_URL}/api/tasks/{task_id}/status", json={
            "status": "success",
            "logs": f"Sent email to {email}"
        })
        return True
    except Exception as e:
        requests.post(f"{BACKEND_URL}/api/tasks/{task_id}/status", json={
            "status": "failed",
            "logs": str(e)
        })
        return False

@app.route('/trigger', methods=['POST'])
def trigger():
    data = request.json
    task_type = data.get('task_type')
    payload = data.get('payload', {})
    task_id = data.get('task_id')

    if task_type == 'send_email':
        email = payload.get('email')
        subject = payload.get('subject')
        body = payload.get('body')
        send_email_task(task_id, email, subject, body)
        return jsonify({"status": "started"})
    return jsonify({"error": "Unknown task type"}), 400

if __name__ == '__main__':
    app.run(port=5001)