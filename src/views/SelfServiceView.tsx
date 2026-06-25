import { useState } from 'react'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { PageHeader } from '../components/PageHeader'
import { StatusBadge } from '../components/StatusBadge'
import type { PassengerRecord } from '../types'
import { createId, formatDateTime } from '../utils'

export const SelfServiceView: React.FC<{
  passengers: PassengerRecord[]
  onCreate: (passenger: PassengerRecord) => void
}> = ({ passengers, onCreate }) => {
  const [nombre, setNombre] = useState('')
  const [documento, setDocumento] = useState('')
  const [nacionalidad, setNacionalidad] = useState('Argentina')
  const [minor, setMinor] = useState(false)
  const [authorization, setAuthorization] = useState(false)
  const [ticket, setTicket] = useState<PassengerRecord | null>(null)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const valid = !minor || authorization
    const passenger: PassengerRecord = {
      id: createId('PAS'),
      nombre,
      documento,
      nacionalidad,
      esMenor: minor,
      autorizacionMenor: authorization,
      codigoAtencion: `A-${Math.floor(100 + Math.random() * 899)}`,
      estado: valid ? 'aprobado' : 'observado',
      creadoEn: new Date().toISOString(),
    }
    onCreate(passenger)
    setTicket(passenger)
  }

  return (
    <>
      <PageHeader
        eyebrow="RF01 · Autoatención"
        title="Tótem de pasajeros"
        description="Flujo simplificado para registrar antecedentes antes de la ventanilla y validar autorizaciones de viaje para menores."
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_390px]">
        <form onSubmit={handleSubmit} className="rounded-2xl border-4 border-slate-800 bg-white p-6 shadow-lg sm:p-8">
          <div className="mb-7 flex items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div><p className="text-xs font-bold uppercase tracking-wider text-aduana-light">Modo tótem</p><h3 className="text-2xl font-black text-slate-900">Registro previo al control</h3></div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">Disponible</span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Input className="sm:col-span-2" label="Nombre completo" value={nombre} onChange={(event) => setNombre(event.target.value)} required />
            <Input label="Documento / Pasaporte" value={documento} onChange={(event) => setDocumento(event.target.value)} required />
            <Input label="Nacionalidad" value={nacionalidad} onChange={(event) => setNacionalidad(event.target.value)} required />
          </div>

          <label className="mt-6 flex items-center gap-3 rounded-xl bg-slate-50 p-4 text-sm font-semibold text-slate-700">
            <input className="size-5 accent-aduana" type="checkbox" checked={minor} onChange={(event) => setMinor(event.target.checked)} />
            El pasajero es menor de edad
          </label>
          {minor && (
            <label className={`mt-3 flex items-center gap-3 rounded-xl border p-4 text-sm font-semibold ${authorization ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : 'border-amber-300 bg-amber-50 text-amber-800'}`}>
              <input className="size-5 accent-aduana" type="checkbox" checked={authorization} onChange={(event) => setAuthorization(event.target.checked)} />
              Autorización notarial o judicial validada
            </label>
          )}
          <Button type="submit" className="mt-7 min-h-14 w-full text-base">Generar código de atención</Button>
        </form>

        <aside className="space-y-4">
          {ticket ? (
            <div className="rounded-xl bg-aduana p-6 text-center text-white shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">Código de atención</p>
              <p className="my-5 text-6xl font-black">{ticket.codigoAtencion}</p>
              <StatusBadge status={ticket.estado} />
              <p className="mt-4 text-sm text-blue-100">{ticket.estado === 'aprobado' ? 'Diríjase a la fila de control documental.' : 'Diríjase al módulo de asistencia.'}</p>
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <p className="text-lg font-bold text-slate-800">Complete el formulario</p>
              <p className="mt-2 text-sm text-slate-500">El código aparecerá aquí al finalizar el registro.</p>
            </div>
          )}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-bold text-slate-900">Últimas atenciones</h3>
            <div className="mt-3 space-y-3">
              {passengers.slice(0, 4).map((passenger) => (
                <div key={passenger.id} className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                  <div><p className="text-sm font-bold">{passenger.codigoAtencion} · {passenger.nombre}</p><p className="text-xs text-slate-500">{formatDateTime(passenger.creadoEn)}</p></div>
                  <StatusBadge status={passenger.estado} />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
