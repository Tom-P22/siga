import type { ReactNode } from 'react'

export const PageHeader: React.FC<{
  eyebrow: string
  title: string
  description: string
  actions?: ReactNode
}> = ({ eyebrow, title, description, actions }) => (
  <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-aduana-light">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{description}</p>
    </div>
    {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
  </div>
)
