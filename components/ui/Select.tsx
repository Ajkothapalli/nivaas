import { type SelectHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  labelClassName?: string
  error?: string
  id: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, labelClassName, error, id, className, children, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className={cn('text-sm font-medium text-ink', labelClassName)}>
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={id}
            aria-describedby={error ? `${id}-error` : undefined}
            aria-invalid={error ? true : undefined}
            className={cn(
              'block w-full appearance-none rounded-lg border border-border bg-surface px-4 py-2.5 pr-10 text-sm text-ink',
              'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
              'transition-colors duration-200',
              error && 'border-error focus:ring-error',
              className
            )}
            {...props}
          >
            {children}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-ink-muted">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {error && (
          <p id={`${id}-error`} role="alert" className="text-sm text-error">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
