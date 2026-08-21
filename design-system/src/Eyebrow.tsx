import type { ReactNode } from 'react'
import { cx, PRIMARY_TEXT } from './utils.js'

export interface EyebrowProps {
  /** Short kicker text. Rendered uppercase, so pass normal sentence case. */
  children: ReactNode
  /** Extra classes appended to the root element. */
  className?: string
}

/**
 * Small uppercase kicker that sits directly above a page or hero heading.
 *
 * Uses the widest letterspacing in the system (0.25em) and the brand green accent.
 * Pair it with `PageTitle`: the Eyebrow names the category, the title names the thing.
 */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cx(
        'text-xs font-semibold tracking-[0.25em] uppercase sm:text-sm',
        PRIMARY_TEXT,
        className
      )}
    >
      {children}
    </p>
  )
}
