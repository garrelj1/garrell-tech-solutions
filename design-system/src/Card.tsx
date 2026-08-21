import { cx } from './utils.js'

export interface CardProps {
  /** Card heading. */
  title: string
  /** Supporting copy beneath the title. */
  description: string
  /** Optional cover image. Authored at 544x306, a 16:9 crop. */
  imgSrc?: string
  /** Alt text for the cover image. Defaults to the title. */
  imgAlt?: string
  /** Destination. When set, the title and the call to action both link to it. */
  href?: string
  /** Call-to-action label. */
  ctaLabel?: string
  /** Extra classes appended to the outer wrapper. */
  className?: string
}

/**
 * Content card for posts and projects: optional 16:9 cover image, title, description
 * and a text call to action.
 *
 * Bordered with a 2px hairline rather than a shadow, matching the system's preference
 * for borders and surface tint over elevation.
 */
export function Card({
  title,
  description,
  imgSrc,
  imgAlt,
  href,
  ctaLabel = 'Learn more',
  className,
}: CardProps) {
  return (
    <div className={cx('max-w-[544px] p-4', className)}>
      <div
        className={cx(
          'overflow-hidden rounded-md border-2 border-gray-200/60 dark:border-gray-700/60',
          imgSrc && 'h-full'
        )}
      >
        {imgSrc && (
          <img
            src={imgSrc}
            alt={imgAlt ?? title}
            width={544}
            height={306}
            className="object-cover object-center md:h-36 lg:h-48"
          />
        )}
        <div className="p-6">
          <h2 className="mb-3 text-2xl leading-8 font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {href ? (
              <a href={href} aria-label={`Link to ${title}`}>
                {title}
              </a>
            ) : (
              title
            )}
          </h2>
          <p className="mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
          {href && (
            <a
              href={href}
              aria-label={`Link to ${title}`}
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-base leading-6 font-medium"
            >
              {ctaLabel} &rarr;
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
