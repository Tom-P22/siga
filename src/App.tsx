import React, { useState } from 'react';
import { LoginView } from './views/LoginView';
import { DashboardView } from './views/DashboardView';

function App() {
  // Estado para simular si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <div className="font-sans antialiased text-gray-900">
      {isAuthenticated ? (
        <DashboardView onLogout={() => setIsAuthenticated(false)} />
      ) : (
        <LoginView onLoginSuccess={() => setIsAuthenticated(true)} />
      )}
    </div>
  );
}

export default App;