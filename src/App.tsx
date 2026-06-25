import { useEffect, useState } from 'react'
import { AppShell } from './components/AppShell'
import { initialData, mockUsers } from './data'
import type {
  AppData,
  AuditInput,
  ModuleId,
  PassengerRecord,
  SagDeclaration,
  User,
  VehicleRecord,
} from './types'
import { createId, loadData } from './utils'
import { AduanaView } from './views/AduanaView'
import { AuditView } from './views/AuditView'
import { DashboardView } from './views/DashboardView'
import { EvolutionView } from './views/EvolutionView'
import { HelpView } from './views/HelpView'
import { LoginView } from './views/LoginView'
import { ReportsView } from './views/ReportsView'
import { SagView } from './views/SagView'
import { SelfServiceView } from './views/SelfServiceView'

const getStoredUser = (): User | null => {
  try {
    const stored = localStorage.getItem('siga-session')
    return stored ? (JSON.parse(stored) as User) : null
  } catch {
    return null
  }
}

function App() {
  const [user, setUser] = useState<User | null>(getStoredUser)
  const [activeModule, setActiveModule] = useState<ModuleId>('inicio')
  const [data, setData] = useState<AppData>(() => loadData() ?? initialData)

  useEffect(() => {
    localStorage.setItem('siga-data', JSON.stringify(data))
  }, [data])

  const appendAudit = (input: AuditInput, actingUser: User | null = user) => {
    const entry = {
      ...input,
      id: createId('AUD'),
      fecha: new Date().toISOString(),
      usuario: actingUser?.nombre ?? 'Usuario no autenticado',
      organismo: actingUser?.organismo ?? 'Externo',
    }
    setData((current) => ({ ...current, audit: [entry, ...current.audit] }))
  }

  useEffect(() => {
    if (!user) return undefined
    let timer = window.setTimeout(() => {
      setData((current) => ({
        ...current,
        audit: [
          {
            id: createId('AUD'),
            fecha: new Date().toISOString(),
            usuario: user.nombre,
            organismo: user.organismo,
            accion: 'Sesión cerrada por 10 minutos de inactividad',
            modulo: 'Seguridad',
            resultado: 'Exitoso',
          },
          ...current.audit,
        ],
      }))
      localStorage.removeItem('siga-session')
      setUser(null)
      setActiveModule('inicio')
    }, 10 * 60 * 1000)

    const resetTimer = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        localStorage.removeItem('siga-session')
        setUser(null)
        setActiveModule('inicio')
      }, 10 * 60 * 1000)
    }

    const events = ['pointerdown', 'keydown', 'scroll']
    events.forEach((event) => window.addEventListener(event, resetTimer, { passive: true }))
    return () => {
      window.clearTimeout(timer)
      events.forEach((event) => window.removeEventListener(event, resetTimer))
    }
  }, [user])

  const handleLogin = (rut: string, password: string) => {
    const match = mockUsers.find((candidate) => candidate.rut === rut && candidate.password === password)
    if (!match) {
      appendAudit({
        accion: `Intento de acceso rechazado para ${rut || 'usuario vacío'}`,
        modulo: 'Seguridad',
        resultado: 'Fallido',
      }, null)
      return null
    }
    const { password: _password, ...authenticatedUser } = match
    void _password
    setUser(authenticatedUser)
    localStorage.setItem('siga-session', JSON.stringify(authenticatedUser))
    appendAudit({ accion: 'Inicio de sesión', modulo: 'Seguridad', resultado: 'Exitoso' }, authenticatedUser)
    return authenticatedUser
  }

  const handleLogout = () => {
    appendAudit({ accion: 'Cierre de sesión', modulo: 'Seguridad', resultado: 'Exitoso' })
    localStorage.removeItem('siga-session')
    setUser(null)
    setActiveModule('inicio')
  }

  const createVehicle = (record: VehicleRecord) => {
    setData((current) => ({ ...current, vehicles: [record, ...current.vehicles] }))
    appendAudit({
      accion: `Admisión temporal ${record.id} ${record.estado}`,
      modulo: 'Control de Aduana',
      resultado: record.estado === 'aprobado' ? 'Exitoso' : 'Observado',
    })
  }

  const createDeclaration = (declaration: SagDeclaration) => {
    setData((current) => ({ ...current, declarations: [declaration, ...current.declarations] }))
    appendAudit({
      accion: `Declaración ${declaration.id} ${declaration.estado}`,
      modulo: 'Control SAG',
      resultado: declaration.estado === 'aprobado' ? 'Exitoso' : 'Observado',
    })
  }

  const createPassenger = (passenger: PassengerRecord) => {
    setData((current) => ({ ...current, passengers: [passenger, ...current.passengers] }))
    appendAudit({
      accion: `Atención ${passenger.codigoAtencion} ${passenger.estado}`,
      modulo: 'Autoatención',
      resultado: passenger.estado === 'aprobado' ? 'Exitoso' : 'Observado',
    })
  }

  if (!user) return <LoginView onLogin={handleLogin} />

  const views: Record<ModuleId, React.ReactNode> = {
    inicio: <DashboardView data={data} user={user} onNavigate={setActiveModule} />,
    aduana: <AduanaView vehicles={data.vehicles} userName={user.nombre} onCreate={createVehicle} />,
    sag: <SagView declarations={data.declarations} userName={user.nombre} onCreate={createDeclaration} />,
    autoatencion: <SelfServiceView passengers={data.passengers} onCreate={createPassenger} />,
    reportes: <ReportsView data={data} />,
    auditoria:
      user.role === 'administrador' ? (
        <AuditView audit={data.audit} />
      ) : (
        <DashboardView data={data} user={user} onNavigate={setActiveModule} />
      ),
    evolucion: <EvolutionView />,
    ayuda: <HelpView />,
  }

  return (
    <AppShell user={user} activeModule={activeModule} onNavigate={setActiveModule} onLogout={handleLogout}>
      {views[activeModule]}
    </AppShell>
  )
}

export default App
