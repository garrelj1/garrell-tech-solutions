# design-sync notes — garrell-tech-solutions

## What gets synced

This repo is a Next.js marketing site and blog, **not** a component library. The synced
design system is `design-system/` (`@gts/design-system`), a framework-free React package
added specifically for this purpose. It re-expresses the patterns that already existed
inline in `app/page.tsx` and `components/` as real exported components.

`design-system/` is the source of truth for the sync. The site itself still renders its
own inline copies of these patterns; the two are **not** wired together. See "Re-sync
risks" below.

[docs/design-system.md](../docs/design-system.md) is the human-readable audit of the
live site that the package was derived from. Useful context, not an input to the build.

## Build order (this trips people up)

The Tailwind stylesheet must be rebuilt **before** the converter, because
`design-system/src/styles.css` has `@source '../../.design-sync/previews/**/*.tsx'`.
Utilities used only inside an authored preview are otherwise absent from the compiled
CSS and the card renders unstyled.

```sh
npm --prefix design-system run build          # tsc -> dist/*.js + .d.ts, tailwind -> dist/styles.css
node .ds-sync/package-build.mjs --config .design-sync/config.json \
  --node-modules ./design-system/node_modules --entry ./design-system/dist/index.js --out ./ds-bundle
node .ds-sync/package-validate.mjs ./ds-bundle
```

`lib/preview-rebuild.mjs` does **not** rebuild the Tailwind CSS. After editing a preview
that introduces a new utility class, re-run `buildCmd` first.

## Gotchas

- **`--node-modules` must be `./design-system/node_modules`**, not the repo root. The
  root is a yarn-berry install for the Next.js site; the DS package is a separate plain
  `npm install` so its `react`/`@types/react` resolve independently.
- **The safelist is load-bearing.** Tailwind only emits utilities it can see. Scanning
  the DS sources alone left the design agent unable to use `bg-primary-600`, `gap-10`,
  `xl:max-w-5xl` and similar, which would silently no-op in generated designs. The
  `@source inline(...)` blocks in `design-system/src/styles.css` cover the brand palette
  (including opacity modifiers, since `gold` and `mint` have no ramp), spacing, type
  scale, grid and layout basics. Compiled CSS is ~660 KB as a result. Do not "optimize"
  those blocks away.
- **Space Grotesk is a variable font, 300-700.** The site uses `font-extrabold` (800) in
  places; it renders as 700 both here and on the live site, so this is faithful, not a
  regression. Self-hosted at `design-system/src/fonts/` (SIL OFL 1.1) rather than loaded
  from a font host, so the bundle has no runtime font dependency.
- **playwright 1.61.1** matches the cached `chromium-1228` in `~/.cache/ms-playwright`.
  Installing a different playwright fails with `Executable doesn't exist`. Browsers were
  already cached on this machine, so only the npm package was installed into `.ds-sync/`.
- **Four components need `cardMode: column`** (DefinitionList, DefinitionRow, MintPanel,
  Tag) — flagged by `[GRID_OVERFLOW]`, already recorded in `cfg.overrides`. They are
  wide by nature (160px label column plus value, or a full-width inline tag row).
- `Card.Pair` was removed as a story: two 544px cards cannot sit side by side at preview
  card width, so it always cropped. The two-up blog grid is documented in the preview
  comments instead.

## Known render warns

None outstanding. Final validate: 12/12 render cleanly, 0 bad, 0 thin, 0 fallback cards,
0 variants-identical. Any warn on a future run is new — look at it before recording it.

## Re-sync risks

- **The package can drift from the site.** `design-system/src/*` duplicates class strings
  that also live inline in `app/page.tsx` and `components/`. Nothing enforces that they
  stay in step. If the site's look changes, the package must be updated by hand or the
  synced DS will quietly describe a design that no longer ships. The durable fix is to
  refactor the site to import from `@gts/design-system`; that was out of scope here.
- **`docs/design-system.md` records six pre-existing inconsistencies** in the site
  (off-brand `--color-indigo-500` for inline code, a dead Inter import in
  `components/LayoutWrapper.tsx`, no semantic token layer, and others). Those were
  deliberately **not** carried into the package. If a future sync reconciles package and
  site, do not re-import them.
- **Not covered by the package:** Header, Footer, MobileNav, ThemeSwitch, SearchButton,
  SectionContainer, prose/typography styling. Scope was the "core set" agreed at sync
  time. Navigation and layout primitives are the obvious next additions.
- **Icons are not exported.** `IconBadge` takes an `icon` ReactNode and the preview draws
  its own inline SVGs. If icons become a real need, add them as exports rather than
  copying SVG into every composition.
- **Dark mode is only verified by construction.** Every component ships `dark:` pairings,
  but preview cards render light-only, so no captured screenshot exercises the dark path.
- The `@source` path `'../../.design-sync/previews/**/*.tsx'` is relative to
  `design-system/src/`. Moving either directory breaks preview styling silently.
