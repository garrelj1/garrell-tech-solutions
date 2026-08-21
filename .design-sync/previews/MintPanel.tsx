import { MintPanel, DefinitionList, DefinitionRow, Button } from '@gts/design-system'

// The differentiators panel from the homepage: gold top border, mint surface,
// gold-bordered list items inside.
export function Differentiators() {
  return (
    <div className="p-6">
      <MintPanel>
        <ul className="grid gap-4 sm:grid-cols-2">
          <li className="border-gold/70 border-l-2 pl-4">
            <span className="font-semibold text-gray-900">Product ownership, end to end —</span>{' '}
            <span className="text-gray-700">
              turns business requirements into shipped software.
            </span>
          </li>
          <li className="border-gold/70 border-l-2 pl-4">
            <span className="font-semibold text-gray-900">Lower delivery risk —</span>{' '}
            <span className="text-gray-700">proven on the FBI CJIS mission.</span>
          </li>
        </ul>
      </MintPanel>
    </div>
  )
}

// Panel holding a divided definition list, the company-data treatment.
export function WithDefinitionList() {
  return (
    <div className="p-6">
      <MintPanel>
        <DefinitionList divided>
          <DefinitionRow label="Legal Entity">Garrell Tech Solutions LLC</DefinitionRow>
          <DefinitionRow label="Founded">November 2024</DefinitionRow>
          <DefinitionRow label="UEI">GG32V7Y6B1A2</DefinitionRow>
          <DefinitionRow label="Certifications">Small Business (SB)</DefinitionRow>
        </DefinitionList>
      </MintPanel>
    </div>
  )
}

// Contact panel: the panel is also the container for the one gold CTA.
export function ContactPanel() {
  return (
    <div className="max-w-md p-6">
      <MintPanel>
        <p className="text-lg font-semibold text-gray-900">Jeremy Garrell</p>
        <p className="text-gray-500">Founder &amp; Principal Engineer</p>
        <DefinitionList className="mt-3 space-y-1.5">
          <DefinitionRow label="Email">jeremy@garrellts.com</DefinitionRow>
          <DefinitionRow label="Location">Coral Springs, FL 33065</DefinitionRow>
        </DefinitionList>
        <Button size="lg" href="#" className="mt-5">
          Book a 30-Minute Call
        </Button>
      </MintPanel>
    </div>
  )
}
