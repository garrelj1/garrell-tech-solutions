import { DefinitionList, DefinitionRow } from '@gts/design-system'

// DefinitionRow must live inside a DefinitionList, so every cell composes the
// parent. A single row: uppercase label column, value on the right.
export function Single() {
  return (
    <div className="p-6">
      <DefinitionList>
        <DefinitionRow label="Legal Entity">Garrell Tech Solutions LLC</DefinitionRow>
      </DefinitionList>
    </div>
  )
}

// Label lengths vary but the column stays a fixed 160px, so values stay aligned.
export function AlignedColumn() {
  return (
    <div className="p-6">
      <DefinitionList divided>
        <DefinitionRow label="UEI">GG32V7Y6B1A2</DefinitionRow>
        <DefinitionRow label="CAGE / NCAGE">20E53</DefinitionRow>
        <DefinitionRow label="Certifications">Small Business (SB)</DefinitionRow>
      </DefinitionList>
    </div>
  )
}

// A value carrying nested markup rather than a plain string.
export function NestedValue() {
  return (
    <div className="p-6">
      <DefinitionList>
        <DefinitionRow label="NAICS Codes">
          <ul className="space-y-1">
            <li>541511 · Custom Computer Programming</li>
            <li>541512 · Computer Systems Design</li>
          </ul>
        </DefinitionRow>
      </DefinitionList>
    </div>
  )
}
