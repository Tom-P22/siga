import { PageHeader } from '../components/PageHeader'
import type { AuditEntry } from '../types'
import { formatDateTime } from '../utils'

export const AuditView: React.FC<{ audit: AuditEntry[] }> = ({ audit }) => (
  <>
    <PageHeader
      eyebrow="RNF09 · Trazabilidad"
      title="Registro de auditoría"
      description="Historial inmutable dentro del prototipo: usuario, fecha, módulo, acción y resultado de cada operación relevante."
    />
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-3">Fecha</th>
              <th className="px-5 py-3">Usuario</th>
              <th className="px-5 py-3">Organismo</th>
              <th className="px-5 py-3">Módulo</th>
              <th className="px-5 py-3">Acción</th>
              <th className="px-5 py-3">Resultado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {audit.map((entry) => (
              <tr key={entry.id} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-5 py-4 text-slate-500">{formatDateTime(entry.fecha)}</td>
                <td className="px-5 py-4 font-semibold text-slate-800">{entry.usuario}</td>
                <td className="px-5 py-4 text-slate-600">{entry.organismo}</td>
                <td className="px-5 py-4 text-slate-600">{entry.modulo}</td>
                <td className="px-5 py-4 text-slate-700">{entry.accion}</td>
                <td className="px-5 py-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                    entry.resultado === 'Exitoso'
                      ? 'bg-emerald-100 text-emerald-800'
                      : entry.resultado === 'Fallido'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                  }`}>{entry.resultado}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
)
