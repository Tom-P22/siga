import type { ModuleId, User } from '../types'
import { Button } from './Button'

type NavItem = {
  id: ModuleId
  label: string
  short: string
  adminOnly?: boolean
}

const navigation: NavItem[] = [
  { id: 'inicio', label: 'Panel general', short: 'IN' },
  { id: 'aduana', label: 'Control de Aduana', short: 'AD' },
  { id: 'sag', label: 'Control SAG', short: 'SG' },
  { id: 'autoatencion', label: 'Autoatención', short: 'AU' },
  { id: 'reportes', label: 'Reportes y CSV', short: 'RP' },
  { id: 'auditoria', label: 'Auditoría', short: 'LG', adminOnly: true },
  { id: 'evolucion', label: 'Evolución MVP', short: 'EV' },
  { id: 'ayuda', label: 'Ayuda', short: '?' },
]

export const AppShell: React.FC<{
  user: User
  activeModule: ModuleId
  onNavigate: (module: ModuleId) => void
  onLogout: () => void
  children: React.ReactNode
}> = ({ user, activeModule, onNavigate, onLogout, children }) => {
  const visibleNavigation = navigation.filter(
    (item) => !item.adminOnly || user.role === 'administrador',
  )

  return (
    <div className="min-h-screen bg-slate-100 lg:grid lg:grid-cols-[270px_1fr]">
      <aside className="no-print bg-aduana text-white lg:sticky lg:top-0 lg:h-screen">
        <div className="flex items-center justify-between border-b border-white/15 px-5 py-5">
          <div>
            <div className="text-2xl font-black tracking-tight">SIGA</div>
            <div className="text-xs text-blue-200">Control Fronterizo Integrado</div>
          </div>
          <span className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-bold">v1.0</span>
        </div>

        <nav className="flex gap-2 overflow-x-auto p-3 lg:block lg:space-y-1 lg:overflow-visible">
          {visibleNavigation.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition lg:w-full ${
                activeModule === item.id
                  ? 'bg-white text-aduana shadow-sm'
                  : 'text-blue-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span
                className={`grid size-8 place-items-center rounded-md text-[11px] font-black ${
                  activeModule === item.id ? 'bg-blue-100 text-aduana' : 'bg-white/10'
                }`}
              >
                {item.short}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="hidden border-t border-white/15 p-4 lg:absolute lg:inset-x-0 lg:bottom-0 lg:block">
          <p className="text-sm font-bold">{user.nombre}</p>
          <p className="mb-3 text-xs text-blue-200">
            {user.organismo} · {user.role}
          </p>
          <Button variant="ghost" className="w-full !text-blue-100 hover:!bg-white/10 hover:!text-white" onClick={onLogout}>
            Cerrar sesión
          </Button>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="no-print flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Paso fronterizo Chile–Argentina
            </p>
            <p className="text-sm font-bold text-slate-700">Operación simulada · 24/7</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold text-slate-800">{user.nombre}</p>
              <p className="text-xs capitalize text-slate-500">{user.role}</p>
            </div>
            <div className="grid size-10 place-items-center rounded-full bg-blue-100 text-sm font-black text-aduana">
              {user.nombre
                .split(' ')
                .map((part) => part[0])
                .slice(0, 2)
                .join('')}
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
