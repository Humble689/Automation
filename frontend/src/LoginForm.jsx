import React, { useState } from 'react';
import { useAuth } from './AuthContext';

export default function LoginForm() {
  const { handleLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      await handleLogin(email, password);
    } catch (e) {
      setErr(e.response?.data?.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', marginBottom: 8 }} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', marginBottom: 8 }} />
      {err && <div style={{ color: 'red' }}>{err}</div>}
      <button type="submit">Login</button>
    </form>
  );
}