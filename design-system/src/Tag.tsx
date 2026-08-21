import { cx } from './utils.js'

export interface TagProps {
  /** Tag text. Spaces are converted to hyphens, matching the site's tag slugs. */
  text: string
  /** Destination. Defaults to `/tags/<slug>`. */
  href?: string
  /** Extra classes appended to the link. */
  className?: string
}

/**
 * Topic tag, rendered as uppercase brand-green text.
 *
 * Deliberately not a pill: no background, no border, no radius. Tags sit inline in a
 * row and rely on spacing and case for separation.
 */
export function Tag({ text, href, className }: TagProps) {
  const slug = text.trim().toLowerCase().split(/\s+/).join('-')
  return (
    <a
      href={href ?? `/tags/${slug}`}
      className={cx(
        'text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase',
        className
      )}
    >
      {text.split(' ').join('-')}
    </a>
  )
}
