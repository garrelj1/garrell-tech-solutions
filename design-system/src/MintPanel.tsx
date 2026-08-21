import type { ReactNode } from 'react'
import { cx } from './utils.js'

export interface MintPanelProps {
  /** Panel contents. */
  children: ReactNode
  /** Extra classes appended to the panel, commonly `flex-1` inside an equal-height grid. */
  className?: string
}

/**
 * The grouped-information surface: mint background in light, `gray-900` in dark,
 * with a 4px gold top border.
 *
 * The gold top border is what makes it read as a panel rather than a plain tint, so do
 * not drop it. Use for reference blocks such as company data, differentiators, and
 * contact details rather than for ordinary prose.
 */
export function MintPanel({ children, className }: MintPanelProps) {
  return (
    <div
      className={cx(
        'bg-mint border-gold rounded-lg border-t-4 p-5 sm:p-6 dark:bg-gray-900',
        className
      )}
    >
      {children}
    </div>
  )
}
