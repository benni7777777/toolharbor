# SEO Changelog

## What changed
- Added centralized page and category SEO profiles, plus dedicated high-intent overrides for priority tool routes.
- Fixed tool route resolution to use slugs correctly and removed stale route assumptions.
- Added workflow and category metadata generators and wired structured data into homepage, tool index, category hubs, workflow, and trust pages.
- Removed invalid or low-value structured data patterns such as fake review data and SearchAction markup.
- Strengthened tool-page HTML with query-first copy blocks, inputs/outputs, comparison guidance, examples, and related-path context above the fold.
- Replaced query-string category navigation with crawlable category hub links across the homepage, desktop navigation, mobile navigation, and tools directory.
- Expanded sitemap coverage to include category hubs and workflow pages while keeping utility routes out.
- Updated robots policy to block `/go/` and keep the sitemap/host aligned with the canonical production domain.
- Fixed manifest shortcuts and removed stale asset references that pointed to non-existent screenshots or icons.
- Converted the root `/` route into a noindex locale handoff page with a crawl-safe fallback instead of an opaque client-only redirect.

## Why it changed
- To give every live canonical route a distinct search target, cleaner title/description set, and valid structured data.
- To reduce duplicate-content and cannibalization risk between the homepage, tools directory, category hubs, and overlapping tool pages.
- To make the exported HTML more search-meaningful without depending on client interaction for context.
- To align sitemap, robots, canonicals, OG URLs, and internal links around `https://www.opentoolskit.com`.

## Expected SEO effect
- Better crawlability through real category hub routes and stronger internal-link distribution.
- Higher snippet quality from more descriptive, front-loaded titles and less boilerplate metadata.
- Better entity/trust signals from improved trust pages, structured data, and visible source/privacy/support linking.
- Lower duplicate-content risk at the root route and across category-filter navigation states.
