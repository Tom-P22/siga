import { PageHeader } from '../components/PageHeader'
import { iterationHistory } from '../data'

export const EvolutionView: React.FC = () => (
  <>
    <PageHeader
      eyebrow="Iteración y mejora continua"
      title="Del MVP al prototipo funcional"
      description="Registro resumido de seis etapas incrementales. Cada versión incorpora retroalimentación, reduce riesgos y agrega evidencia verificable."
    />
    <div className="relative space-y-4 before:absolute before:bottom-8 before:left-[25px] before:top-8 before:w-0.5 before:bg-blue-200 sm:before:left-[33px]">
      {iterationHistory.map((iteration, index) => (
        <article key={iteration.version} className="relative grid grid-cols-[52px_1fr] gap-4 sm:grid-cols-[68px_1fr]">
          <div className="z-10 grid size-12 place-items-center rounded-full border-4 border-slate-100 bg-aduana text-sm font-black text-white sm:size-16">
            {index + 1}
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-md bg-blue-100 px-2 py-1 text-xs font-black text-aduana">{iteration.version}</span>
              <h3 className="text-lg font-bold text-slate-900">{iteration.title}</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{iteration.focus}</p>
            <p className="mt-3 rounded-lg bg-slate-50 p-3 text-xs font-semibold text-slate-600">
              Evidencia: {iteration.evidence}
            </p>
          </div>
        </article>
      ))}
    </div>
  </>
)
