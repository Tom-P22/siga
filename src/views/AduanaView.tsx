import { useMemo, useState } from 'react'
import { Button } from '../components/Button'
import { Select, Textarea } from '../components/FormControls'
import { Input } from '../components/Input'
import { PageHeader } from '../components/PageHeader'
import { StatusBadge } from '../components/StatusBadge'
import type { VehicleRecord, VehicleType } from '../types'
import { calculateVehicleLimit, createId, formatDate, formatDateTime } from '../utils'

const today = new Date().toISOString().slice(0, 10)

export const AduanaView: React.FC<{
  vehicles: VehicleRecord[]
  userName: string
  onCreate: (record: VehicleRecord) => void
}> = ({ vehicles, userName, onCreate }) => {
  const [qrCode, setQrCode] = useState('')
  const [patente, setPatente] = useState('')
  const [propietario, setPropietario] = useState('')
  const [documento, setDocumento] = useState('')
  const [nacionalidad, setNacionalidad] = useState('Argentina')
  const [tipo, setTipo] = useState<VehicleType>('particular')
  const [fechaIngreso, setFechaIngreso] = useState(today)
  const [observacion, setObservacion] = useState('')
  const [createdRecord, setCreatedRecord] = useState<VehicleRecord | null>(null)

  const limit = useMemo(() => calculateVehicleLimit(fechaIngreso, tipo), [fechaIngreso, tipo])

  const simulateQr = () => {
    setQrCode(`QR-ARG-${Math.floor(100000 + Math.random() * 899999)}`)
    setPropietario('Valentina Bustos')
    setDocumento('AR-39874521')
  }

  const simulateLpr = () => {
    const letters = 'ABCDEFGHJKLMNPRSTUVWXYZ'
    const randomLetters = Array.from({ length: 4 }, () => letters[Math.floor(Math.random() * letters.length)]).join('')
    const numbers = Math.floor(10 + Math.random() * 89)
    setPatente(`${randomLetters}${numbers}`)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const record: VehicleRecord = {
      id: createId('VEH'),
      patente: patente.toUpperCase(),
      propietario,
      documento,
      nacionalidad,
      tipo,
      fechaIngreso,
      fechaLimite: limit.limit,
      diasAutorizados: limit.days,
      estado: qrCode ? 'aprobado' : 'observado',
      observacion: observacion || (qrCode ? 'Validación documental simulada exitosa.' : 'Pendiente asociar código QR del trámite.'),
      funcionario: userName,
      creadoEn: new Date().toISOString(),
    }
    onCreate(record)
    setCreatedRecord(record)
  }

  return (
    <>
      <PageHeader
        eyebrow="RF02 · RF03 · RF10"
        title="Control de Aduana"
        description="Simulación de captura QR, reconocimiento de patente LPR y emisión del permiso de admisión temporal con límites normativos."
        actions={
          <>
            <Button variant="secondary" onClick={simulateQr}>Simular QR</Button>
            <Button variant="secondary" onClick={simulateLpr}>Simular cámara LPR</Button>
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 grid gap-4 rounded-xl bg-blue-50 p-4 sm:grid-cols-2">
            <Input
              label="Código QR del trámite"
              value={qrCode}
              onChange={(event) => setQrCode(event.target.value)}
              placeholder="Use la simulación o ingrese un código"
            />
            <Input
              label="Patente detectada por LPR"
              value={patente}
              onChange={(event) => setPatente(event.target.value.toUpperCase())}
              placeholder="ABCD12"
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Propietario/a" value={propietario} onChange={(event) => setPropietario(event.target.value)} required />
            <Input label="Documento" value={documento} onChange={(event) => setDocumento(event.target.value)} required />
            <Input label="Nacionalidad" value={nacionalidad} onChange={(event) => setNacionalidad(event.target.value)} required />
            <Select label="Tipo de vehículo" value={tipo} onChange={(event) => setTipo(event.target.value as VehicleType)}>
              <option value="particular">Particular · máximo 180 días</option>
              <option value="diplomatico">Diplomático · máximo 90 días</option>
            </Select>
            <Input label="Fecha de ingreso" type="date" value={fechaIngreso} onChange={(event) => setFechaIngreso(event.target.value)} required />
            <div className="rounded-lg border border-aduana-light/30 bg-blue-50 px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-wider text-aduana">Vencimiento calculado</p>
              <p className="mt-1 text-lg font-black text-slate-900">{formatDate(limit.limit)}</p>
              <p className="text-xs text-slate-500">{limit.days} días autorizados</p>
            </div>
            <Textarea
              className="md:col-span-2"
              label="Observaciones"
              value={observacion}
              onChange={(event) => setObservacion(event.target.value)}
              placeholder="Antecedentes adicionales del control…"
            />
          </div>
          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <Button type="submit">Validar y emitir permiso</Button>
          </div>
        </form>

        <aside className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-bold text-slate-900">Reglas aplicadas</h3>
            <ul className="mt-3 space-y-3 text-sm leading-5 text-slate-600">
              <li>• Vehículo particular: permanencia máxima de 180 días.</li>
              <li>• Vehículo diplomático: permanencia máxima de 90 días.</li>
              <li>• La ausencia de QR genera una observación automática.</li>
              <li>• El permiso debe imprimirse obligatoriamente en dos copias.</li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-bold text-slate-900">Últimos permisos</h3>
            <div className="mt-3 space-y-3">
              {vehicles.slice(0, 3).map((record) => (
                <div key={record.id} className="rounded-lg bg-slate-50 p-3">
                  <div className="flex justify-between gap-3">
                    <p className="font-bold text-slate-800">{record.patente}</p>
                    <StatusBadge status={record.estado} />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{record.propietario} · vence {formatDate(record.fechaLimite)}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {createdRecord && (
        <section className="print-area mt-6 rounded-xl border-2 border-dashed border-aduana bg-white p-6 shadow-sm">
          <div className="no-print mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900">Permiso generado correctamente</h3>
              <p className="text-sm text-slate-500">La vista de impresión contiene dos copias físicas obligatorias.</p>
            </div>
            <Button onClick={() => window.print()}>Imprimir dos copias</Button>
          </div>
          <div className="grid gap-8 print:grid-cols-1">
            {['COPIA ADUANAS', 'COPIA CONDUCTOR/A'].map((copy) => (
              <article key={copy} className="break-inside-avoid border-2 border-slate-800 p-5">
                <div className="flex items-start justify-between border-b border-slate-300 pb-3">
                  <div><p className="text-xl font-black text-aduana">SIGA</p><p className="text-xs">Admisión temporal de vehículo</p></div>
                  <p className="text-sm font-black">{copy}</p>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  <div><dt className="text-slate-500">Folio</dt><dd className="font-bold">{createdRecord.id}</dd></div>
                  <div><dt className="text-slate-500">Patente</dt><dd className="font-bold">{createdRecord.patente}</dd></div>
                  <div><dt className="text-slate-500">Propietario/a</dt><dd>{createdRecord.propietario}</dd></div>
                  <div><dt className="text-slate-500">Documento</dt><dd>{createdRecord.documento}</dd></div>
                  <div><dt className="text-slate-500">Ingreso</dt><dd>{formatDate(createdRecord.fechaIngreso)}</dd></div>
                  <div><dt className="text-slate-500">Vencimiento</dt><dd className="font-bold">{formatDate(createdRecord.fechaLimite)}</dd></div>
                  <div><dt className="text-slate-500">Tipo</dt><dd className="capitalize">{createdRecord.tipo}</dd></div>
                  <div><dt className="text-slate-500">Estado</dt><dd className="uppercase font-bold">{createdRecord.estado}</dd></div>
                </dl>
                <p className="mt-4 border-t border-slate-300 pt-3 text-xs">Emitido por {createdRecord.funcionario} · {formatDateTime(createdRecord.creadoEn)}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
