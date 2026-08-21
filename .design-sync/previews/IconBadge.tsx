import { IconBadge } from '@gts/design-system'

// Icons are hand-drawn inline SVG, never an icon library: 24 viewBox,
// stroke="currentColor", strokeWidth 1.5, round caps and joins, no fill.
function IconBase({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7 shrink-0"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

const Shield = () => (
  <IconBase>
    <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" />
  </IconBase>
)
const Gavel = () => (
  <IconBase>
    <rect x="2.5" y="2.5" width="4.5" height="9" rx="1.2" transform="rotate(45 4.75 7)" />
    <line x1="9" y1="9" x2="16" y2="16" />
    <line x1="4" y1="21" x2="14" y2="21" />
  </IconBase>
)
const Star = () => (
  <IconBase>
    <path d="M12 3l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6L12 3z" />
  </IconBase>
)
const Anchor = () => (
  <IconBase>
    <circle cx="12" cy="4.5" r="1.75" />
    <line x1="12" y1="6.5" x2="12" y2="21" />
    <line x1="8.5" y1="10" x2="15.5" y2="10" />
    <path d="M5 14a7 7 0 0 0 14 0" />
  </IconBase>
)

// The supported-agencies grid from the homepage.
export function AgencyGrid() {
  return (
    <div className="p-6">
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <IconBadge icon={<Shield />} name="Federal Bureau of Investigation" />
        <IconBadge icon={<Gavel />} name="U.S. Department of Justice" />
        <IconBadge icon={<Star />} name="U.S. Army" />
        <IconBadge icon={<Anchor />} name="U.S. Marine Corps" />
      </ul>
    </div>
  )
}

// A single tile, so the border, padding and icon-to-label gap are readable.
export function Single() {
  return (
    <div className="max-w-sm p-6">
      <ul>
        <IconBadge icon={<Shield />} name="Federal Bureau of Investigation" />
      </ul>
    </div>
  )
}

// Without an icon the tile still works, though the icon is the point.
export function NoIcon() {
  return (
    <div className="max-w-sm p-6">
      <ul>
        <IconBadge name="Pro Health Partners" />
      </ul>
    </div>
  )
}
