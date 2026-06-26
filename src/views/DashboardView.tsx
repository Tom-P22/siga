import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

interface DashboardProps {
  onLogout: () => void;
}

export const DashboardView: React.FC<DashboardProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const modulos = [
    { id: 1, nombre: 'Control de Aduana', desc: 'Trámites de vehículos (CU12, CU13)' },
    { id: 2, nombre: 'Control SAG', desc: 'Declaraciones Juradas (CU15)' },
    { id: 3, nombre: 'Autoatención', desc: 'Gestión de pasajeros y tótems' },
    { id: 4, nombre: 'Reportería', desc: 'Dashboards y exportación (CU16, CU17)' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Institucional */}
      <header className="bg-blue-900 text-white p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">SIGA</h1>
          <span className="hidden md:inline-block text-sm text-blue-200">| Portal de Funcionario</span>
        </div>
        {/* CU02: Cerrar Sesión */}
        <Button variant="danger" onClick={onLogout}>
          Cerrar Sesión
        </Button>
      </header>

      {/* Contenido Principal */}
      <main className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Bienvenido/a al panel de control</h2>
          <p className="text-gray-600">Seleccione un módulo para comenzar sus operaciones.</p>
        </div>

        {/* Grilla responsiva de Tailwind */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modulos.map((mod) => (
            <div key={mod.id} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow border-t-4 border-t-blue-800 flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{mod.nombre}</h3>
              <p className="text-base text-gray-600 mb-6 flex-grow">{mod.desc}</p>
              <Button
                variant="secondary"
                className="w-full py-3 text-lg"
                onClick={() => mod.id === 1 ? navigate('/aduana') : alert('Módulo en desarrollo')}
              >
                Acceder
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};