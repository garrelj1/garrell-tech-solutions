import { Button } from '@gts/design-system'

// The single filled action in the system: gold fill, dark green text, no border,
// no shadow. Use at most one per view.
export function GoldCTA() {
  return (
    <div className="p-6">
      <Button href="https://calendly.com/jeremy-garrell/30min">Book a 30-min call &rarr;</Button>
    </div>
  )
}

// Two padding steps. `md` is the default; `lg` is the roomier variant used inside
// the contact panel on the homepage.
export function Sizes() {
  return (
    <div className="flex flex-wrap items-center gap-4 p-6">
      <Button size="md" href="#">
        Book a 30-min call &rarr;
      </Button>
      <Button size="lg" href="#">
        Book a 30-Minute Call
      </Button>
    </div>
  )
}

// Every secondary action is a plain text link, never a second filled button
// and never an outline.
export function LinkVariant() {
  return (
    <div className="flex flex-col items-start gap-3 p-6">
      <Button variant="link" href="#">
        Learn more &rarr;
      </Button>
      <Button variant="link" href="#">
        Read the case study &rarr;
      </Button>
    </div>
  )
}

// `block` fills the container, which is how the CTA sits at the foot of the
// hero contact card.
export function FullWidth() {
  return (
    <div className="max-w-xs p-6">
      <div className="border-t-gold rounded-lg border border-t-4 border-gray-200 bg-white p-5">
        <p className="mb-1 text-xs font-semibold tracking-wide text-gray-500 uppercase">Email</p>
        <p className="text-primary-800 mb-4 text-sm font-semibold">jeremy@garrellts.com</p>
        <Button block href="#">
          Book a 30-min call &rarr;
        </Button>
      </div>
    </div>
  )
}
