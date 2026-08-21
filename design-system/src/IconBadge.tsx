import type { ReactNode } from 'react'
import { cx, PRIMARY_TEXT, PRIMARY_BORDER } from './utils.js'

export interface IconBadgeProps {
  /**
   * Inline SVG icon. Draw it at a 24 viewBox with `stroke="currentColor"`,
   * `strokeWidth="1.5"`, round caps and joins, and no fill. It inherits the brand green.
   */
  icon?: ReactNode
  /** Label naming the organization or system. */
  name: string
  /** Extra classes appended to the tile. */
  className?: string
}

/**
 * Bordered tile pairing a line icon with a name, used for agency and system logos
 * where real marks are not available.
 *
 * Icons are hand-drawn inline SVG rather than an icon library: 24 viewBox, 1.5 stroke
 * width, line art only with no fills. Render these in a `grid gap-3 sm:grid-cols-2
 * lg:grid-cols-3` list.
 */
export function IconBadge({ icon, name, className }: IconBadgeProps) {
  return (
    <li
      className={cx(
        'flex items-center gap-3 rounded-lg border bg-white px-5 py-4 dark:bg-gray-950',
        PRIMARY_TEXT,
        PRIMARY_BORDER,
        className
      )}
    >
      {icon}
      <span className="text-base leading-tight font-medium text-gray-700 dark:text-gray-300">
        {name}
      </span>
    </li>
  )
}
