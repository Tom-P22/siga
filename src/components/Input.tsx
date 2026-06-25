import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  hint?: string
  error?: string
}

export const Input: React.FC<InputProps> = ({
  label,
  hint,
  error,
  id,
  className = '',
  ...props
}) => {
  const inputId = id ?? props.name

  return (
    <label htmlFor={inputId} className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</span>
      <input
        id={inputId}
        className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-aduana-light focus:ring-3 focus:ring-blue-100 ${
          error ? 'border-red-400' : 'border-slate-300'
        }`}
        {...props}
      />
      {error ? (
        <span className="mt-1 block text-xs font-medium text-red-600">{error}</span>
      ) : hint ? (
        <span className="mt-1 block text-xs text-slate-500">{hint}</span>
      ) : null}
    </label>
  )
}
