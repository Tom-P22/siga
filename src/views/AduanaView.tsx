import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { MinorModal } from '../components/MinorModal';
import { Footer } from '../components/Footer';

interface Pasajero {
  nombre: string;
  rut: string;
  profesion: string;
  direccion: string;
  nacionalidad: string;
  fechaNacimiento: string;
  fotoUrl: string | null;
}

interface Menor {
  id: number;
  nombre: string;
  rut: string;
  fechaNacimiento: string;
  relacion: string;
  autorizacion: string;
  fotoUrl: string | null;
}

interface Formulario {
  id: number;
  titulo: string;
  descripcion: string;
  estado: 'aprobado' | 'pendiente' | 'observado';
}

const pasajeroMock: Pasajero = {
  nombre: 'Juan Carlos Muñoz González',
  rut: '15.234.567-8',
  profesion: 'Ingeniero Comercial',
  direccion: 'Av. Providencia 1234, Depto 501, Santiago',
  nacionalidad: 'Chilena',
  fechaNacimiento: '12/05/1985',
  fotoUrl: null,
};

const menoresMock: Menor[] = [
  {
    id: 1,
    nombre: 'Sofía Muñoz Rojas',
    rut: '26.789.012-3',
    fechaNacimiento: '15/03/2018',
    relacion: 'Hija',
    autorizacion: 'Documento N° 123456 - Juzgado de Familia de Santiago',
    fotoUrl: null,
  },
  {
    id: 2,
    nombre: 'Mateo Muñoz Rojas',
    rut: '27.123.456-7',
    fechaNacimiento: '22/08/2020',
    relacion: 'Hijo',
    autorizacion: 'Documento N° 123457 - Juzgado de Familia de Santiago',
    fotoUrl: null,
  },
];

const formulariosMock: Formulario[] = [
  { id: 1, titulo: 'Declaración de Equipaje (F1)', descripcion: 'Artículos personales y bienes declarados ingresar al país.', estado: 'aprobado' },
  { id: 2, titulo: 'Declaración de Vehículo (F2)', descripcion: 'Vehículo motorizado: patente ABC-123, marca Toyota, modelo Corolla.', estado: 'aprobado' },
  { id: 3, titulo: 'Declaración de Mercancías (F3)', descripcion: 'Mercancías comerciales con valor superior a USD 1.000.', estado: 'pendiente' },
];

const estadoBadge: Record<Formulario['estado'], { clase: string; texto: string }> = {
  aprobado: { clase: 'bg-green-100 text-green-800', texto: 'Aprobado' },
  pendiente: { clase: 'bg-yellow-100 text-yellow-800', texto: 'Pendiente' },
  observado: { clase: 'bg-red-100 text-red-800', texto: 'Observado' },
};

export const AduanaView = () => {
  const navigate = useNavigate();
  const [estado, setEstado] = useState<'idle' | 'loading' | 'data'>('idle');
  const [menorSeleccionado, setMenorSeleccionado] = useState<Menor | null>(null);

  const handleEscanear = () => {
    setEstado('loading');
    setTimeout(() => setEstado('data'), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-900 text-white p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="text-white hover:text-blue-200 mr-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">SIGA</h1>
          <span className="hidden md:inline-block text-sm text-blue-200">| Control de Aduana</span>
        </div>
        <div className="text-sm text-blue-200">Funcionario: Alan Brito</div>
      </header>

      <main className="p-6 max-w-4xl mx-auto">
        {estado === 'loading' ? (
          <div className="flex flex-col items-center mt-16 gap-8">
            <div className="flex flex-col items-center gap-6">
              <svg className="animate-spin w-20 h-20 text-blue-900" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <p className="text-xl text-gray-600 font-medium">Escaneando código QR...</p>
              <p className="text-sm text-gray-400">Procesando datos del pasajero</p>
            </div>
          </div>
        ) : estado === 'idle' ? (
          <div className="flex flex-col items-center mt-16 gap-8">
            <button
              onClick={handleEscanear}
              className="bg-blue-900 text-white p-12 rounded-full hover:bg-blue-800 transition-colors shadow-lg"
            >
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h4v4H3V3zm14 0h4v4h-4V3zM3 17h4v4H3v-4zm14 0h4v4h-4v-4zM7 7h2v2H7V7zm8 0h2v2h-2V7zm-8 8h2v2H7v-2zm8 0h2v2h-2v-2zm-4-4h2v2h-2v-2zm0 4h2v2h-2v-2z" />
              </svg>
            </button>
            <div className="text-center">
              <p className="text-xl text-gray-600 font-medium">Presione para escanear QR</p>
              <p className="text-sm text-gray-400 mt-1">Código único del pasajero</p>
            </div>
            <div className="flex items-center gap-4 w-full max-w-sm">
              <hr className="flex-1 border-gray-300" />
              <span className="text-sm text-gray-400">o</span>
              <hr className="flex-1 border-gray-300" />
            </div>
            <Button variant="secondary" className="py-3 px-8 text-lg" onClick={() => navigate('/aduana/ingreso-manual')}>
              Ingreso Manual
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Datos del Pasajero</h2>
              <Button variant="secondary" onClick={handleEscanear}>
                Nuevo Escaneo
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center">
                  {pasajeroMock.fotoUrl ? (
                    <img src={pasajeroMock.fotoUrl} alt="Foto del pasajero" className="w-40 h-40 rounded-full object-cover border-4 border-blue-200" />
                  ) : (
                    <div className="w-40 h-40 rounded-full bg-blue-100 border-4 border-blue-200 flex items-center justify-center">
                      <svg className="w-20 h-20 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                  <p className="text-sm text-gray-500 mt-2">Foto del pasajero</p>
                </div>
              </div>

              <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Información Personal</h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                  <div>
                    <dt className="text-sm text-gray-500">Nombre Completo</dt>
                    <dd className="text-base font-medium text-gray-900">{pasajeroMock.nombre}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">RUT</dt>
                    <dd className="text-base font-medium text-gray-900">{pasajeroMock.rut}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Profesión</dt>
                    <dd className="text-base font-medium text-gray-900">{pasajeroMock.profesion}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Nacionalidad</dt>
                    <dd className="text-base font-medium text-gray-900">{pasajeroMock.nacionalidad}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Fecha de Nacimiento</dt>
                    <dd className="text-base font-medium text-gray-900">{pasajeroMock.fechaNacimiento}</dd>
                  </div>
                  <div className="md:col-span-2">
                    <dt className="text-sm text-gray-500">Dirección</dt>
                    <dd className="text-base font-medium text-gray-900">{pasajeroMock.direccion}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Formularios del Paso Fronterizo</h3>
              <div className="space-y-4">
                {formulariosMock.map((f) => {
                  const badge = estadoBadge[f.estado];
                  return (
                    <div key={f.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                      <div>
                        <p className="font-medium text-gray-900">{f.titulo}</p>
                        <p className="text-sm text-gray-600 mt-1">{f.descripcion}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium shrink-0 ml-4 ${badge.clase}`}>
                        {badge.texto}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-6 h-6 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900">Menores a Cargo</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                El pasajero viaja con {menoresMock.length} menores. Toque cada uno para verificar sus datos.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {menoresMock.map((menor) => (
                  <button
                    key={menor.id}
                    onClick={() => setMenorSeleccionado(menor)}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors text-left"
                  >
                    <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                      <svg className="w-7 h-7 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{menor.nombre}</p>
                      <p className="text-sm text-gray-500">{menor.rut}</p>
                      <p className="text-xs text-blue-600 mt-1">Tocar para verificar →</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-2">
              <Button variant="danger" className="py-3 px-8 text-lg">
                Rechazar
              </Button>
              <Button variant="primary" className="py-3 px-8 text-lg">
                Validar
              </Button>
            </div>
          </div>
        )}
      </main>

      {menorSeleccionado && (
        <MinorModal menor={menorSeleccionado} onClose={() => setMenorSeleccionado(null)} />
      )}
      <Footer />
    </div>
  );
};
