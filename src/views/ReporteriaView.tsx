import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

type Tab = 'dashboard' | 'exportacion';

type Reporte = 'consolidado' | 'auditoria' | 'tiempos';

interface ExportState {
  reporte: Reporte;
  fechaDesde: string;
  fechaHasta: string;
  estado: string;
  totemId: string;
  cargando: boolean;
  mensaje: string | null;
  tipoMensaje: 'exito' | 'error' | null;
}

const flujoData = [
  { hora: '06:00', pasajeros: 12 }, { hora: '07:00', pasajeros: 28 },
  { hora: '08:00', pasajeros: 45 }, { hora: '09:00', pasajeros: 62 },
  { hora: '10:00', pasajeros: 58 }, { hora: '11:00', pasajeros: 71 },
  { hora: '12:00', pasajeros: 55 }, { hora: '13:00', pasajeros: 38 },
  { hora: '14:00', pasajeros: 48 }, { hora: '15:00', pasajeros: 52 },
  { hora: '16:00', pasajeros: 41 }, { hora: '17:00', pasajeros: 22 },
  { hora: '18:00', pasajeros: 15 },
];

const bienesData = [
  { nombre: 'Efectivo (USD/EUR)', valor: 35 },
  { nombre: 'Productos Agrícolas', valor: 25 },
  { nombre: 'Productos Animales', valor: 15 },
  { nombre: 'Medicamentos', valor: 12 },
  { nombre: 'Mercancías Comerciales', valor: 8 },
  { nombre: 'Otros', valor: 5 },
];

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'];

const totemIds = ['TOT-001', 'TOT-002', 'TOT-003', 'TOT-004', 'TOT-005', 'TOT-006'];

const reporteLabels: Record<Reporte, string> = {
  consolidado: 'Consolidado de Declaraciones',
  auditoria: 'Auditoría de Tótems',
  tiempos: 'Tiempos de Atención',
};

const estadoOptions = ['Todos', 'Pendiente', 'Validado', 'Requiere Inspección'];

export const ReporteriaView = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('dashboard');

  const [filtroFechaDesde, setFiltroFechaDesde] = useState('');
  const [filtroFechaHasta, setFiltroFechaHasta] = useState('');
  const [filtroTerminal, setFiltroTerminal] = useState('');

  const [exp, setExp] = useState<ExportState>({
    reporte: 'consolidado',
    fechaDesde: '', fechaHasta: '', estado: '', totemId: '',
    cargando: false, mensaje: null, tipoMensaje: null,
  });

  const handleExportar = (formato: 'csv' | 'excel' | 'pdf') => {
    setExp((prev) => ({ ...prev, cargando: true, mensaje: null, tipoMensaje: null }));
    setTimeout(() => {
      setExp((prev) => ({
        ...prev,
        cargando: false,
        mensaje: `Reporte "${reporteLabels[prev.reporte]}" generado en ${formato.toUpperCase()} exitosamente.`,
        tipoMensaje: 'exito',
      }));
    }, 2000);
  };

  const totemsOperativos = 4;
  const totemsIncidencias = 2;
  const totalDeclaraciones = 2847;
  const porcentajeInspeccion = 8.3;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-900 text-white p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="text-white hover:text-blue-200 mr-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">SIGA</h1>
          <span className="hidden md:inline-block text-sm text-blue-200">| Reportería</span>
        </div>
        <div className="text-sm text-blue-200">Funcionario: Alan Brito</div>
      </header>

      <main className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setTab('dashboard')}
            className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
              tab === 'dashboard' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setTab('exportacion')}
            className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
              tab === 'exportacion' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Exportación de Datos
          </button>
        </div>

        {tab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Fecha desde</label>
                  <input type="date" value={filtroFechaDesde} onChange={(e) => setFiltroFechaDesde(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Fecha hasta</label>
                  <input type="date" value={filtroFechaHasta} onChange={(e) => setFiltroFechaHasta(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Terminal / Sector</label>
                  <select value={filtroTerminal} onChange={(e) => setFiltroTerminal(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white">
                    <option value="">Todos</option>
                    <option value="sur">Terminal Sur</option>
                    <option value="norte">Terminal Norte</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <p className="text-sm text-gray-500 mb-1">Declaraciones Procesadas</p>
                <p className="text-3xl font-bold text-gray-900">{totalDeclaraciones.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">Últimos 30 días</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <p className="text-sm text-gray-500 mb-1">Tasa de Inspección</p>
                <p className="text-3xl font-bold text-orange-600">{porcentajeInspeccion}%</p>
                <p className="text-xs text-gray-500 mt-1">Marcadas para revisión física</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <p className="text-sm text-gray-500 mb-1">Tótems</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-green-600">{totemsOperativos}</p>
                  <span className="text-sm text-gray-400">operativos</span>
                  <p className="text-3xl font-bold text-red-600">{totemsIncidencias}</p>
                  <span className="text-sm text-gray-400">con incidencias</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">De {totemsOperativos + totemsIncidencias} equipos</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Flujo de Pasajeros por Hora</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={flujoData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="hora" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                    <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                    <Tooltip
                      formatter={(value) => [`${value} pasajeros`, 'Cantidad']}
                      contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }}
                    />
                    <Bar dataKey="pasajeros" fill="#1e3a5f" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tipos de Bienes Declarados</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={bienesData}
                      cx="50%" cy="50%"
                      innerRadius={60} outerRadius={100}
                      dataKey="valor"
                      nameKey="nombre"
                      paddingAngle={3}
                    >
                      {bienesData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Proporción']} />
                    <Legend
                      formatter={(value: string) => <span className="text-sm text-gray-700">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {tab === 'exportacion' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Generar Reporte</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Tipo de Reporte</label>
                  <select
                    value={exp.reporte}
                    onChange={(e) => setExp({ ...exp, reporte: e.target.value as Reporte })}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
                  >
                    <option value="consolidado">Consolidado de Declaraciones</option>
                    <option value="auditoria">Auditoría de Tótems</option>
                    <option value="tiempos">Tiempos de Atención</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Estado</label>
                  <select
                    value={exp.estado}
                    onChange={(e) => setExp({ ...exp, estado: e.target.value })}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
                  >
                    {estadoOptions.map((opt) => (
                      <option key={opt} value={opt === 'Todos' ? '' : opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Fecha desde</label>
                  <input
                    type="date" value={exp.fechaDesde}
                    onChange={(e) => setExp({ ...exp, fechaDesde: e.target.value })}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Fecha hasta</label>
                  <input
                    type="date" value={exp.fechaHasta}
                    onChange={(e) => setExp({ ...exp, fechaHasta: e.target.value })}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Tótem (opcional)</label>
                  <select
                    value={exp.totemId}
                    onChange={(e) => setExp({ ...exp, totemId: e.target.value })}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
                  >
                    <option value="">Todos</option>
                    {totemIds.map((id) => (
                      <option key={id} value={id}>{id}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 mr-2">Descargar como:</p>
                {exp.cargando ? (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="animate-spin w-5 h-5 text-blue-900" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Generando reporte...
                  </div>
                ) : (
                  <>
                    <button onClick={() => handleExportar('csv')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium transition-colors">
                      CSV
                    </button>
                    <button onClick={() => handleExportar('excel')}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-colors">
                      Excel
                    </button>
                    <button onClick={() => handleExportar('pdf')}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-colors">
                      PDF
                    </button>
                  </>
                )}
              </div>

              {exp.mensaje && (
                <div className={`mt-4 flex items-center gap-3 p-4 rounded-lg text-sm ${
                  exp.tipoMensaje === 'exito'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {exp.tipoMensaje === 'exito' ? (
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  <span>{exp.mensaje}</span>
                  <button onClick={() => setExp({ ...exp, mensaje: null, tipoMensaje: null })} className="ml-auto text-current opacity-60 hover:opacity-100">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
