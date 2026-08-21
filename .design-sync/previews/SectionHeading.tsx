import { SectionHeading } from '@gts/design-system'

// The signature pattern: small uppercase letterspaced green heading with a 48px
// gold hairline. Note how small it is relative to the body copy it introduces.
export function Default() {
  return (
    <div className="p-6">
      <SectionHeading id="overview-heading">Company Overview</SectionHeading>
      <p className="text-lg leading-8 text-gray-600">
        Founded in November 2024, Garrell Tech Solutions LLC is built around a decade of hands-on
        delivery across defense and federal law-enforcement programs.
      </p>
    </div>
  )
}

// Several sections in sequence, which is how the rhythm actually reads on a page.
// Each section is separated by py-8.
export function InSequence() {
  return (
    <div className="p-6">
      <div className="py-4">
        <SectionHeading>Core Competencies</SectionHeading>
        <ul className="grid list-disc gap-x-8 gap-y-3 pl-5 text-gray-700 sm:grid-cols-2">
          <li>Custom application development</li>
          <li>Cloud engineering &amp; migration</li>
          <li>Legacy modernization</li>
          <li>DevSecOps &amp; CI/CD automation</li>
        </ul>
      </div>
      <div className="py-4">
        <SectionHeading>Past Performance</SectionHeading>
        <p className="text-gray-700">
          Supported modernization of the FBI&rsquo;s National Data Exchange (N-DEx).
        </p>
      </div>
    </div>
  )
}

// Length variations, to show the gold rule stays a fixed 48px rather than
// tracking the heading width.
export function Lengths() {
  return (
    <div className="space-y-2 p-6">
      <SectionHeading>Contact</SectionHeading>
      <SectionHeading>Supported Agencies and Enterprise Systems</SectionHeading>
    </div>
  )
}
