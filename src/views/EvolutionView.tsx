import { useMemo, useState } from 'react'

import { PageHeader } from '../components/PageHeader'
import { iterationHistory } from '../data'

type PrototypeStage = {
  prototypeTitle: string
  prototypeDescription: string
  visibleModules: string[]
  improvements: string[]
  limitations: string[]
  snapshot: {
    header: string
    primary: string
    secondary: string
    status: string
    blocks: string[]
  }
}

const prototypeStages: Record<string, PrototypeStage> = {
  'v0.1': {
    prototypeTitle: 'Pantalla mínima de ingreso',
    prototypeDescription:
      'El primer MVP permitía demostrar el acceso con RUT/clave y un panel inicial muy simple con datos simulados.',
    visibleModules: ['Login RUT/clave', 'Panel inicial', 'Usuarios mock'],
    improvements: ['Flujo navegable base', 'Sesión simulada', 'Primer registro de acceso'],
    limitations: ['Sin reglas aduaneras', 'Sin SAG', 'Sin reportes exportables'],
    snapshot: {
      header: 'MVP acceso',
      primary: 'Login funcionario',
      secondary: 'Panel inicial',
      status: 'Validación básica',
      blocks: ['RUT', 'Clave', 'Ingresar'],
    },
  },
  'v0.2': {
    prototypeTitle: 'Navegación institucional',
    prototypeDescription:
      'La segunda versión incorporó identidad visual de Aduanas, navegación lateral, roles y diseño responsive.',
    visibleModules: ['Menú por módulos', 'Dashboard responsive', 'Roles visibles'],
    improvements: ['Diseño institucional', 'Jerarquía visual clara', 'Preparación para tótems'],
    limitations: ['Sin captura QR/LPR', 'Sin comprobantes', 'Sin control SAG completo'],
    snapshot: {
      header: 'Base SIGA',
      primary: 'Dashboard',
      secondary: 'Menú lateral',
      status: 'Responsive',
      blocks: ['Aduana', 'SAG', 'Reportes'],
    },
  },
  'v0.3': {
    prototypeTitle: 'Control de Aduana operativo',
    prototypeDescription:
      'Esta etapa agregó lectura QR simulada, patente LPR, formulario vehicular y cálculo automático de permanencia 180/90 días.',
    visibleModules: ['QR simulado', 'LPR patente', 'Regla 180/90 días', 'Doble copia'],
    improvements: ['Reglas de negocio visibles', 'Comprobante imprimible', 'Validación de admisión temporal'],
    limitations: ['SAG separado', 'Reportes básicos', 'Auditoría todavía parcial'],
    snapshot: {
      header: 'Control Aduana',
      primary: 'Patente ABCD12',
      secondary: 'Permiso temporal',
      status: '180/90 días',
      blocks: ['QR', 'LPR', 'Imprimir 2 copias'],
    },
  },
  'v0.4': {
    prototypeTitle: 'Flujos SAG y tótem',
    prototypeDescription:
      'Se incorporó declaración jurada SAG, derivación a inspección y autoatención para generar ticket de pasajero.',
    visibleModules: ['Declaración SAG', 'Derivación observada', 'Ticket de atención', 'Menores'],
    improvements: ['Validación sanitaria', 'Casos especiales', 'Reducción de espera presencial'],
    limitations: ['Sin exportación CSV', 'Indicadores limitados', 'Guía de demo pendiente'],
    snapshot: {
      header: 'SAG + tótem',
      primary: 'Declaración jurada',
      secondary: 'Ticket A-104',
      status: 'Derivación automática',
      blocks: ['Alimentos', 'Animales', 'Menor de edad'],
    },
  },
  'v0.5': {
    prototypeTitle: 'Seguimiento y evidencia',
    prototypeDescription:
      'La quinta iteración agregó persistencia local, auditoría interna, dashboard con indicadores y exportación CSV.',
    visibleModules: ['Auditoría interna', 'Reportes', 'Exportación CSV', 'Persistencia local'],
    improvements: ['Trazabilidad por usuario', 'Indicadores administrativos', 'Evidencia para control de cambios'],
    limitations: ['Ajustes de accesibilidad pendientes', 'Pruebas finales pendientes', 'Ayuda incompleta'],
    snapshot: {
      header: 'Trazabilidad',
      primary: 'Reportes',
      secondary: 'Auditoría',
      status: 'CSV + localStorage',
      blocks: ['Indicadores', 'Eventos', 'Exportar'],
    },
  },
  'v1.0': {
    prototypeTitle: 'Versión demostrable final',
    prototypeDescription:
      'La versión final integra los módulos principales y deja evidencia visible para la exposición, pruebas y control de cambios.',
    visibleModules: ['Aduana', 'SAG', 'Autoatención', 'Reportes', 'Auditoría', 'Ayuda'],
    improvements: ['Recorrido de demo completo', 'Plan de pruebas asociado', 'Control de cambios documentado'],
    limitations: ['Sin backend real por alcance', 'Lecturas QR/LPR simuladas', 'Datos mock/localStorage'],
    snapshot: {
      header: 'SIGA v1.0',
      primary: 'Prototipo funcional',
      secondary: 'Demo integrada',
      status: 'Listo para evaluación',
      blocks: ['Aduana', 'SAG', 'Reportes', 'Auditoría'],
    },
  },
}

const renderList = (title: string, items: string[], tone: 'blue' | 'green' | 'amber') => {
  const toneClasses = {
    blue: 'border-blue-100 bg-blue-50 text-aduana',
    green: 'border-emerald-100 bg-emerald-50 text-emerald-800',
    amber: 'border-amber-100 bg-amber-50 text-amber-800',
  }

  return (
    <div className={`rounded-xl border p-4 ${toneClasses[tone]}`}>
      <h4 className="text-sm font-black">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm font-semibold">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden="true">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const EvolutionView: React.FC = () => {
  const [selectedVersion, setSelectedVersion] = useState(iterationHistory[0]?.version ?? 'v0.1')

  const selectedIteration = useMemo(
    () => iterationHistory.find((iteration) => iteration.version === selectedVersion) ?? iterationHistory[0],
    [selectedVersion],
  )
  const selectedStage = prototypeStages[selectedIteration.version]

  return (
    <>
      <PageHeader
        eyebrow="Iteración y mejora continua"
        title="Del MVP al prototipo funcional"
        description="Selecciona cada versión para ver una evidencia visual de cómo evolucionó el prototipo, qué módulos incluía y qué mejora se aplicó en la siguiente iteración."
      />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="relative space-y-4 before:absolute before:bottom-8 before:left-[25px] before:top-8 before:w-0.5 before:bg-blue-200 sm:before:left-[33px]">
          {iterationHistory.map((iteration, index) => {
            const isSelected = iteration.version === selectedVersion

            return (
              <button
                key={iteration.version}
                className={`relative grid w-full grid-cols-[52px_1fr] gap-4 text-left transition sm:grid-cols-[68px_1fr] ${
                  isSelected ? 'scale-[1.01]' : 'hover:scale-[1.005]'
                }`}
                type="button"
                onClick={() => setSelectedVersion(iteration.version)}
              >
                <span
                  className={`z-10 grid size-12 place-items-center rounded-full border-4 text-sm font-black sm:size-16 ${
                    isSelected
                      ? 'border-blue-100 bg-aduana-light text-white'
                      : 'border-slate-100 bg-aduana text-white'
                  }`}
                >
                  {index + 1}
                </span>
                <span
                  className={`rounded-xl border p-5 shadow-sm ${
                    isSelected ? 'border-aduana-light bg-blue-50 ring-2 ring-blue-100' : 'border-slate-200 bg-white'
                  }`}
                >
                  <span className="flex flex-wrap items-center gap-3">
                    <span className="rounded-md bg-blue-100 px-2 py-1 text-xs font-black text-aduana">
                      {iteration.version}
                    </span>
                    <span className="text-lg font-bold text-slate-900">{iteration.title}</span>
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-slate-600">{iteration.focus}</span>
                  <span className="mt-3 block rounded-lg bg-white/80 p-3 text-xs font-semibold text-slate-600">
                    Evidencia: {iteration.evidence}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="rounded-md bg-blue-100 px-2 py-1 text-xs font-black text-aduana">
                {selectedIteration.version}
              </span>
              <h3 className="mt-3 text-2xl font-black text-slate-900">{selectedStage.prototypeTitle}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{selectedStage.prototypeDescription}</p>
            </div>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-slate-600">
              Snapshot demostrable
            </span>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-inner">
            <div className="flex items-center gap-2 border-b border-white/10 bg-slate-900 px-4 py-3">
              <span className="size-3 rounded-full bg-red-400" />
              <span className="size-3 rounded-full bg-amber-300" />
              <span className="size-3 rounded-full bg-emerald-400" />
              <span className="ml-3 text-xs font-bold text-slate-300">{selectedStage.snapshot.header}</span>
            </div>
            <div className="grid gap-4 p-5 md:grid-cols-[220px_1fr]">
              <aside className="rounded-xl bg-aduana p-4 text-white">
                <p className="text-xs font-black uppercase tracking-wide text-blue-100">SIGA</p>
                <div className="mt-5 space-y-2">
                  {selectedStage.snapshot.blocks.map((block) => (
                    <div key={block} className="rounded-lg bg-white/10 px-3 py-2 text-sm font-bold">
                      {block}
                    </div>
                  ))}
                </div>
              </aside>
              <div className="rounded-xl bg-slate-100 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                      Vista del prototipo
                    </p>
                    <h4 className="mt-1 text-xl font-black text-slate-900">{selectedStage.snapshot.primary}</h4>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
                    {selectedStage.snapshot.status}
                  </span>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {selectedStage.visibleModules.slice(0, 3).map((module) => (
                    <div key={module} className="rounded-xl bg-white p-4 shadow-sm">
                      <p className="text-xs font-bold text-slate-500">Módulo</p>
                      <p className="mt-2 text-sm font-black text-aduana">{module}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl border border-dashed border-blue-200 bg-white p-4">
                  <p className="text-sm font-bold text-slate-500">{selectedStage.snapshot.secondary}</p>
                  <div className="mt-3 h-3 w-full rounded-full bg-slate-200">
                    <div className="h-3 rounded-full bg-aduana-light" style={{ width: `${35 + Number(selectedIteration.version.slice(-1)) * 10}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {renderList('Visible en esta versión', selectedStage.visibleModules, 'blue')}
            {renderList('Mejoras aplicadas', selectedStage.improvements, 'green')}
            {renderList('Pendiente o limitado', selectedStage.limitations, 'amber')}
          </div>
        </section>
      </div>
    </>
  )
}
