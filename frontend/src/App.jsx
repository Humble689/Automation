import React from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

function MainApp() {
  const { user, logout } = useAuth();
  const [showRegister, setShowRegister] = React.useState(false);

  if (!user) {
    return (
      <div style={{ maxWidth: 400, margin: 'auto' }}>
        {showRegister ? <RegisterForm /> : <LoginForm />}
        <button onClick={() => setShowRegister(!showRegister)} style={{ marginTop: 8 }}>
          {showRegister ? "Already have an account? Login" : "No account? Register"}
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: 'auto' }}>
      <h1>Task Automation Bot</h1>
      <button onClick={logout} style={{ float: 'right' }}>Logout</button>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}