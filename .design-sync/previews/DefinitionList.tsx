import { DefinitionList, DefinitionRow } from '@gts/design-system'

// Divided reference table, the company-data treatment. Hairline dividers between
// rows, 160px label column from the sm breakpoint up.
export function Divided() {
  return (
    <div className="p-6">
      <DefinitionList divided>
        <DefinitionRow label="Legal Entity">Garrell Tech Solutions LLC</DefinitionRow>
        <DefinitionRow label="Founded">November 2024</DefinitionRow>
        <DefinitionRow label="UEI">GG32V7Y6B1A2</DefinitionRow>
        <DefinitionRow label="CAGE / NCAGE">20E53</DefinitionRow>
        <DefinitionRow label="Delivery Model">Remote — nationwide, all 50 states</DefinitionRow>
      </DefinitionList>
    </div>
  )
}

// Undivided, for short contact blocks where dividers would be noise.
export function Plain() {
  return (
    <div className="p-6">
      <DefinitionList>
        <DefinitionRow label="Email">jeremy@garrellts.com</DefinitionRow>
        <DefinitionRow label="Phone">(201) 400-7782</DefinitionRow>
        <DefinitionRow label="Web">garrellts.com</DefinitionRow>
      </DefinitionList>
    </div>
  )
}

// Values accept nested markup, such as a list of NAICS codes or a link.
export function RichValues() {
  return (
    <div className="p-6">
      <DefinitionList divided>
        <DefinitionRow label="NAICS Codes">
          <ul className="space-y-1">
            <li>541511 · Custom Computer Programming</li>
            <li>541512 · Computer Systems Design</li>
            <li>541519 · Other Computer Related Services</li>
          </ul>
        </DefinitionRow>
        <DefinitionRow label="Web">
          <a href="#" className="text-primary-800 font-semibold hover:underline">
            garrellts.com
          </a>
        </DefinitionRow>
      </DefinitionList>
    </div>
  )
}
