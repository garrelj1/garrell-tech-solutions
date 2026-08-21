import { StatBand, StatBlock } from '@gts/design-system'

// The homepage track-record band: mint surface, five figures, gold suffixes.
export function TrackRecord() {
  return (
    <div className="px-6 py-4">
      <StatBand label="Track Record" columns={5}>
        <StatBlock value="10" suffix="+" label="Years of federal software delivery" />
        <StatBlock value="3" label="Federal customers — FBI · Army · USMC" />
        <StatBlock value="3" label="Legacy systems modernized" />
        <StatBlock value="150" suffix="+" label="Businesses served on Callpurity SaaS" />
        <StatBlock value="1M" suffix="+" label="Records managed across 50 states" />
      </StatBand>
    </div>
  )
}

// The quieter secondary surface, for a band that should not compete with the
// headline one.
export function GrayTone() {
  return (
    <div className="px-6 py-4">
      <StatBand label="Delivery Footprint" tone="gray" columns={3}>
        <StatBlock value="50" label="States covered" />
        <StatBlock value="7" label="Person team led" />
        <StatBlock value="2024" label="Founded" />
      </StatBand>
    </div>
  )
}

// Without a label the band is just the figure row, useful when a SectionHeading
// already sits above it.
export function Unlabeled() {
  return (
    <div className="px-6 py-4">
      <StatBand columns={3}>
        <StatBlock value="1M" suffix="+" label="Phone numbers managed" />
        <StatBlock value="150" suffix="+" label="Business customers" />
        <StatBlock value="99.9" suffix="%" label="Uptime" />
      </StatBand>
    </div>
  )
}
