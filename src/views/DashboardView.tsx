import { Button } from '../components/Button'
import { PageHeader } from '../components/PageHeader'
import { StatusBadge } from '../components/StatusBadge'
import type { AppData, ModuleId, User } from '../types'
import { formatDateTime } from '../utils'

export const DashboardView: React.FC<{
  data: AppData
  user: User
  onNavigate: (module: ModuleId) => void
}> = ({ data, user, onNavigate }) => {
  const observed =
    data.vehicles.filter((item) => item.estado === 'observado').length +
    data.declarations.filter((item) => item.estado === 'observado').length +
    data.passengers.filter((item) => item.estado === 'observado').length

  const cards: Array<{
    id: ModuleId
    title: string
    description: string
    value: number
    accent: string
  }> = [
    {
      id: 'aduana',
      title: 'Control de Aduana',
      description: 'Admisión temporal, QR, LPR y permisos.',
      value: data.vehicles.length,
      accent: 'border-t-blue-700',
    },
    {
      id: 'sag',
      title: 'Control SAG',
      description: 'Declaraciones juradas y derivaciones.',
      value: data.declarations.length,
      accent: 'border-t-emerald-600',
    },
    {
      id: 'autoatencion',
      title: 'Autoatención',
      description: 'Registro de pasajeros y menores.',
      value: data.passengers.length,
      accent: 'border-t-cyan-600',
    },
    {
      id: 'reportes',
      title: 'Casos observados',
      description: 'Pendientes de revisión o inspección.',
      value: observed,
      accent: 'border-t-amber-500',
    },
  ]

  const recent = [
    ...data.audit.slice(0, 5).map((entry) => ({
      id: entry.id,
      title: entry.accion,
      detail: `${entry.modulo} · ${formatDateTime(entry.fecha)}`,
      status: entry.resultado === 'Exitoso' ? 'aprobado' : entry.resultado === 'Fallido' ? 'rechazado' : 'observado',
    })),
  ]

  return (
    <>
      <PageHeader
        eyebrow="Panel operativo"
        title={`Bienvenido/a, ${user.nombre.split(' ')[0]}`}
        description="Resumen de la operación simulada y accesos rápidos a los procesos principales del control fronterizo."
      />

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <article key={card.id} className={`rounded-xl border border-slate-200 border-t-4 ${card.accent} bg-white p-5 shadow-sm`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-900">{card.title}</h3>
                <p className="mt-1 text-sm leading-5 text-slate-500">{card.description}</p>
              </div>
              <span className="text-3xl font-black text-slate-900">{card.value}</span>
            </div>
            <Button variant="secondary" className="mt-5 w-full" onClick={() => onNavigate(card.id)}>
              Abrir módulo
            </Button>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <article className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h3 className="font-bold text-slate-900">Actividad reciente</h3>
            <p className="text-sm text-slate-500">Últimas acciones registradas en la auditoría interna.</p>
          </div>
          <div className="divide-y divide-slate-100">
            {recent.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4 px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.detail}</p>
                </div>
                <StatusBadge status={item.status as 'aprobado' | 'observado' | 'rechazado'} />
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-xl bg-aduana p-6 text-white shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">Estado del prototipo</p>
          <h3 className="mt-2 text-2xl font-black">Versión funcional v1.0</h3>
          <p className="mt-3 text-sm leading-6 text-blue-100">
            Seis iteraciones documentadas, persistencia local, control de roles y flujos críticos integrados.
          </p>
          <Button className="mt-6 w-full !bg-white !text-aduana hover:!bg-blue-50" onClick={() => onNavigate('evolucion')}>
            Ver evolución del MVP
          </Button>
        </article>
      </section>
    </>
  )
}
