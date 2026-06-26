import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { DeclaracionModal } from '../components/DeclaracionModal';
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

interface Declaracion {
  id: number;
  titulo: string;
  tipo: string;
  descripcion: string;
  estado: 'verificado' | 'pendiente' | 'rechazado' | 'observado';
  fecha: string;
  numeroDocumento: string;
  observaciones?: string;
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

const declaracionesMock: Declaracion[] = [
  {
    id: 1,
    titulo: 'Declaración de Productos Agrícolas',
    tipo: 'Fitozoosanitaria',
    descripcion: 'Declaración de ingreso de frutas frescas (manzanas, peras) provenientes de Argentina. Lote N° A-1234, 500 kg. Certificado fitosanitario adjunto.',
    estado: 'verificado',
    fecha: '15/06/2026',
    numeroDocumento: 'SAG-DJ-2026-001234',
  },
  {
    id: 2,
    titulo: 'Declaración de Productos Animales',
    tipo: 'Pecuaria',
    descripcion: 'Declaración de ingreso de productos cárnicos procesados (jamón serrano, 200 kg). Origen: España, vía Uruguay. Certificado sanitario N° CS-5678.',
    estado: 'pendiente',
    fecha: '15/06/2026',
    numeroDocumento: 'SAG-DJ-2026-001235',
    observaciones: 'Pendiente validación de certificado sanitario de origen.',
  },
  {
    id: 3,
    titulo: 'Declaración de Alimentos Procesados',
    tipo: 'Inocuidad',
    descripcion: 'Declaración de ingreso de alimentos procesados envasados (conservas, pastas, lácteos UHT). 12 pallets, valor estimado USD 15,000.',
    estado: 'verificado',
    fecha: '14/06/2026',
    numeroDocumento: 'SAG-DJ-2026-001233',
  },
  {
    id: 4,
    titulo: 'Declaración de Material Vegetal',
    tipo: 'Fitozoosanitaria',
    descripcion: 'Declaración de ingreso de material vegetal para propagación (semillas de hortalizas). 5 kg, variedades: tomate, lechuga, pimiento. Permiso de importación N° PI-7890.',
    estado: 'observado',
    fecha: '14/06/2026',
    numeroDocumento: 'SAG-DJ-2026-001232',
    observaciones: 'El permiso de importación no incluye la variedad de pimiento. Se requiere documento complementario.',
  },
  {
    id: 5,
    titulo: 'Declaración de Productos Biológicos',
    tipo: 'Inocuidad',
    descripcion: 'Declaración de ingreso de productos biológicos para uso veterinario (vacunas, sueros). 3 cajas térmicas, temperatura controlada. Registro ISP N° R-4567.',
    estado: 'pendiente',
    fecha: '13/06/2026',
    numeroDocumento: 'SAG-DJ-2026-001231',
  },
];

const estadoBadge: Record<Declaracion['estado'], { clase: string; texto: string }> = {
  verificado: { clase: 'bg-green-100 text-green-800', texto: 'Verificado' },
  pendiente: { clase: 'bg-yellow-100 text-yellow-800', texto: 'Pendiente' },
  rechazado: { clase: 'bg-red-100 text-red-800', texto: 'Rechazado' },
  observado: { clase: 'bg-orange-100 text-orange-800', texto: 'Observado' },
};

export const SagView = () => {
  const navigate = useNavigate();
  const [estado, setEstado] = useState<'idle' | 'loading' | 'data'>('idle');
  const [rutInput, setRutInput] = useState('');
  const [loadingType, setLoadingType] = useState<'qr' | 'rut'>('qr');
  const [declaracionSeleccionada, setDeclaracionSeleccionada] = useState<Declaracion | null>(null);

  const handleEscanear = () => {
    setLoadingType('qr');
    setEstado('loading');
    setTimeout(() => setEstado('data'), 1500);
  };

  const handleBuscarPorRut = () => {
    if (!rutInput.trim()) return;
    setLoadingType('rut');
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
          <span className="hidden md:inline-block text-sm text-blue-200">| Control SAG</span>
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
              <p className="text-xl text-gray-600 font-medium">{loadingType === 'qr' ? 'Escaneando código QR...' : 'Buscando datos del pasajero...'}</p>
              <p className="text-sm text-gray-400">{loadingType === 'qr' ? 'Cargando declaraciones del pasajero' : 'Consultando registros del SAG'}</p>
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
            <div className="flex items-center gap-2 w-full max-w-sm">
              <input
                type="text"
                value={rutInput}
                onChange={(e) => setRutInput(e.target.value)}
                placeholder="Ingrese RUT del pasajero"
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-800"
                onKeyDown={(e) => e.key === 'Enter' && handleBuscarPorRut()}
              />
              <Button onClick={handleBuscarPorRut}>
                Buscar
              </Button>
            </div>
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
              <div className="flex items-center gap-3 mb-6">
                <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900">Declaraciones Juradas SAG</h3>
              </div>
              <div className="space-y-3">
                {declaracionesMock.map((d) => {
                  const badge = estadoBadge[d.estado];
                  return (
                    <button
                      key={d.id}
                      onClick={() => setDeclaracionSeleccionada(d)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-emerald-50 hover:border-emerald-200 transition-colors text-left"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900">{d.titulo}</p>
                          <span className="text-xs text-gray-400">| {d.tipo}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5">N° {d.numeroDocumento}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 ml-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${badge.clase}`}>
                          {badge.texto}
                        </span>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-end gap-4">
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

      {declaracionSeleccionada && (
        <DeclaracionModal declaracion={declaracionSeleccionada} onClose={() => setDeclaracionSeleccionada(null)} />
      )}
      <Footer />
    </div>
  );
};
