import type { ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  children: ReactNode
}

export const Select: React.FC<SelectProps> = ({ label, children, id, className = '', ...props }) => {
  const selectId = id ?? props.name
  return (
    <label htmlFor={selectId} className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</span>
      <select
        id={selectId}
        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-aduana-light focus:ring-3 focus:ring-blue-100"
        {...props}
      >
        {children}
      </select>
    </label>
  )
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  hint?: string
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  hint,
  id,
  className = '',
  ...props
}) => {
  const textareaId = id ?? props.name
  return (
    <label htmlFor={textareaId} className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</span>
      <textarea
        id={textareaId}
        className="min-h-24 w-full resize-y rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-aduana-light focus:ring-3 focus:ring-blue-100"
        {...props}
      />
      {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
    </label>
  )
}
