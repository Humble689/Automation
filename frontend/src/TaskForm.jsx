import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function TaskForm({ onCreated }) {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [schedule, setSchedule] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/tasks`, {
      type: 'send_email',
      payload: { email, subject, body },
      schedule
    });
    setEmail('');
    setSubject('');
    setBody('');
    setSchedule('');
    onCreated();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 32 }}>
      <h2>Schedule Email Task</h2>
      <input
        type="email"
        placeholder="Recipient Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={{ width: '100%', marginBottom: 8 }}
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={e => setSubject(e.target.value)}
        required
        style={{ width: '100%', marginBottom: 8 }}
      />
      <textarea
        placeholder="Message Body"
        value={body}
        onChange={e => setBody(e.target.value)}
        required
        style={{ width: '100%', marginBottom: 8 }}
      />
      <input
        type="text"
        placeholder="Schedule (ISO 8601 or cron, optional)"
        value={schedule}
        onChange={e => setSchedule(e.target.value)}
        style={{ width: '100%', marginBottom: 8 }}
      />
      <button type="submit">Create Task</button>
    </form>
  );
}

export default TaskForm;