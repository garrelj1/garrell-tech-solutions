import type { ReactNode } from 'react'
import { cx, PRIMARY_TEXT } from './utils.js'

export interface SectionHeadingProps {
  /** Heading text. Rendered uppercase, so pass normal sentence case. */
  children: ReactNode
  /** Anchor id, so the section can be referenced by `aria-labelledby`. */
  id?: string
  /** Extra classes appended to the wrapper. */
  className?: string
}

/**
 * The signature section heading: small, uppercase, letterspaced brand-green text
 * with a 48px gold hairline beneath it.
 *
 * This is the most repeated brand element in the system. Section headings are
 * deliberately small, hierarchy comes from the page title and whitespace rather than
 * from heading size, so do not scale this up to look like a conventional h2.
 */
export function SectionHeading({ children, id, className }: SectionHeadingProps) {
  return (
    <div className={cx('mb-5', className)}>
      <h2
        id={id}
        className={cx('text-xs font-semibold tracking-[0.2em] uppercase sm:text-sm', PRIMARY_TEXT)}
      >
        {children}
      </h2>
      <div className="bg-gold mt-2 h-px w-12" />
    </div>
  )
}
