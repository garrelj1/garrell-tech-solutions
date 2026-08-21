import { Tag } from '@gts/design-system'

// Tags sit inline in a row. Deliberately not pills: no background, no border,
// no radius. Case and spacing do the separating.
export function Row() {
  return (
    <div className="p-6">
      <Tag text="aws" />
      <Tag text="govcloud" />
      <Tag text="opensearch" />
      <Tag text="modernization" />
    </div>
  )
}

// Multi-word tags are hyphenated, matching the site's tag slugs.
export function MultiWord() {
  return (
    <div className="p-6">
      <Tag text="federal software" />
      <Tag text="product ownership" />
      <Tag text="tactical edge" />
    </div>
  )
}

// In context beneath a post title, which is where tags actually appear.
export function InPostHeader() {
  return (
    <div className="p-6">
      <h2 className="mb-2 text-2xl leading-8 font-bold tracking-tight text-gray-900">
        Which runtime should own a business rule
      </h2>
      <div>
        <Tag text="architecture" />
        <Tag text="business rules" />
      </div>
    </div>
  )
}
