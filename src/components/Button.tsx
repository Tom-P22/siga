import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  children: ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) => {
  const variants = {
    primary: 'bg-aduana text-white hover:bg-aduana-dark focus-visible:ring-aduana-light',
    secondary:
      'border border-slate-300 bg-white text-slate-700 hover:border-aduana-light hover:text-aduana',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-aduana',
  }

  return (
    <button
      type={type}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
