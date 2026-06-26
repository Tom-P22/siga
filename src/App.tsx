import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginView } from './views/LoginView';
import { DashboardView } from './views/DashboardView';
import { AduanaView } from './views/AduanaView';
import { IngresoManualView } from './views/IngresoManualView';
import { SagView } from './views/SagView';
import { RevisionAutoatencionView } from './views/RevisionAutoatencionView';
import { DatosAutodeclaradosView } from './views/DatosAutodeclaradosView';
import { TotemsAutoatencionView } from './views/TotemsAutoatencionView';
import { ReporteriaView } from './views/ReporteriaView';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="font-sans antialiased text-gray-900">
        <LoginView onLoginSuccess={() => setIsAuthenticated(true)} />
      </div>
    );
  }

  return (
    <div className="font-sans antialiased text-gray-900">
      <Routes>
        <Route path="/" element={<DashboardView onLogout={() => setIsAuthenticated(false)} />} />
        <Route path="/aduana" element={<AduanaView />} />
        <Route path="/aduana/ingreso-manual" element={<IngresoManualView />} />
        <Route path="/sag" element={<SagView />} />
        <Route path="/revision-autoatencion" element={<RevisionAutoatencionView />} />
        <Route path="/datos-autodeclarados" element={<DatosAutodeclaradosView />} />
        <Route path="/totems" element={<TotemsAutoatencionView />} />
        <Route path="/reporteria" element={<ReporteriaView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
