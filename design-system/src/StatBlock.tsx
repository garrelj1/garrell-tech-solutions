import { cx } from './utils.js'

export interface StatBlockProps {
  /** The figure itself, for example `10` or `1M`. */
  value: string
  /** Trailing marker such as `+`. Always rendered in gold while the value stays green. */
  suffix?: string
  /** Short caption beneath the figure. */
  label: string
  /** Extra classes appended to the root element. */
  className?: string
}

/**
 * A single headline figure with its caption.
 *
 * The value renders in brand green and the suffix in gold. That split is deliberate and
 * is the one place gold is used as text. Use inside `StatBand`, which supplies the
 * surface and the grid.
 */
export function StatBlock({ value, suffix, label, className }: StatBlockProps) {
  return (
    <div className={cx('text-center', className)}>
      <div className="text-primary-800 dark:text-primary-300 text-3xl font-bold sm:text-4xl">
        {value}
        {suffix && <span className="text-gold">{suffix}</span>}
      </div>
      <div className="text-primary-800/70 dark:text-primary-300/70 mt-1 text-xs sm:text-sm">
        {label}
      </div>
    </div>
  )
}
