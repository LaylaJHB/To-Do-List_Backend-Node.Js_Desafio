import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import TaskList from './components/TaskList';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div>
      {!isAuthenticated ? (
        <>
          <LoginForm onLogin={handleLogin} />
          <SignupForm />
        </>
      ) : (
        <TaskList />
      )}
    </div>
  );
}

export default App;
