import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { DeclaracionDetalleModal } from '../components/DeclaracionDetalleModal';
import { Footer } from '../components/Footer';

interface BienDeclarado {
  nombre: string;
  cantidad: string;
  valor: string;
  restringido: boolean;
}

interface Pregunta {
  pregunta: string;
  respuesta: string;
}

interface Declaracion {
  id: number;
  fecha: string;
  hora: string;
  pasajero: string;
  documento: string;
  totem: number;
  estado: 'pendiente' | 'validado' | 'inspeccion';
  restringido: boolean;
  nacionalidad: string;
  origen: string;
  destino: string;
  bienes: BienDeclarado[];
  cuestionario: Pregunta[];
}

const declaracionesMock: Declaracion[] = [
  {
    id: 1, fecha: '26/06/2026', hora: '09:15', pasajero: 'María José Rojas', documento: '25.123.456-7',
    totem: 3, estado: 'pendiente', restringido: true,
    nacionalidad: 'Chilena', origen: 'Mendoza, Argentina', destino: 'Santiago, Chile',
    bienes: [
      { nombre: 'Efectivo USD', cantidad: 'USD 8,500', valor: '$8,500 USD', restringido: true },
      { nombre: 'Vino artesanal', cantidad: '6 botellas (4.5 L)', valor: '$120 USD', restringido: false },
      { nombre: 'Quesos artesanales', cantidad: '3 kg', valor: '$45 USD', restringido: false },
    ],
    cuestionario: [
      { pregunta: '¿Trae productos agrícolas o animales?', respuesta: 'Sí, queso y vino artesanal.' },
      { pregunta: '¿Declara más de USD 10,000 en efectivo?', respuesta: 'No, declaro USD 8,500.' },
      { pregunta: '¿Ingresa mercancías para fines comerciales?', respuesta: 'No, todo para consumo personal.' },
    ],
  },
  {
    id: 2, fecha: '26/06/2026', hora: '10:30', pasajero: 'Pedro González Muñoz', documento: '18.765.432-1',
    totem: 1, estado: 'validado', restringido: false,
    nacionalidad: 'Chilena', origen: 'Buenos Aires, Argentina', destino: 'Valparaíso, Chile',
    bienes: [
      { nombre: 'Ropa y artículos personales', cantidad: '2 maletas', valor: '$2,000 USD', restringido: false },
      { nombre: 'Libros y documentos', cantidad: '5 kg', valor: '$150 USD', restringido: false },
    ],
    cuestionario: [
      { pregunta: '¿Trae productos agrícolas o animales?', respuesta: 'No.' },
      { pregunta: '¿Declara más de USD 10,000 en efectivo?', respuesta: 'No.' },
      { pregunta: '¿Ingresa mercancías para fines comerciales?', respuesta: 'No.' },
    ],
  },
  {
    id: 3, fecha: '26/06/2026', hora: '11:00', pasajero: 'Ana Soto Martínez', documento: '22.987.654-3',
    totem: 2, estado: 'pendiente', restringido: true,
    nacionalidad: 'Argentina', origen: 'Santiago, Chile', destino: 'Mendoza, Argentina',
    bienes: [
      { nombre: 'Productos de belleza', cantidad: '15 unidades', valor: '$350 USD', restringido: false },
      { nombre: 'Semillas de hortalizas', cantidad: '0.5 kg', valor: '$25 USD', restringido: true },
    ],
    cuestionario: [
      { pregunta: '¿Trae productos agrícolas o animales?', respuesta: 'Sí, semillas para cultivo personal.' },
      { pregunta: '¿Declara más de USD 10,000 en efectivo?', respuesta: 'No.' },
      { pregunta: '¿Ingresa mercancías para fines comerciales?', respuesta: 'No.' },
    ],
  },
  {
    id: 4, fecha: '26/06/2026', hora: '11:45', pasajero: 'Carlos Muñoz Rojas', documento: '15.234.567-8',
    totem: 1, estado: 'inspeccion', restringido: true,
    nacionalidad: 'Chilena', origen: 'Lima, Perú', destino: 'Santiago, Chile',
    bienes: [
      { nombre: 'Efectivo USD', cantidad: 'USD 12,500', valor: '$12,500 USD', restringido: true },
      { nombre: 'Productos textiles', cantidad: '20 unidades', valor: '$1,200 USD', restringido: false },
      { nombre: 'Medicamentos sin receta', cantidad: '10 cajas', valor: '$200 USD', restringido: true },
    ],
    cuestionario: [
      { pregunta: '¿Trae productos agrícolas o animales?', respuesta: 'No.' },
      { pregunta: '¿Declara más de USD 10,000 en efectivo?', respuesta: 'Sí, USD 12,500.' },
      { pregunta: '¿Ingresa mercancías para fines comerciales?', respuesta: 'Sí, textiles para venta.' },
    ],
  },
  {
    id: 5, fecha: '26/06/2026', hora: '12:20', pasajero: 'Laura Fernández Díaz', documento: '26.111.222-3',
    totem: 4, estado: 'pendiente', restringido: false,
    nacionalidad: 'Chilena', origen: 'Bariloche, Argentina', destino: 'Puerto Montt, Chile',
    bienes: [
      { nombre: 'Equipo de esquí', cantidad: '1 set', valor: '$800 USD', restringido: false },
      { nombre: 'Ropa de montaña', cantidad: '3 prendas', valor: '$400 USD', restringido: false },
    ],
    cuestionario: [
      { pregunta: '¿Trae productos agrícolas o animales?', respuesta: 'No.' },
      { pregunta: '¿Declara más de USD 10,000 en efectivo?', respuesta: 'No.' },
      { pregunta: '¿Ingresa mercancías para fines comerciales?', respuesta: 'No.' },
    ],
  },
  {
    id: 6, fecha: '25/06/2026', hora: '16:00', pasajero: 'Roberto Castro Pino', documento: '14.567.890-1',
    totem: 2, estado: 'validado', restringido: false,
    nacionalidad: 'Chilena', origen: 'São Paulo, Brasil', destino: 'Santiago, Chile',
    bienes: [
      { nombre: 'Electrónicos', cantidad: '1 laptop, 1 tablet', valor: '$2,500 USD', restringido: false },
    ],
    cuestionario: [
      { pregunta: '¿Trae productos agrícolas o animales?', respuesta: 'No.' },
      { pregunta: '¿Declara más de USD 10,000 en efectivo?', respuesta: 'No.' },
      { pregunta: '¿Ingresa mercancías para fines comerciales?', respuesta: 'No.' },
    ],
  },
];

const estadoBadge: Record<Declaracion['estado'], { clase: string; texto: string }> = {
  pendiente: { clase: 'bg-yellow-100 text-yellow-800', texto: 'Pendiente' },
  validado: { clase: 'bg-green-100 text-green-800', texto: 'Validado' },
  inspeccion: { clase: 'bg-red-100 text-red-800', texto: 'Requiere Inspección' },
};

export const DatosAutodeclaradosView = () => {
  const navigate = useNavigate();
  const [filtroFechaDesde, setFiltroFechaDesde] = useState('');
  const [filtroFechaHasta, setFiltroFechaHasta] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<string>('');
  const [filtroDocumento, setFiltroDocumento] = useState('');
  const [declaracionSeleccionada, setDeclaracionSeleccionada] = useState<Declaracion | null>(null);

  const filtradas = declaracionesMock.filter((d) => {
    if (filtroEstado && d.estado !== filtroEstado) return false;
    if (filtroDocumento && !d.documento.toLowerCase().includes(filtroDocumento.toLowerCase())) return false;
    return true;
  });

  const limpiarFiltros = () => {
    setFiltroFechaDesde('');
    setFiltroFechaHasta('');
    setFiltroEstado('');
    setFiltroDocumento('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-900 text-white p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/revision-autoatencion')} className="text-white hover:text-blue-200 mr-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">SIGA</h1>
          <span className="hidden md:inline-block text-sm text-blue-200">| Datos Autodeclarados</span>
        </div>
        <div className="text-sm text-blue-200">Funcionario: Alan Brito</div>
      </header>

      <main className="p-6 max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Declaraciones de Pasajeros</h2>
          <p className="text-gray-600 mt-1">Revise y valide las declaraciones realizadas en los tótems de autoatención.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Fecha desde</label>
              <input
                type="date"
                value={filtroFechaDesde}
                onChange={(e) => setFiltroFechaDesde(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Fecha hasta</label>
              <input
                type="date"
                value={filtroFechaHasta}
                onChange={(e) => setFiltroFechaHasta(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Estado</label>
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white"
              >
                <option value="">Todos</option>
                <option value="pendiente">Pendiente</option>
                <option value="validado">Validado</option>
                <option value="inspeccion">Requiere Inspección</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Documento</label>
              <input
                type="text"
                value={filtroDocumento}
                onChange={(e) => setFiltroDocumento(e.target.value)}
                placeholder="RUT o Pasaporte"
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
            <Button variant="secondary" onClick={limpiarFiltros} className="py-2">
              Limpiar Filtros
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Fecha/Hora</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Pasajero</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Documento</th>
                  <th className="text-center px-4 py-3 text-sm font-semibold text-gray-600">Tótem</th>
                  <th className="text-center px-4 py-3 text-sm font-semibold text-gray-600">Estado</th>
                  <th className="text-center px-4 py-3 text-sm font-semibold text-gray-600">Restringido</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-600">Acción</th>
                </tr>
              </thead>
              <tbody>
                {filtradas.map((d) => {
                  const badge = estadoBadge[d.estado];
                  return (
                    <tr
                      key={d.id}
                      className="border-b border-gray-100 hover:bg-teal-50/50 transition-colors cursor-pointer"
                      onClick={() => setDeclaracionSeleccionada(d)}
                    >
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {d.fecha} {d.hora}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{d.pasajero}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{d.documento}</td>
                      <td className="px-4 py-3 text-sm text-center text-gray-600">{d.totem}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.clase}`}>
                          {badge.texto}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {d.restringido ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-red-700 bg-red-50 px-2 py-0.5 rounded-full">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            Sí
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">No</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={(e) => { e.stopPropagation(); setDeclaracionSeleccionada(d); }}
                          className="text-sm font-medium text-teal-700 hover:text-teal-800"
                        >
                          Ver detalle
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filtradas.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No se encontraron declaraciones con los filtros seleccionados.
            </div>
          )}
        </div>
      </main>

      {declaracionSeleccionada && (
        <DeclaracionDetalleModal
          declaracion={declaracionSeleccionada}
          onClose={() => setDeclaracionSeleccionada(null)}
        />
      )}
      <Footer />
    </div>
  );
};
