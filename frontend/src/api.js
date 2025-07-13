import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
}

export function getToken() {
  return localStorage.getItem('token');
}

if (getToken()) setAuthToken(getToken());

export async function login(email, password) {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  setAuthToken(res.data.token);
  return res.data;
}

export async function register(email, password) {
  const res = await axios.post(`${API_URL}/auth/register`, { email, password });
  setAuthToken(res.data.token);
  return res.data;
}