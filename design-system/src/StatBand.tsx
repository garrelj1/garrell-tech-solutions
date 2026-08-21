import type { ReactNode } from 'react'
import { cx } from './utils.js'

export interface StatBandProps {
  /** Band label, rendered uppercase and letterspaced above the figures. */
  label?: string
  /** `StatBlock` elements. */
  children: ReactNode
  /** Surface tint. `mint` is the headline band, `gray` the quieter secondary band. */
  tone?: 'mint' | 'gray'
  /** Number of columns from the `sm` breakpoint up. Below it the grid is always 2 columns. */
  columns?: 2 | 3 | 4 | 5
  /** Extra classes appended to the band. */
  className?: string
}

const TONES = {
  mint: 'bg-mint dark:bg-gray-900',
  gray: 'bg-gray-50 dark:bg-gray-900/50',
} as const

const COLUMNS = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
  5: 'sm:grid-cols-5',
} as const

/**
 * Full-bleed band holding a row of `StatBlock` figures.
 *
 * Runs edge to edge on mobile and becomes an inset rounded card from the `sm` breakpoint,
 * which is the standard band treatment in this system.
 */
export function StatBand({
  label,
  children,
  tone = 'mint',
  columns = 5,
  className,
}: StatBandProps) {
  return (
    <section
      aria-label={label}
      className={cx('-mx-4 px-4 py-6 sm:mx-0 sm:rounded-lg sm:px-10', TONES[tone], className)}
    >
      {label && (
        <p className="text-primary-800/70 dark:text-primary-300/70 mb-4 text-center text-sm font-semibold tracking-[0.2em] uppercase sm:text-base">
          {label}
        </p>
      )}
      <div className={cx('grid grid-cols-2 gap-6 sm:gap-4', COLUMNS[columns])}>{children}</div>
    </section>
  )
}
