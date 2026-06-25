import { useState } from 'react'
import { Button } from '../components/Button'
import { Textarea } from '../components/FormControls'
import { Input } from '../components/Input'
import { PageHeader } from '../components/PageHeader'
import { StatusBadge } from '../components/StatusBadge'
import type { SagDeclaration } from '../types'
import { createId, formatDateTime } from '../utils'

export const SagView: React.FC<{
  declarations: SagDeclaration[]
  userName: string
  onCreate: (declaration: SagDeclaration) => void
}> = ({ declarations, userName, onCreate }) => {
  const [pasajero, setPasajero] = useState('')
  const [documento, setDocumento] = useState('')
  const [alimentos, setAlimentos] = useState(false)
  const [animales, setAnimales] = useState(false)
  const [detalle, setDetalle] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const observed = alimentos || animales
    const declaration: SagDeclaration = {
      id: createId('SAG'),
      pasajero,
      documento,
      declaraAlimentos: alimentos,
      declaraAnimales: animales,
      detalle: detalle || 'Sin especies o productos declarados.',
      estado: observed ? 'observado' : 'aprobado',
      funcionario: userName,
      creadoEn: new Date().toISOString(),
    }
    onCreate(declaration)
    setMessage(
      observed
        ? 'Declaración registrada y derivada a inspección SAG.'
        : 'Declaración validada. El pasajero puede continuar.',
    )
  }

  return (
    <>
      <PageHeader
        eyebrow="RF04 · Integración SAG"
        title="Declaración Jurada SAG"
        description="Registro digital de alimentos, productos vegetales y animales. Los casos positivos se derivan automáticamente a inspección."
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Nombre del pasajero" value={pasajero} onChange={(event) => setPasajero(event.target.value)} required />
            <Input label="Documento" value={documento} onChange={(event) => setDocumento(event.target.value)} required />
          </div>

          <fieldset className="mt-6">
            <legend className="text-sm font-bold text-slate-800">¿Qué elementos transporta?</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className={`flex items-start gap-3 rounded-xl border p-4 transition ${alimentos ? 'border-amber-400 bg-amber-50' : 'border-slate-200'}`}>
                <input className="mt-1 size-4 accent-aduana" type="checkbox" checked={alimentos} onChange={(event) => setAlimentos(event.target.checked)} />
                <span><strong className="block text-slate-800">Alimentos o vegetales</strong><span className="text-sm text-slate-500">Frutas, semillas, carnes o productos artesanales.</span></span>
              </label>
              <label className={`flex items-start gap-3 rounded-xl border p-4 transition ${animales ? 'border-amber-400 bg-amber-50' : 'border-slate-200'}`}>
                <input className="mt-1 size-4 accent-aduana" type="checkbox" checked={animales} onChange={(event) => setAnimales(event.target.checked)} />
                <span><strong className="block text-slate-800">Animales o mascotas</strong><span className="text-sm text-slate-500">Mascotas, productos o subproductos animales.</span></span>
              </label>
            </div>
          </fieldset>

          <Textarea
            className="mt-5"
            label="Detalle de la declaración"
            value={detalle}
            onChange={(event) => setDetalle(event.target.value)}
            placeholder="Indique tipo, cantidad y presentación de los productos…"
            required={alimentos || animales}
          />

          {(alimentos || animales) && (
            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              El caso será marcado como observado y deberá ser revisado físicamente por SAG.
            </div>
          )}

          {message && <div className="mt-5 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm font-semibold text-aduana">{message}</div>}
          <div className="mt-6 flex justify-end"><Button type="submit">Firmar y validar declaración</Button></div>
        </form>

        <aside className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <h3 className="font-bold text-slate-900">Declaraciones recientes</h3>
            <p className="text-sm text-slate-500">{declarations.length} registros almacenados localmente.</p>
          </div>
          <div className="divide-y divide-slate-100">
            {declarations.slice(0, 5).map((declaration) => (
              <div key={declaration.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div><p className="text-sm font-bold text-slate-800">{declaration.pasajero}</p><p className="text-xs text-slate-500">{declaration.documento}</p></div>
                  <StatusBadge status={declaration.estado} />
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-500">{declaration.detalle}</p>
                <p className="mt-1 text-[11px] text-slate-400">{formatDateTime(declaration.creadoEn)}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </>
  )
}
