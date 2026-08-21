import type { ReactNode } from 'react'
import { cx } from './utils.js'

export interface DefinitionListProps {
  /** `DefinitionRow` elements. */
  children: ReactNode
  /** Draw hairline dividers between rows. */
  divided?: boolean
  /** Extra classes appended to the list. */
  className?: string
}

/**
 * Wrapper for label and value pairs, rendered as a real `<dl>`.
 *
 * All metadata in this system uses definition lists rather than divs. Set `divided`
 * for reference tables such as company data.
 */
export function DefinitionList({ children, divided = false, className }: DefinitionListProps) {
  return (
    <dl className={cx(divided && 'divide-y divide-gray-900/10 dark:divide-gray-100/10', className)}>
      {children}
    </dl>
  )
}

export interface DefinitionRowProps {
  /** Field name. Rendered uppercase, so pass normal sentence case. */
  label: string
  /** Field value. Accepts nested markup such as a link or a list. */
  children: ReactNode
  /** Extra classes appended to the row. */
  className?: string
}

/**
 * One label and value pair.
 *
 * Stacks on mobile and becomes a 160px label column from the `sm` breakpoint up.
 * Must be rendered inside a `DefinitionList`.
 */
export function DefinitionRow({ label, children, className }: DefinitionRowProps) {
  return (
    <div className={cx('flex flex-col gap-1 py-2 sm:flex-row sm:gap-6', className)}>
      <dt className="w-full text-xs font-semibold tracking-wide text-gray-500 uppercase sm:w-40 sm:shrink-0 dark:text-gray-400">
        {label}
      </dt>
      <dd className="text-gray-900 dark:text-gray-100">{children}</dd>
    </div>
  )
}
