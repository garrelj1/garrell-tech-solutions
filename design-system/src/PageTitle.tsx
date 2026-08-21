import type { ReactNode } from 'react'
import { cx } from './utils.js'

export interface PageTitleProps {
  /** The title text. */
  children: ReactNode
  /** `hero` is the oversized homepage treatment, `page` the standard interior heading. */
  size?: 'hero' | 'page'
  /** Anchor id, so the section can be referenced by `aria-labelledby`. */
  id?: string
  /** Extra classes appended to the heading. */
  className?: string
}

const SIZES = {
  hero: 'text-4xl leading-tight sm:text-5xl md:text-6xl',
  page: 'text-3xl leading-9 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14',
} as const

/**
 * The page-level h1. The only large type in the system.
 *
 * Use `hero` on a landing page where the title carries the whole hierarchy, and
 * `page` for interior pages and article titles.
 */
export function PageTitle({ children, size = 'page', id, className }: PageTitleProps) {
  return (
    <h1
      id={id}
      className={cx(
        'font-extrabold tracking-tight text-gray-900 dark:text-gray-100',
        SIZES[size],
        className
      )}
    >
      {children}
    </h1>
  )
}
