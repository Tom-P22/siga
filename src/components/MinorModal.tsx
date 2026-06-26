import type { ReactNode } from 'react';

interface Menor {
  id: number;
  nombre: string;
  rut: string;
  fechaNacimiento: string;
  relacion: string;
  autorizacion: string;
  fotoUrl: string | null;
}

interface MinorModalProps {
  menor: Menor;
  onClose: () => void;
}

function Fila({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-sm text-gray-500">{label}</dt>
      <dd className="text-base font-medium text-gray-900">{children}</dd>
    </div>
  );
}

export const MinorModal = ({ menor, onClose }: MinorModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-purple-700 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h2 className="text-xl font-bold">Verificación de Menor</h2>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            {menor.fotoUrl ? (
              <img src={menor.fotoUrl} alt="" className="w-20 h-20 rounded-full object-cover border-4 border-purple-200" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-purple-100 border-4 border-purple-200 flex items-center justify-center">
                <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
            <div>
              <p className="text-lg font-bold text-gray-900">{menor.nombre}</p>
              <p className="text-sm text-gray-500">{menor.rut}</p>
            </div>
          </div>

          <dl className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
            <Fila label="Fecha de Nacimiento">{menor.fechaNacimiento}</Fila>
            <Fila label="Relación">{menor.relacion}</Fila>
            <div className="md:col-span-2">
              <Fila label="Documento de Autorización">{menor.autorizacion}</Fila>
            </div>
          </dl>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-green-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-medium text-green-800">Documentación en Orden</p>
              <p className="text-sm text-green-700">
                La autorización y filiación del menor coinciden con los registros del sistema.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 font-medium transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
