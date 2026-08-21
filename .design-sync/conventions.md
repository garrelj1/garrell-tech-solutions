# Garrell Tech Solutions design system

Brand character: federal contractor credibility. Restrained, document-like, information-dense. It should read closer to a capability statement than a startup landing page.

## Setup

No provider or context wrapper. Components are plain React and render correctly on their own. Two things must be true:

- `styles.css` is loaded. It carries the theme tokens, the self-hosted brand font, and the compiled utilities. Nothing is styled without it.
- Dark mode is a **class**, not a media query. Put `class="dark"` on `<html>` or any ancestor. Every component already ships its own `dark:` pairing, so you do not add dark styling to library components, only to your own layout glue.

```jsx
import { SectionHeading, MintPanel, Button } from '@gts/design-system'
```

## Styling idiom

Tailwind v4 utility classes against a customized theme. Write utilities directly on your own layout elements; do not write custom CSS, and do not invent class names.

The palette is the part that must not be improvised:

| Family | Values | Use |
|---|---|---|
| `primary-50 … primary-950` | brand green ramp, `primary-800` = `#0f4e0f` (the logo green) | `primary-800` (dark: `primary-300`) for display accents, eyebrows, stat figures. `primary-500` for inline links only. |
| `gold` | `#cfa821`, single value | CTA fill, 48px section rules, panel top borders, stat suffixes. Never body text, never on white. |
| `mint` | `#e4f9f5`, single value | Panel and band surface in light mode. Swaps to `gray-900` in dark, never to a darkened mint. |
| `gray-50 … gray-950` | neutral ramp | `gray-900`/`gray-100` headings, `gray-600`/`gray-400` body, `gray-500` meta, `gray-200` hairlines. |

`gold` and `mint` are single values with no ramp. Shade them with opacity modifiers (`bg-gold/90`, `border-gold/70`), never `gold-400`.

Standard surface pairings: page `bg-white dark:bg-gray-950`; panel `bg-mint dark:bg-gray-900`; quiet band `bg-gray-50 dark:bg-gray-900/50`; card `bg-white dark:bg-gray-950`; hairline `border-gray-200 dark:border-gray-800`.

Type: **Space Grotesk only**, shipped with the bundle. Never introduce a second family. Weights 400/500/600/700 (the variable font tops out at 700, so `font-extrabold` renders as 700).

Layout: the site measure is `max-w-3xl` widening to `xl:max-w-5xl`, with `px-4 sm:px-6`. Sections use `py-8`.

## Rules that carry the brand

- **Section headings are small.** `text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]` in brand green with a 48px gold hairline under it. Use `SectionHeading`; do not substitute a large bold `h2`. Hierarchy comes from `PageTitle` and whitespace, not from heading size.
- **One gold CTA per view.** `Button` defaults to the gold fill. Every secondary action is `variant="link"`. There is no outline or secondary filled button.
- **Borders and surface tint, not shadows.** Depth is `border` plus a tinted background. Avoid `shadow-lg`, gradients, and glassmorphism.
- **Label/value data uses `DefinitionList` + `DefinitionRow`**, which render real `<dl>/<dt>/<dd>`, not divs.
- **Icons are hand-drawn inline SVG**: 24 viewBox, `stroke="currentColor"`, `strokeWidth="1.5"`, round caps and joins, no fill. No icon library.

## Where the truth lives

Read `styles.css` and its `@import` closure for the exact tokens and available utilities. Each component's `.prompt.md` next to it carries its props and usage; the `<Name>.d.ts` is the API contract.

## Idiomatic composition

```jsx
<section aria-labelledby="overview" className="py-8">
  <SectionHeading id="overview">Company Overview</SectionHeading>
  <p className="text-lg leading-8 text-gray-600 dark:text-gray-400">
    Founded in November 2024, the firm modernizes legacy systems and delivers
    from cloud back-end to embedded tactical edge.
  </p>
  <MintPanel className="mt-6">
    <DefinitionList divided>
      <DefinitionRow label="Founded">November 2024</DefinitionRow>
      <DefinitionRow label="Certifications">Small Business (SB)</DefinitionRow>
    </DefinitionList>
    <Button href="/contact" className="mt-5">Book a 30-Minute Call &rarr;</Button>
  </MintPanel>
</section>
```

Every `<section>` carries `aria-labelledby` or `aria-label`, icon-only buttons carry `aria-label`, and decorative SVGs carry `aria-hidden="true"`. Match that.
