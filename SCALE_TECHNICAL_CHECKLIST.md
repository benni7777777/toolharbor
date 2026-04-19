# Scale Technical Checklist

Purpose: verify technical SEO before publishing large numbers of pages.

## Canonicals

- Each indexable route has one canonical URL.
- Locale paths do not canonicalize incorrectly to another language.
- Root redirects and locale-prefixed routes do not create duplicate canonical variants.
- Trailing slash behavior matches `next.config.js`.

## Sitemaps

- Only indexable, canonical pages are included.
- New cluster routes are added only after the route is live and useful.
- Image sitemap entries are used only for meaningful task media, not decorative assets.
- Sitemap count and file size stay within platform limits.

## Robots and Noindex

- Draft, preview, unsupported, and thin routes are noindexed or absent.
- Internal search, generated filters, and parameter variants are not indexed.
- `robots.txt` aligns with sitemap location.

## Renderability

- SEO-critical copy is visible in the normal page, not hidden behind client-only hydration.
- App Router pages generate static HTML where possible.
- Tool UI can be client-side, but explanatory content and links should render reliably.

## Page Speed

- Ads do not block core tool rendering.
- Page imagery is purposeful, compressed, and sized.
- Third-party scripts are scoped to eligible surfaces.
- Mobile rails are hidden and mobile sticky ads do not overlap controls.

## Internal Links

- No orphan pages.
- Every page declares a role: solve, route, diagnose, compare, specify, or bundle.
- Hubs link to tools and support pages.
- Support pages link back to exact tools.
- Anchor text describes the task.

## Duplicate Variants

- No duplicate route families for `/tools/*` and `/[locale]/tools/*` unless canonical strategy is explicit.
- No query-parameter indexation for ad/debug/previews.
- No duplicate PDF support pages that target the same failure mode.

## Locale Safety

- Hreflang and canonical output are reviewed before broad locale expansion.
- Translated pages must be real translations, not English clones.
- Locale-specific specs are published only when maintained.

## Structured Data

- BreadcrumbList for indexable pages.
- SoftwareApplication for live tools only.
- ItemList for hubs/collections.
- FAQ/HowTo only when matching visible content is present.
- No review, rating, or product schema unless data is real and visible.

## Deployment Checks

- `npm test` focused suite passes.
- `npx tsc --noEmit` passes or all failures are documented as unrelated blockers.
- `npm run build` produces `out/`.
- Deployment environment has partner redirect secrets, not committed repo values.
- Production smoke test checks homepage, tools directory, top tool, and a result/download flow.
