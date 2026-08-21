# Garrell Tech Solutions Design System

Extracted from the live site (garrellts.com). This documents what the code actually does today, so it can be handed to a design tool as the source of truth for new work.

**Stack:** Next.js 15 (App Router), React 19, Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.js`), `next-themes` for dark mode, Contentlayer + Pliny for the blog.

**Brand character:** federal contractor credibility. Restrained, document-like, information-dense. Deep forest green carries authority, gold is the accent that marks emphasis, mint softens the panels. It should read closer to a capability statement than a startup landing page.

---

## 1. Color

Tokens are defined in `css/tailwind.css` under `@theme`, in OKLCH. Hex equivalents are given for design tools.

### Primary ramp (brand green)

Hue 142.9. Derived from the GTS logo green, which is pinned at `primary-800`.

| Token | OKLCH | Hex |
|---|---|---|
| `primary-50` | `oklch(0.975 0.015 142.9)` | `#f1faf0` |
| `primary-100` | `oklch(0.95 0.035 142.9)` | `#e1f5e0` |
| `primary-200` | `oklch(0.895 0.06 142.9)` | `#c6e7c3` |
| `primary-300` | `oklch(0.815 0.085 142.9)` | `#a3d19f` |
| `primary-400` | `oklch(0.72 0.105 142.9)` | `#7db679` |
| `primary-500` | `oklch(0.61 0.12 142.9)` | `#549551` |
| `primary-600` | `oklch(0.52 0.122 142.9)` | `#387a36` |
| `primary-700` | `oklch(0.43 0.118 142.9)` | `#1f5f1e` |
| **`primary-800`** | `oklch(0.3714 0.1122 142.9)` | **`#0f4e0f`** (logo green) |
| `primary-900` | `oklch(0.28 0.09 142.9)` | `#033304` |
| `primary-950` | `oklch(0.19 0.065 142.9)` | `#001a00` |

### Accents

| Token | OKLCH | Hex | Role |
|---|---|---|---|
| `gold` | `oklch(0.7461 0.1447 90.89)` | `#cfa821` | CTA fills, rules, top borders, stat suffixes |
| `mint` | `oklch(0.9656 0.0226 183.19)` | `#e4f9f5` | Light-mode panel and band background |

Both are single values, not ramps. Opacity modifiers do the shading: `bg-gold/90`, `border-gold/70`.

### Neutrals

The stock Tailwind v4 gray ramp, restated in `@theme` (slate-leaning, slight blue cast):

`gray-50 #f9fafb` · `gray-100 #f3f4f6` · `gray-200 #e5e7eb` · `gray-300 #d1d5dc` · `gray-400 #99a1af` · `gray-500 #6a7282` · `gray-600 #4a5565` · `gray-700 #364153` · `gray-800 #1e2939` · `gray-900 #101828` · `gray-950 #030712`

### Semantic usage

These pairings are consistent across the site. Treat them as the rules.

| Role | Light | Dark |
|---|---|---|
| Page background | `white` | `gray-950` |
| Page text | `black` | `white` |
| Heading text | `gray-900` | `gray-100` |
| Body text | `gray-600` or `gray-700` | `gray-400` or `gray-300` |
| Muted / meta / labels | `gray-500` | `gray-400` |
| Brand accent (headings, eyebrows, links in dense UI) | `primary-800` | `primary-300` |
| Inline link / tag | `primary-500`, hover `primary-600` | `primary-500`, hover `primary-400` |
| Panel surface | `mint` | `gray-900` |
| Subtle band surface | `gray-50` | `gray-900/50` |
| Card surface | `white` | `gray-950` |
| Hairline border | `gray-200` | `gray-800` (cards) / `gray-700` |
| Accent border | `gold` | `gold` (unchanged) |
| Focus ring | `primary-500` | `primary-500` |

Two shorthand constants appear in page code and are worth keeping:

```tsx
const PRIMARY = 'text-primary-800 dark:text-primary-300'
const PRIMARY_BORDER = 'border-primary-800/30 dark:border-primary-300/30'
```

**Note the split:** `primary-800/300` is the *display* accent (eyebrows, stat numbers, section headings, dense-UI links). `primary-500` is the *inline link* color inside prose and tags. They are not interchangeable.

**Dark mode** is class-based (`.dark` on `<html>`), via `@custom-variant dark (&:where(.dark, .dark *))`. Default theme is `system`. Gold does not shift between themes; mint is swapped for `gray-900` rather than darkened.

---

## 2. Typography

**One family: Space Grotesk** (Google Fonts, `display: swap`, exposed as `--font-space-grotesk` and bound to `--font-sans`). No serif or mono override, so code falls back to the Tailwind default mono stack. There is no second typeface anywhere in the design.

Weights in use: 400, 500 (`font-medium`), 600 (`font-semibold`), 700 (`font-bold`), 800 (`font-extrabold`).

Custom line-height tokens extend the scale: `--line-height-11: 2.75rem`, `12: 3rem`, `13: 3.25rem`, `14: 3.5rem`.

### Type roles

| Role | Classes |
|---|---|
| Hero H1 | `text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight` |
| Page H1 | `text-3xl leading-9 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 font-extrabold tracking-tight` |
| Card / post title | `text-2xl leading-8 font-bold tracking-tight` |
| Eyebrow (hero) | `text-xs sm:text-sm font-semibold uppercase tracking-[0.25em]` + `PRIMARY` |
| Section heading | `text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]` + `PRIMARY` |
| Band label | `text-sm sm:text-base font-semibold uppercase tracking-[0.2em]` at `primary-800/70` |
| Sub-heading (H3) | `text-sm font-semibold uppercase tracking-wide text-gray-500` |
| Field label (`dt`) | `text-xs font-semibold uppercase tracking-wide text-gray-500` |
| Lead paragraph | `text-lg leading-8 text-gray-600 dark:text-gray-400` |
| Hero subhead | `text-lg sm:text-xl font-medium text-gray-600 dark:text-gray-400` |
| Body | default size, `text-gray-700 dark:text-gray-300` |
| Meta / caption | `text-sm text-gray-500 dark:text-gray-400` |
| Disclaimer | `text-sm italic text-gray-500 dark:text-gray-400` |

**Signature move:** headings on the marketing pages are not large. They are small, uppercase, heavily letterspaced, and brand-green, with a gold rule beneath. Size hierarchy is carried by the H1 and by whitespace, not by section headings.

---

## 3. Layout and spacing

Spacing is the stock Tailwind 4px-based scale.

**Container** (`components/SectionContainer.tsx`), wraps every page including header and footer:

```tsx
<section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
```

So: 768px measure by default, 1024px from the `xl` breakpoint, where horizontal padding drops to zero.

**Body:** `bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white`. The left padding is a scrollbar-gutter trick that prevents horizontal jump between pages.

### Rhythm

- Header block: `py-10`
- Standard content section: `py-8`
- Section heading to content: `mb-5`
- Full-bleed band internals: `py-6`, `px-4` mobile / `sm:px-10`
- Panel padding: `p-5 sm:p-6`
- Card body padding: `p-6`
- Grid gaps: `gap-3` (badge grids), `gap-4` (lists), `gap-6` / `gap-8` (major columns)

### Bleed patterns

Mobile full-bleed band that becomes an inset rounded card at `sm`:

```tsx
className="-mx-4 px-4 py-6 sm:mx-0 sm:rounded-lg sm:px-10"
```

Wide-screen escape, used on the homepage to break past the 1024px measure:

```tsx
className="xl:mx-[-4rem] xl:w-[calc(100%+8rem)]"
```

### Breakpoints

Stock Tailwind: `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280 · `2xl` 1536. Real usage clusters at `sm` (the main mobile-to-desktop switch), `lg` (two-column splits), and `xl` (container widening and bleed).

### Radius, borders, elevation

- `rounded-md` for buttons, dropdowns, small cards
- `rounded-lg` for panels and bands
- `rounded-sm` on focus rings
- Borders are 1px hairlines, except the `border-t-4 border-gold` accent and the `border-2` on blog cards
- Almost no shadow. `shadow-lg ring-1 ring-black/5` appears only on the theme dropdown. Depth is done with borders and surface tint, not elevation.

### Z-index

Custom tokens `--z-60`, `--z-70`, `--z-80` extend the scale. Assigned: `z-50` sticky header and theme menu, `z-60` mobile-nav scrim, `z-70` mobile-nav panel, `z-80` its close button.

---

## 4. Component patterns

Copy these shapes rather than inventing new ones.

### Section heading (gold-rule heading)

```tsx
<div className="mb-5">
  <h2 className="text-xs font-semibold tracking-[0.2em] uppercase sm:text-sm text-primary-800 dark:text-primary-300">
    {children}
  </h2>
  <div className="bg-gold mt-2 h-px w-12" />
</div>
```

The 48px gold hairline under every section heading is the most repeated brand element on the site.

### Mint panel

```tsx
<div className="bg-mint border-gold rounded-lg border-t-4 p-5 sm:p-6 dark:bg-gray-900">
```

Used for differentiators, company data, and the contact block. The 4px gold top border is what makes it a panel rather than a plain tint.

### Gold CTA button

The only filled button in the system:

```tsx
className="bg-gold text-primary-900 hover:bg-gold/90 rounded-md px-4 py-3 text-center text-sm font-semibold transition-colors duration-200"
```

Gold fill, dark green text, no border, no shadow. Wide variant uses `px-5 py-3`. There is no secondary or outline button defined; secondary actions are plain links.

### Stat block

```tsx
<div className="text-center">
  <div className="text-primary-800 dark:text-primary-300 text-3xl font-bold sm:text-4xl">
    {value}<span className="text-gold">{suffix}</span>
  </div>
  <div className="text-primary-800/70 dark:text-primary-300/70 mt-1 text-xs sm:text-sm">{label}</div>
</div>
```

The `+` or `M` suffix is always gold while the number stays green. Laid out `grid-cols-2 sm:grid-cols-5` on a mint band.

### Icon badge tile

```tsx
<li className="flex items-center gap-3 rounded-lg border bg-white px-5 py-4 dark:bg-gray-950
               text-primary-800 dark:text-primary-300
               border-primary-800/30 dark:border-primary-300/30">
```

Icons are inline SVG, 24px viewBox, `stroke="currentColor"`, `strokeWidth="1.5"`, round caps and joins, rendered at `h-7 w-7`. No icon library. Line-art only, no fills.

### Bordered list item

```tsx
<li className="border-gold/70 border-l-2 pl-4">
  <span className="font-semibold text-gray-900 dark:text-gray-100">{lead}</span>{' '}
  <span className="text-gray-700 dark:text-gray-300">{body}</span>
</li>
```

### Definition row

```tsx
<div className="flex flex-col gap-1 py-2 sm:flex-row sm:gap-6">
  <dt className="w-full text-xs font-semibold tracking-wide text-gray-500 uppercase sm:w-40 sm:shrink-0 dark:text-gray-400">{label}</dt>
  <dd className="text-gray-900 dark:text-gray-100">{value}</dd>
</div>
```

Stacks on mobile, becomes a 160px label column at `sm`. Wrapped in `<dl className="divide-y divide-gray-900/10 dark:divide-gray-100/10">`.

### Blog card

```tsx
<div className="overflow-hidden rounded-md border-2 border-gray-200/60 dark:border-gray-700/60">
  <Image className="object-cover object-center md:h-36 lg:h-48" width={544} height={306} />
  <div className="p-6">
    <h2 className="mb-3 text-2xl leading-8 font-bold tracking-tight">{title}</h2>
    <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
    <a className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-base leading-6 font-medium">
      Learn more &rarr;
    </a>
  </div>
</div>
```

Card images are 544x306 (16:9). Outer wrapper is `max-w-[544px] p-4 md:w-1/2`.

### Tag

```tsx
className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
```

Text only, no pill or background. Spaces become hyphens.

### Header

`flex items-center w-full justify-between py-10`, white / `gray-950` background. 48px logo mark (`goldsymbol.png`) with `mr-4`, wordmark at `text-2xl font-semibold` hidden below `sm`. Nav links: `font-medium text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400`, in a `no-scrollbar` overflow strip capped at `max-w-40 md:max-w-72 lg:max-w-96`. Right cluster is search, theme switch, mobile menu at `space-x-4 sm:space-x-6`. Sticky nav is off (`stickyNav: false`).

### Footer

Centered column, `mt-16`. Social icons (mail, GitHub, LinkedIn) at size 6, then a `text-sm text-gray-500` line of author, year, and site title separated by ` • `.

### Mobile nav

Headless UI `Dialog`. Scrim `fixed inset-0 z-60 bg-black/25`, panel `fixed top-0 left-0 z-70 h-full w-full bg-white/95 dark:bg-gray-950/98` sliding in from the right. Links are `text-2xl font-bold tracking-widest`. Body scroll is locked while open.

### Prose

`@tailwindcss/typography` with overrides in `css/tailwind.css`:

- Links: `primary-500`, hover `primary-600` (light) / `primary-400` (dark)
- `h1`/`h2`: `font-weight: 700` with tight tracking; `h3`: 600
- Dark headings forced to `gray-100`
- Inline code: `--color-indigo-500` (see caveats)
- Footnotes: `mt-12 border-t border-gray-200 pt-8 dark:border-gray-700`
- Task-list bullets hidden

---

## 5. Motion

Minimal and functional. There is no scroll animation, parallax, or entrance choreography anywhere.

- Buttons and links: `transition-colors duration-200`
- Mobile nav: `ease-in-out duration-300` transform on enter, `ease-in duration-200` on leave, sliding `translate-x-full` to `translate-x-0` with opacity to 95%
- Theme dropdown: `ease-out duration-100` enter / `ease-in duration-75` leave, `scale-95` to `scale-100` with opacity
- `scroll-smooth` on `<html>`

Assume prefers-reduced-motion safety by keeping new motion in this range: color transitions and short scale or slide reveals only.

---

## 6. Accessibility

Established in `@layer base`:

```css
a, button { outline-color: var(--color-primary-500); }
a:focus-visible, button:focus-visible {
  outline: 2px solid;
  border-radius: var(--radius-sm);
  outline-color: var(--color-primary-500);
}
```

Also standard in the codebase: every `<section>` carries `aria-labelledby` or `aria-label`, icon-only buttons carry `aria-label`, decorative SVGs carry `aria-hidden="true"`, and semantic `dl`/`dt`/`dd` is used for all metadata rather than divs. New work should match this.

Contrast check on the gold button: `#cfa821` on `#033304` text passes comfortably. Do not put gold text on white, it fails at body sizes. Gold is a fill and a rule color, not a text color, except as the stat suffix at 30px+.

---

## 7. Rules for new designs

**Do**

- Lead sections with a small uppercase letterspaced green heading plus a 48px gold hairline
- Use mint panels with a gold top border for grouped reference information
- Keep gold for a single CTA per view, plus rules and accents
- Prefer borders and surface tints over shadows
- Let information density carry the page; this is a capability statement, not a splash page
- Define every color as a light/dark pair from the semantic table
- Use `dl`/`dt`/`dd` for label-value data

**Do not**

- Introduce a second typeface
- Add gradients, glassmorphism, or large drop shadows
- Use gold as body text or on a light background
- Use `primary-500` for display accents or `primary-800` for inline prose links
- Add a color ramp for gold or mint; use opacity modifiers
- Reach for an icon library; draw 24px 1.5px-stroke line icons instead

---

## 8. Known inconsistencies

Flagged so they are not copied forward as intentional:

1. **Off-brand inline code color.** `css/tailwind.css` sets prose inline code to `--color-indigo-500`, a leftover from the starter theme. It should be a brand or gray value.
2. **Dead Inter import.** `components/LayoutWrapper.tsx` imports and applies Inter, but the App Router renders through `app/layout.tsx`, which uses Space Grotesk. The component appears unused. Space Grotesk is the real font.
3. **Two primary conventions.** `primary-800/300` for display versus `primary-500` for links is deliberate in practice but undocumented in the token layer, so it is easy to mix up.
4. **No semantic token layer.** Everything is a raw ramp reference in utility strings. There are no `--color-surface`, `--color-border`, or `--color-text-muted` aliases, so the light/dark pairs above are conventions held by hand rather than enforced by tokens.
5. **No button primitive.** The gold CTA is duplicated inline at two call sites with slightly different padding.
6. **Unused tokens.** `primary-50`, `100`, `200`, `700`, `950` are defined but not referenced anywhere in the components reviewed.

---

## Quick reference

```
Green   #0f4e0f   primary-800, logo, display accent
Gold    #cfa821   CTA fill, rules, accents
Mint    #e4f9f5   panel surface (light)
Dark bg #030712   gray-950
Font    Space Grotesk, 400/500/600/700/800
Measure 768px, 1024px at xl
Radius  6px buttons, 8px panels
Motion  200ms color, 300ms slide
```
