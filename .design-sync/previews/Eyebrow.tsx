import { Eyebrow, PageTitle } from '@gts/design-system'

// The kicker in its natural position, directly above a hero title.
export function AboveTitle() {
  return (
    <div className="p-6">
      <Eyebrow>Federal Software Delivery</Eyebrow>
      <PageTitle size="hero" className="mt-3">
        Garrell Tech Solutions LLC
      </PageTitle>
    </div>
  )
}

// Alone, so the 0.25em tracking and the brand green are legible. This is the
// widest letterspacing in the system.
export function Standalone() {
  return (
    <div className="p-6">
      <Eyebrow>Federal Software Delivery</Eyebrow>
    </div>
  )
}

// Length variations.
export function Lengths() {
  return (
    <div className="space-y-3 p-6">
      <Eyebrow>Case Study</Eyebrow>
      <Eyebrow>Cloud Engineering and Legacy Modernization</Eyebrow>
    </div>
  )
}
