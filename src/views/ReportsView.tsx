import { Button } from '../components/Button'
import { PageHeader } from '../components/PageHeader'
import type { AppData } from '../types'
import { downloadCsv, formatDateTime } from '../utils'

export const ReportsView: React.FC<{ data: AppData }> = ({ data }) => {
  const total = data.vehicles.length + data.declarations.length + data.passengers.length
  const approved =
    data.vehicles.filter((item) => item.estado === 'aprobado').length +
    data.declarations.filter((item) => item.estado === 'aprobado').length +
    data.passengers.filter((item) => item.estado === 'aprobado').length
  const observed = total - approved
  const approvalRate = total ? Math.round((approved / total) * 100) : 0

  const exportOperations = () => {
    downloadCsv('siga-operaciones.csv', [
      ...data.vehicles.map((item) => ({ tipo: 'Vehículo', folio: item.id, persona: item.propietario, documento: item.documento, estado: item.estado, fecha: formatDateTime(item.creadoEn) })),
      ...data.declarations.map((item) => ({ tipo: 'Declaración SAG', folio: item.id, persona: item.pasajero, documento: item.documento, estado: item.estado, fecha: formatDateTime(item.creadoEn) })),
      ...data.passengers.map((item) => ({ tipo: 'Pasajero', folio: item.id, persona: item.nombre, documento: item.documento, estado: item.estado, fecha: formatDateTime(item.creadoEn) })),
    ])
  }

  return (
    <>
      <PageHeader
        eyebrow="RF06 · RF07"
        title="Analítica y reportes"
        description="Indicadores operativos generados a partir de los registros locales del prototipo y exportación de datos para análisis."
        actions={
          <>
            <Button variant="secondary" onClick={() => window.print()}>Imprimir / guardar PDF</Button>
            <Button onClick={exportOperations}>Exportar operaciones CSV</Button>
          </>
        }
      />
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ['Operaciones totales', total, 'text-slate-900'],
          ['Aprobadas', approved, 'text-emerald-700'],
          ['Observadas', observed, 'text-amber-700'],
          ['Tasa de aprobación', `${approvalRate}%`, 'text-aduana'],
        ].map(([label, value, color]) => (
          <article key={label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">{label}</p>
            <p className={`mt-2 text-4xl font-black ${color}`}>{value}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-bold text-slate-900">Distribución por módulo</h3>
          <div className="mt-6 space-y-5">
            {[
              ['Control vehicular', data.vehicles.length, 'bg-blue-700'],
              ['Declaraciones SAG', data.declarations.length, 'bg-emerald-600'],
              ['Autoatención', data.passengers.length, 'bg-cyan-600'],
            ].map(([label, value, color]) => {
              const percentage = total ? Math.max(6, (Number(value) / total) * 100) : 0
              return (
                <div key={label}>
                  <div className="mb-1.5 flex justify-between text-sm"><span className="font-semibold text-slate-700">{label}</span><span className="text-slate-500">{value}</span></div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${color}`} style={{ width: `${percentage}%` }} /></div>
                </div>
              )
            })}
          </div>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-bold text-slate-900">Características de calidad observables</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              ['Funcionalidad', 'Flujos críticos operativos'],
              ['Usabilidad', 'Diseño responsive y ayuda'],
              ['Fiabilidad', 'Persistencia en localStorage'],
              ['Seguridad', 'Roles, sesión y auditoría'],
              ['Mantenibilidad', 'Componentes TypeScript'],
              ['Portabilidad', 'SPA compatible con navegador'],
            ].map(([title, detail]) => (
              <div key={title} className="rounded-lg bg-slate-50 p-3">
                <p className="text-sm font-bold text-slate-800">{title}</p>
                <p className="mt-1 text-xs text-slate-500">{detail}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </>
  )
}
