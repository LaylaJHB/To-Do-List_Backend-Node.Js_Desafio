import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import TaskList from './components/TaskList';
import api from './services/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await api.get('/task/getAllPosts', { headers: { Authorization: `Bearer ${token}` } });
          setIsAuthenticated(true);
        } catch {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };
    
    validateToken();
  }, []);

  const handleLogin = () => setIsAuthenticated(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (isLoading) return <div>Carregando...</div>;

  return (
    <div>
      {!isAuthenticated ? (
        <>
          <LoginForm onLogin={handleLogin} />
          <SignupForm />
        </>
      ) : (
        <TaskList onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;


// import React, { useState, useEffect } from 'react';
// import LoginForm from './components/LoginForm';
// import SignupForm from './components/SignupForm';
// import TaskList from './components/TaskList';
// import api from './services/api';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const validateToken = async () => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         try { // Depois alterar rota
//           await api.get('/tasks/getAllPosts', { headers: { Authorization: `Bearer ${token}` } });
//           setIsAuthenticated(true);
//         } catch {
//           localStorage.removeItem('token');
//           setIsAuthenticated(false);
//         }
//       }
//       setIsLoading(false);
//     };
    
//     validateToken();
//   }, []);

//   const handleLogin = () => setIsAuthenticated(true);

//   if (isLoading) return <div>Carregando...</div>;

//   return (
//     <div>
//       {!isAuthenticated ? (
//         <>
//           <LoginForm onLogin={handleLogin} />
//           <SignupForm />
//         </>
//       ) : (
//         <TaskList />
//       )}
//     </div>
//   );
// }

// export default App;
