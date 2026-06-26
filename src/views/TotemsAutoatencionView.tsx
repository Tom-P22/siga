import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorLog {
  hora: string;
  mensaje: string;
  tipo: 'error' | 'warning' | 'info';
}

interface Totem {
  id: string;
  ubicacion: string;
  ip: string;
  mac: string;
  software: string;
  ultimaSincronizacion: string;
  online: boolean;
  nivelPapel: number;
  alertas: string[];
  errores: ErrorLog[];
  enMantenimiento: boolean;
}

const totemsMock: Totem[] = [
  {
    id: 'TOT-001', ubicacion: 'Terminal Sur, Fila 1', ip: '192.168.1.101', mac: 'AA:BB:CC:11:22:01',
    software: 'SIGA-Totem v3.2.1', ultimaSincronizacion: '26/06/2026 14:32:18',
    online: true, nivelPapel: 80, alertas: [],
    errores: [
      { hora: '26/06/2026 13:15', mensaje: 'Lectura de pasaporte lenta (>5s)', tipo: 'warning' },
    ],
    enMantenimiento: false,
  },
  {
    id: 'TOT-002', ubicacion: 'Terminal Sur, Fila 2', ip: '192.168.1.102', mac: 'AA:BB:CC:11:22:02',
    software: 'SIGA-Totem v3.2.1', ultimaSincronizacion: '26/06/2026 14:30:05',
    online: true, nivelPapel: 45, alertas: ['Nivel de papel bajo'],
    errores: [
      { hora: '26/06/2026 10:22', mensaje: 'Impresora: nivel de papel por debajo del 50%', tipo: 'warning' },
    ],
    enMantenimiento: false,
  },
  {
    id: 'TOT-003', ubicacion: 'Terminal Sur, Fila 3', ip: '192.168.1.103', mac: 'AA:BB:CC:11:22:03',
    software: 'SIGA-Totem v3.2.0', ultimaSincronizacion: '26/06/2026 12:10:42',
    online: false, nivelPapel: 0, alertas: ['Fuera de línea', 'Lector de pasaportes desconectado'],
    errores: [
      { hora: '26/06/2026 12:11', mensaje: 'Pérdida de conexión con el servidor', tipo: 'error' },
      { hora: '26/06/2026 11:50', mensaje: 'Lector de pasaportes no responde', tipo: 'error' },
      { hora: '26/06/2026 11:45', mensaje: 'Timeout en comunicación con hardware', tipo: 'error' },
    ],
    enMantenimiento: false,
  },
  {
    id: 'TOT-004', ubicacion: 'Terminal Norte, Fila 1', ip: '192.168.1.104', mac: 'AA:BB:CC:11:22:04',
    software: 'SIGA-Totem v3.2.1', ultimaSincronizacion: '26/06/2026 14:31:55',
    online: true, nivelPapel: 100, alertas: [],
    errores: [],
    enMantenimiento: false,
  },
  {
    id: 'TOT-005', ubicacion: 'Terminal Norte, Fila 2', ip: '192.168.1.105', mac: 'AA:BB:CC:11:22:05',
    software: 'SIGA-Totem v3.2.1', ultimaSincronizacion: '26/06/2026 14:29:30',
    online: true, nivelPapel: 10, alertas: ['Nivel de papel crítico'],
    errores: [
      { hora: '26/06/2026 14:00', mensaje: 'Impresora: nivel de papel crítico (<10%)', tipo: 'error' },
    ],
    enMantenimiento: false,
  },
  {
    id: 'TOT-006', ubicacion: 'Terminal Norte, Fila 3', ip: '192.168.1.106', mac: 'AA:BB:CC:11:22:06',
    software: 'SIGA-Totem v3.1.9', ultimaSincronizacion: '25/06/2026 18:00:00',
    online: false, alertas: ['En mantenimiento programado'],
    nivelPapel: 60, errores: [],
    enMantenimiento: true,
  },
];

const nivelPapelColor = (nivel: number) => {
  if (nivel <= 10) return 'bg-red-500';
  if (nivel <= 50) return 'bg-yellow-500';
  return 'bg-green-500';
};

const nivelPapelTexto = (nivel: number) => {
  if (nivel === 0) return 'Sin papel';
  if (nivel <= 10) return 'Crítico';
  if (nivel <= 50) return 'Bajo';
  return 'Normal';
};

export const TotemsAutoatencionView = () => {
  const navigate = useNavigate();
  const [totems, setTotems] = useState(totemsMock);
  const [totemExpandido, setTotemExpandido] = useState<string | null>(null);

  const handleReiniciar = (id: string) => {
    if (confirm(`¿Reiniciar el tótem ${id}?`)) {
      alert(`Comando de reinicio enviado a ${id}`);
    }
  };

  const handleToggleMantenimiento = (id: string) => {
    setTotems((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, enMantenimiento: !t.enMantenimiento } : t
      )
    );
  };

  const total = totems.length;
  const enLinea = totems.filter((t) => t.online && !t.enMantenimiento).length;
  const fueraLinea = totems.filter((t) => !t.online && !t.enMantenimiento).length;
  const conAlertas = totems.filter((t) => t.alertas.length > 0).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-900 text-white p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/revision-autoatencion')} className="text-white hover:text-blue-200 mr-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">SIGA</h1>
          <span className="hidden md:inline-block text-sm text-blue-200">| Tótems de Autoatención</span>
        </div>
        <div className="text-sm text-blue-200">Funcionario: Alan Brito</div>
      </header>

      <main className="p-6 max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Monitoreo de Tótems</h2>
          <p className="text-gray-600 mt-1">Estado en tiempo real de los tótems de autoatención del paso fronterizo.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <p className="text-3xl font-bold text-gray-900">{total}</p>
            <p className="text-sm text-gray-500 mt-1">Totales</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-green-200 p-4 text-center">
            <p className="text-3xl font-bold text-green-600">{enLinea}</p>
            <p className="text-sm text-green-600 mt-1">En línea</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-red-200 p-4 text-center">
            <p className="text-3xl font-bold text-red-600">{fueraLinea}</p>
            <p className="text-sm text-red-600 mt-1">Fuera de línea</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-yellow-200 p-4 text-center">
            <p className="text-3xl font-bold text-yellow-600">{conAlertas}</p>
            <p className="text-sm text-yellow-600 mt-1">Con alertas</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {totems.map((totem) => (
            <div
              key={totem.id}
              className={`bg-white rounded-xl shadow-sm border-2 transition-colors ${
                totem.enMantenimiento
                  ? 'border-gray-300 opacity-70'
                  : totem.online
                    ? 'border-green-200'
                    : 'border-red-200'
              }`}
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-gray-900">{totem.id}</h3>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          totem.enMantenimiento
                            ? 'bg-gray-100 text-gray-600'
                            : totem.online
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            totem.enMantenimiento
                              ? 'bg-gray-400'
                              : totem.online
                                ? 'bg-green-500'
                                : 'bg-red-500'
                          }`}
                        />
                        {totem.enMantenimiento ? 'En Mantenimiento' : totem.online ? 'En línea' : 'Fuera de línea'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-0.5">{totem.ubicacion}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-gray-400">Papel</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${nivelPapelColor(totem.nivelPapel)}`}
                          style={{ width: `${totem.nivelPapel}%` }}
                        />
                      </div>
                      <span className={`text-xs font-medium ${
                        totem.nivelPapel <= 10 ? 'text-red-600' : totem.nivelPapel <= 50 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {nivelPapelTexto(totem.nivelPapel)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
                  <div>
                    <span className="text-gray-500">IP:</span>{' '}
                    <span className="font-mono text-gray-900">{totem.ip}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">MAC:</span>{' '}
                    <span className="font-mono text-gray-900">{totem.mac}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500">Software:</span>{' '}
                    <span className="text-gray-900">{totem.software}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500">Última sincronización:</span>{' '}
                    <span className="text-gray-900">{totem.ultimaSincronizacion}</span>
                  </div>
                </div>

                {totem.alertas.length > 0 && (
                  <div className="space-y-1 mb-4">
                    {totem.alertas.map((alerta, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm text-red-700 bg-red-50 rounded-lg px-3 py-2"
                      >
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        {alerta}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleReiniciar(totem.id)}
                    disabled={totem.enMantenimiento}
                    className="flex-1 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                  >
                    Reiniciar
                  </button>
                  <button
                    onClick={() => handleToggleMantenimiento(totem.id)}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                      totem.enMantenimiento
                        ? 'bg-teal-600 text-white hover:bg-teal-700'
                        : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                    }`}
                  >
                    {totem.enMantenimiento ? 'Activar' : 'Mantenimiento'}
                  </button>
                </div>

                {totem.errores.length > 0 && (
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <button
                      onClick={() => setTotemExpandido(totemExpandido === totem.id ? null : totem.id)}
                      className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      <svg
                        className={`w-4 h-4 transition-transform ${totemExpandido === totem.id ? 'rotate-90' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Registro de Errores ({totem.errores.length})
                    </button>
                    {totemExpandido === totem.id && (
                      <div className="mt-3 space-y-2">
                        {totem.errores.map((err, i) => (
                          <div
                            key={i}
                            className={`flex items-start gap-2 p-2 rounded-lg text-sm ${
                              err.tipo === 'error'
                                ? 'bg-red-50 text-red-700'
                                : err.tipo === 'warning'
                                  ? 'bg-yellow-50 text-yellow-700'
                                  : 'bg-blue-50 text-blue-700'
                            }`}
                          >
                            <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              {err.tipo === 'error' ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              ) : err.tipo === 'warning' ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                              ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              )}
                            </svg>
                            <div>
                              <p className="text-xs opacity-75">{err.hora}</p>
                              <p>{err.mensaje}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
