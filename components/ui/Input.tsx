import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  id: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-ink">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={error ? true : undefined}
          className={cn(
            'block w-full rounded-lg border border-border bg-surface px-4 py-3 text-ink placeholder:text-ink-muted',
            'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
            'transition-colors duration-200',
            error && 'border-error focus:ring-error',
            className
          )}
          {...props}
        />
        {error && (
          <p id={`${id}-error`} role="alert" className="text-sm text-error">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
