import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

interface FormData {
  nombre: string;
  rut: string;
  profesion: string;
  direccion: string;
  nacionalidad: string;
  fechaNacimiento: string;
  email: string;
  telefono: string;
}

export const IngresoManualView = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>({
    nombre: '',
    rut: '',
    profesion: '',
    direccion: '',
    nacionalidad: 'Chilena',
    fechaNacimiento: '',
    email: '',
    telefono: '',
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => navigate('/aduana'), 2000);
  };

  if (enviado) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <svg className="w-20 h-20 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800">Datos Registrados</h2>
          <p className="text-gray-600">Redirigiendo al panel de control de aduana...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-900 text-white p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/aduana')} className="text-white hover:text-blue-200 mr-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">SIGA</h1>
          <span className="hidden md:inline-block text-sm text-blue-200">| Ingreso Manual</span>
        </div>
        <div className="text-sm text-blue-200">Funcionario: Alan Brito</div>
      </header>

      <main className="p-6 max-w-2xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Ingreso Manual de Pasajero</h2>
          <p className="text-gray-600 mt-1">Complete los datos del pasajero para registrar su ingreso.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Input
                label="Nombre Completo *"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ej: Juan Carlos Muñoz González"
                required
              />
            </div>

            <Input
              label="RUT *"
              name="rut"
              value={form.rut}
              onChange={handleChange}
              placeholder="Ej: 15.234.567-8"
              required
            />

            <Input
              label="Fecha de Nacimiento *"
              name="fechaNacimiento"
              type="date"
              value={form.fechaNacimiento}
              onChange={handleChange}
              required
            />

            <Input
              label="Profesión"
              name="profesion"
              value={form.profesion}
              onChange={handleChange}
              placeholder="Ej: Ingeniero Comercial"
            />

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Nacionalidad</label>
              <select
                name="nacionalidad"
                value={form.nacionalidad}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent bg-white"
              >
                <option value="Chilena">Chilena</option>
                <option value="Argentina">Argentina</option>
                <option value="Peruana">Peruana</option>
                <option value="Boliviana">Boliviana</option>
                <option value="Brasileña">Brasileña</option>
                <option value="Colombiana">Colombiana</option>
                <option value="Ecuatoriana">Ecuatoriana</option>
                <option value="Uruguaya">Uruguaya</option>
                <option value="Paraguaya">Paraguaya</option>
                <option value="Venezolana">Venezolana</option>
                <option value="Extranjera">Extranjera</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <Input
                label="Dirección"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                placeholder="Ej: Av. Providencia 1234, Depto 501, Santiago"
              />
            </div>

            <Input
              label="Correo Electrónico"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Ej: juan@correo.cl"
            />

            <Input
              label="Teléfono"
              name="telefono"
              type="tel"
              value={form.telefono}
              onChange={handleChange}
              placeholder="Ej: +56 9 1234 5678"
            />
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
            <Button variant="secondary" type="button" onClick={() => navigate('/aduana')}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Registrar Pasajero
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};
