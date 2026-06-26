import type { ReactNode } from 'react';

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

interface DeclaracionDetalleModalProps {
  declaracion: Declaracion;
  onClose: () => void;
}

const estadoConfig = {
  pendiente: { clase: 'bg-yellow-100 text-yellow-800', texto: 'Pendiente' },
  validado: { clase: 'bg-green-100 text-green-800', texto: 'Validado' },
  inspeccion: { clase: 'bg-red-100 text-red-800', texto: 'Requiere Inspección' },
};

function Fila({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-sm text-gray-500">{label}</dt>
      <dd className="text-base font-medium text-gray-900">{children}</dd>
    </div>
  );
}

export const DeclaracionDetalleModal = ({ declaracion, onClose }: DeclaracionDetalleModalProps) => {
  const badge = estadoConfig[declaracion.estado];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-teal-700 text-white p-6 flex items-center justify-between sticky top-0">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h2 className="text-xl font-bold">Detalle de Declaración</h2>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{declaracion.pasajero}</h3>
              <p className="text-sm text-gray-500">{declaracion.documento}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${badge.clase}`}>
              {badge.texto}
            </span>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Información del Viaje</h4>
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-4">
              <Fila label="Fecha">{declaracion.fecha}</Fila>
              <Fila label="Hora">{declaracion.hora}</Fila>
              <Fila label="Nacionalidad">{declaracion.nacionalidad}</Fila>
              <Fila label="Tótem N°">{declaracion.totem}</Fila>
              <Fila label="Origen">{declaracion.origen}</Fila>
              <Fila label="Destino">{declaracion.destino}</Fila>
            </dl>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Bienes Declarados</h4>
            <div className="space-y-2">
              {declaracion.bienes.map((b, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-3">
                    {b.restringido && (
                      <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    )}
                    <div>
                      <p className={`font-medium ${b.restringido ? 'text-red-700' : 'text-gray-900'}`}>
                        {b.nombre}
                        {b.restringido && <span className="ml-2 text-xs text-red-500 font-normal">[RESTRINGIDO]</span>}
                      </p>
                      <p className="text-sm text-gray-500">{b.cantidad}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{b.valor}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Cuestionario de Aduanas</h4>
            <div className="space-y-3">
              {declaracion.cuestionario.map((p, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="text-sm font-medium text-gray-700">{p.pregunta}</p>
                  <p className="text-base text-gray-900 mt-1">{p.respuesta}</p>
                </div>
              ))}
            </div>
          </div>

          {declaracion.restringido && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <p className="font-medium text-red-800">Artículos Restringidos Detectados</p>
                <p className="text-sm text-red-700">El pasajero ha declarado artículos sujetos a control. Se recomienda revisión física.</p>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => { alert('Declaración marcada para inspección'); onClose(); }}
            className="px-6 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium transition-colors"
          >
            Marcar para Inspección
          </button>
          <button
            onClick={() => { alert('Declaración aprobada'); onClose(); }}
            className="px-6 py-2.5 bg-teal-700 text-white rounded-lg hover:bg-teal-800 font-medium transition-colors"
          >
            Aprobar / Liberar
          </button>
        </div>
      </div>
    </div>
  );
};
