import { Card } from '@gts/design-system'

// Cover art is an inline SVG data URI so the card is self-contained and renders
// without a network fetch. Real cards use a 544x306 image.
const COVER =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='544' height='306'>" +
  "<rect width='544' height='306' fill='%23e4f9f5'/>" +
  "<rect x='0' y='0' width='544' height='6' fill='%23cfa821'/>" +
  "<circle cx='120' cy='160' r='58' fill='%230f4e0f' opacity='0.85'/>" +
  "<rect x='210' y='120' width='230' height='16' rx='8' fill='%230f4e0f' opacity='0.5'/>" +
  "<rect x='210' y='152' width='170' height='16' rx='8' fill='%230f4e0f' opacity='0.3'/>" +
  "<rect x='210' y='184' width='200' height='16' rx='8' fill='%230f4e0f' opacity='0.2'/></svg>"

// The full card: cover image, title, description, text call to action.
export function WithImage() {
  return (
    <Card
      imgSrc={COVER}
      title="Which runtime should own a business rule"
      description="Picking the one place a rule lives, and why splitting it across the client, the API and the database costs more than it saves."
      href="/blog/one-owner-per-rule"
    />
  )
}

// Without a cover image the card collapses to title, description and CTA.
// This is the projects-list treatment.
export function TextOnly() {
  return (
    <Card
      title="Callpurity"
      description="B2B SaaS platform serving 150+ business customers with over a million phone numbers under management across all 50 states."
      href="/projects/callpurity"
      ctaLabel="View project"
    />
  )
}

// No href: the title and CTA both disappear as links, leaving a static card.
export function NotLinked() {
  return (
    <Card
      title="FBI N-DEx Modernization"
      description="Delivered under a prior prime contractor. AWS microservices for a high-throughput data-ingest pipeline, plus an on-prem ETL migration to GovCloud."
    />
  )
}
// A two-up grid is the real blog-list layout (md:w-1/2), but two 544px cards need
// more width than a preview card has, so that composition is documented rather
// than rendered here.
