import { StatBlock } from '@gts/design-system'

// A single figure. The value is brand green, the suffix gold: this is the one
// place gold is used as text rather than as a fill or a rule.
export function Default() {
  return (
    <div className="p-6">
      <StatBlock value="10" suffix="+" label="Years of federal software delivery" />
    </div>
  )
}

// With and without a suffix, side by side.
export function SuffixVariants() {
  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      <StatBlock value="10" suffix="+" label="Years of federal software delivery" />
      <StatBlock value="3" label="Legacy systems modernized" />
      <StatBlock value="99.9" suffix="%" label="Platform uptime" />
    </div>
  )
}

// Larger values and longer captions, which is where the caption wraps.
export function LongCaptions() {
  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      <StatBlock value="1M" suffix="+" label="Records managed across 50 states" />
      <StatBlock value="150" suffix="+" label="Businesses served on the Callpurity SaaS platform" />
    </div>
  )
}
