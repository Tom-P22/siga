import type { ReactNode } from 'react';

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

interface DeclaracionModalProps {
  declaracion: Declaracion;
  onClose: () => void;
}

const estadoConfig: Record<Declaracion['estado'], { clase: string; texto: string; icono: string }> = {
  verificado: { clase: 'bg-green-100 text-green-800 border-green-200', texto: 'Verificado', icono: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  pendiente: { clase: 'bg-yellow-100 text-yellow-800 border-yellow-200', texto: 'Pendiente', icono: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  rechazado: { clase: 'bg-red-100 text-red-800 border-red-200', texto: 'Rechazado', icono: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' },
  observado: { clase: 'bg-orange-100 text-orange-800 border-orange-200', texto: 'Observado', icono: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' },
};

function Fila({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-sm text-gray-500">{label}</dt>
      <dd className="text-base font-medium text-gray-900">{children}</dd>
    </div>
  );
}

export const DeclaracionModal = ({ declaracion, onClose }: DeclaracionModalProps) => {
  const estado = estadoConfig[declaracion.estado];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-emerald-700 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h2 className="text-xl font-bold">Declaración Jurada</h2>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{declaracion.titulo}</h3>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border mt-2 ${estado.clase}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={estado.icono} />
              </svg>
              {estado.texto}
            </span>
          </div>

          <dl className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
            <Fila label="N° Documento">{declaracion.numeroDocumento}</Fila>
            <Fila label="Tipo">{declaracion.tipo}</Fila>
            <Fila label="Fecha de Emisión">{declaracion.fecha}</Fila>
          </dl>

          <div>
            <p className="text-sm text-gray-500 mb-1">Detalle</p>
            <p className="text-base text-gray-900 bg-gray-50 rounded-lg p-4 border border-gray-100">
              {declaracion.descripcion}
            </p>
          </div>

          {declaracion.observaciones && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <p className="font-medium text-orange-800">Observaciones</p>
                <p className="text-sm text-orange-700">{declaracion.observaciones}</p>
              </div>
            </div>
          )}

          {declaracion.estado === 'verificado' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-green-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-medium text-green-800">Documento Verificado</p>
                <p className="text-sm text-green-700">
                  La declaración ha sido validada contra los registros del SAG.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 font-medium transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
