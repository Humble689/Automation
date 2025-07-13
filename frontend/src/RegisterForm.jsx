import React, { useState } from 'react';
import { useAuth } from './AuthContext';

export default function RegisterForm() {
  const { handleRegister } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      await handleRegister(email, password);
    } catch (e) {
      setErr(e.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Register</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', marginBottom: 8 }} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', marginBottom: 8 }} />
      {err && <div style={{ color: 'red' }}>{err}</div>}
      <button type="submit">Register</button>
    </form>
  );
}