/** Join class names, dropping falsy values. Internal helper, not part of the public API. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Shared accent pairing: brand green in light, the lighter tint in dark. */
export const PRIMARY_TEXT = 'text-primary-800 dark:text-primary-300'

/** Shared accent border pairing, used by tiles and outlined surfaces. */
export const PRIMARY_BORDER = 'border-primary-800/30 dark:border-primary-300/30'
