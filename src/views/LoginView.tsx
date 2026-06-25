import { useState } from 'react'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import type { User } from '../types'

type LoginViewProps = {
  onLogin: (rut: string, password: string) => User | null
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [rut, setRut] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    window.setTimeout(() => {
      const user = onLogin(rut.trim(), password)
      if (!user) setError('Credenciales no reconocidas. Revise el RUT y la contraseña.')
      setLoading(false)
    }, 350)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 p-4 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:p-0">
      <section className="hidden bg-aduana p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <p className="text-sm font-black tracking-[0.2em] text-blue-200">SERVICIO NACIONAL DE ADUANAS</p>
          <h1 className="mt-8 max-w-2xl text-5xl font-black leading-tight">
            Control fronterizo coordinado, rápido y trazable.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100">
            Prototipo funcional para integrar operaciones de Aduanas, PDI, SAG y
            autoatención en pasos terrestres entre Chile y Argentina.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            ['24/7', 'Disponibilidad'],
            ['180/90', 'Reglas vehiculares'],
            ['100%', 'Trazabilidad'],
          ].map(([value, label]) => (
            <div key={label} className="rounded-xl border border-white/15 bg-white/10 p-4">
              <p className="text-2xl font-black">{value}</p>
              <p className="text-xs text-blue-200">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex min-h-[calc(100vh-2rem)] items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-xl sm:p-9">
          <div className="mb-8">
            <div className="mb-5 grid size-14 place-items-center rounded-xl bg-aduana text-xl font-black text-white">
              SG
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-aduana-light">Acceso seguro</p>
            <h2 className="mt-1 text-3xl font-black text-slate-900">Ingresar a SIGA</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Utilice una cuenta habilitada para operar el prototipo.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              label="RUT / Usuario"
              name="rut"
              placeholder="Ej: 12.345.678-5"
              autoComplete="username"
              value={rut}
              onChange={(event) => setRut(event.target.value)}
              required
            />
            <Input
              label="Contraseña"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            {error && (
              <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Validando…' : 'Ingresar al sistema'}
            </Button>
          </form>

          <div className="mt-7 rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-600">
            <p className="font-bold text-slate-800">Credenciales de demostración</p>
            <p>Funcionario: 12.345.678-5 / aduana123</p>
            <p>Administrador: 11.111.111-1 / admin123</p>
          </div>
        </div>
      </section>
    </main>
  )
}
