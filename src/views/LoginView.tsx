import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

interface LoginProps {
  onLoginSuccess: () => void;
}

export const LoginView: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [credenciales, setCredenciales] = useState({ rut: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la conexión a la API para validar. Por ahora simulamos éxito:
    console.log("Autenticando...", credenciales);
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="SIGA" className="w-[400px] h-[400px] object-contain mx-auto" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="RUT / Usuario"
            name="rut"
            type="text"
            placeholder="Ej: 12.345.678-9"
            value={credenciales.rut}
            onChange={handleChange}
            required
          />
          <Input
            label="Contraseña"
            name="password"
            type="password"
            placeholder="••••••••"
            value={credenciales.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" className="w-full mt-4" variant="primary">
            Ingresar al Sistema
          </Button>
        </form>
      </div>
    </div>
  );
};