import { Eyebrow, PageTitle } from '@gts/design-system'

// The homepage treatment: kicker, oversized title, supporting line. The title is
// the only large type in the system, so it carries the whole hierarchy.
export function Hero() {
  return (
    <div className="p-6">
      <Eyebrow>Federal Software Delivery</Eyebrow>
      <PageTitle size="hero" className="mt-3">
        Garrell Tech Solutions LLC
      </PageTitle>
      <p className="mt-3 max-w-xl text-lg font-medium text-gray-600 sm:text-xl">
        Product ownership that turns business requirements into working software.
      </p>
    </div>
  )
}

// The interior page and article treatment: a step down from hero, same weight
// and tracking.
export function Page() {
  return (
    <div className="p-6">
      <PageTitle>Which runtime should own a business rule</PageTitle>
      <p className="mt-3 text-sm text-gray-500">August 4, 2026 · 5 min read</p>
    </div>
  )
}

// Both sizes together, so the step between them is visible.
export function SizeScale() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <p className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">hero</p>
        <PageTitle size="hero">Cloud to tactical edge</PageTitle>
      </div>
      <div>
        <p className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">page</p>
        <PageTitle size="page">Cloud to tactical edge</PageTitle>
      </div>
    </div>
  )
}
