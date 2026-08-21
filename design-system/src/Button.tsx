import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cx } from './utils.js'

export interface ButtonProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> {
  /** Label text. */
  children: ReactNode
  /**
   * `gold` is the filled call to action, the only filled button in the system.
   * `link` is the plain text link used for every secondary action.
   */
  variant?: 'gold' | 'link'
  /** `md` is the default padding, `lg` the roomier variant used in contact panels. */
  size?: 'md' | 'lg'
  /** Render full width instead of shrinking to the label. */
  block?: boolean
  /** Destination. Omit to render a `<button>` instead of an `<a>`. */
  href?: string
  /** Extra classes appended to the root element. */
  className?: string
}

const BASE = 'text-sm font-semibold transition-colors duration-200'

const VARIANTS = {
  gold: 'bg-gold text-primary-900 hover:bg-gold/90 rounded-md text-center',
  link: 'text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 leading-6',
} as const

const SIZES = { md: 'px-4 py-3', lg: 'px-5 py-3' } as const

/**
 * The system's action element.
 *
 * There is exactly one filled treatment, `gold`: gold fill, dark green text, no border
 * and no shadow. Use at most one per view. Every secondary action uses `variant="link"`,
 * which carries no padding and reads as inline text.
 */
export function Button({
  children,
  variant = 'gold',
  size = 'md',
  block = false,
  href,
  className,
  ...rest
}: ButtonProps) {
  const classes = cx(
    BASE,
    VARIANTS[variant],
    variant === 'gold' && SIZES[size],
    variant === 'gold' && (block ? 'block' : 'inline-block'),
    className
  )

  if (!href) {
    return (
      <button type="button" className={classes}>
        {children}
      </button>
    )
  }

  return (
    <a href={href} className={classes} {...rest}>
      {children}
    </a>
  )
}
