import React, { createContext, useState, useContext } from 'react';
import { login, register, setAuthToken, getToken } from './api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getToken() ? { token: getToken() } : null);

  const handleLogin = async (email, password) => {
    const data = await login(email, password);
    setUser({ token: data.token });
  };

  const handleRegister = async (email, password) => {
    const data = await register(email, password);
    setUser({ token: data.token });
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleRegister, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}