const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const write = (file, content) => {
  fs.writeFileSync(path.join(root, file), `${content.trim()}\n`, 'utf8');
};

const refs = [
  'Google Search Central, helpful people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content',
  'Google Search Central, canonical URLs: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls',
  'Google Search Central, sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview',
  'Google Search Central, BreadcrumbList markup: https://developers.google.com/search/docs/appearance/structured-data/breadcrumb',
];

const refBlock = `References used for guardrails:\n${refs.map((item) => `- ${item}`).join('\n')}`;

const clusters = [
  {
    id: 'pdf-workflows',
    name: 'PDF workflows',
    priority: 1,
    ceiling: '2M-4M monthly views when every major PDF task has a tool, hub, troubleshooting, comparison, and workflow layer.',
    why: 'This is the strongest live inventory: 95+ PDF tools already exist across locale-prefixed routes, with monetizable download intent and browser-first privacy positioning.',
    monetization: 'High. Users complete file tasks, hit result/download surfaces, and can see sponsor previews without degrading the tool.',
    seeds: ['compress-pdf', 'merge-pdf', 'split-pdf', 'organize-pdf', 'jpg-to-pdf', 'pdf-to-jpg', 'edit-pdf', 'sign-pdf', 'encrypt-pdf', 'decrypt-pdf', 'ocr-pdf', 'crop-pdf', 'rotate-pdf', 'remove-metadata', 'sanitize-pdf', 'repair-pdf', 'flatten-pdf', 'pdf-to-docx', 'word-to-pdf', 'extract-pages'],
  },
  {
    id: 'exact-kb-image-upload-fixes',
    name: 'Exact-KB image and upload-limit fixes',
    priority: 2,
    ceiling: '1M-2M monthly views after image compression, resizing, crop, format conversion, and portal upload troubleshooting tools exist.',
    why: 'Exact upload-limit searches have urgent intent, clear success criteria, and strong long-tail breadth without needing city or demographic doorway pages.',
    monetization: 'High. The user has a task failure and is likely to accept a labeled partner next step after completion.',
    seeds: ['compress-image-to-20kb', 'compress-image-to-50kb', 'compress-image-to-100kb', 'resize-image-for-upload', 'signature-image-too-large', 'photo-too-large-for-form', 'profile-photo-upload-failed', 'image-upload-limit-fixer', 'convert-photo-to-jpg', 'reduce-photo-file-size', 'make-image-under-200kb', 'compress-png-under-100kb', 'compress-jpg-under-50kb', 'image-dimensions-checker', 'photo-rejected-by-portal', 'application-form-photo-resize', 'school-form-photo-upload', 'job-application-photo-upload', 'image-too-large-for-email', 'scan-photo-size-fixer'],
  },
  {
    id: 'passport-id-application-photos',
    name: 'Passport, ID, and application photo workflows',
    priority: 3,
    ceiling: '500K-1.5M monthly views when real crop, background, dimensions, and validation tools support the claims.',
    why: 'High intent and repeatable specs, but it must be product-backed because misleading ID/passport pages damage trust.',
    monetization: 'High if the on-site result remains useful and the partner link is clearly optional.',
    seeds: ['passport-photo-maker', 'white-background-photo-tool', 'id-photo-cropper', 'application-photo-maker', 'visa-photo-resizer', '2x2-photo-maker', '35x45mm-photo-tool', 'signature-photo-maker', 'document-photo-background', 'photo-for-online-form', 'student-id-photo-tool', 'job-application-photo-tool', 'passport-photo-size-guide', 'id-photo-aspect-ratio', 'photo-background-white-guide', 'crop-face-centered-photo', 'photo-size-requirements', 'printable-passport-photo-sheet', 'mobile-passport-photo-check', 'application-photo-upload-prep'],
  },
  {
    id: 'metadata-seo-publishing-launch-tools',
    name: 'Metadata, SEO, and publishing launch tools',
    priority: 4,
    ceiling: '500K-1.2M monthly views after preview/checker tools exist and can provide original diagnostics.',
    why: 'Useful for creators and developers, strong internal fit with open-source teaching, but pages need working checkers rather than generic SEO copy.',
    monetization: 'Medium. Intent is professional and repeat-use, but ad tolerance is lower.',
    seeds: ['meta-title-checker', 'meta-description-checker', 'og-preview', 'twitter-card-preview', 'robots-txt-builder', 'sitemap-generator', 'slug-generator', 'canonical-url-checker', 'schema-helper', 'favicon-checker', 'page-title-length-guide', 'meta-description-length-guide', 'open-graph-debug-guide', 'robots-txt-template-guide', 'sitemap-index-guide', 'launch-seo-checklist', 'hreflang-checker', 'social-preview-checker', 'structured-data-validator', 'metadata-cleanup-workflow'],
  },
  {
    id: 'social-formatting-publishing-cleanup',
    name: 'Social formatting and publishing cleanup',
    priority: 5,
    ceiling: '300K-900K monthly views with platform-aware formatters and visible examples.',
    why: 'Large query surface, easy browser-side product scope, but many keywords are low value unless the tools solve formatting friction directly.',
    monetization: 'Medium. High volume but lower commercial depth; keep sponsor previews subtle.',
    seeds: ['instagram-line-breaks', 'instagram-bio-formatter', 'tiktok-caption-cleaner', 'youtube-description-formatter', 'linkedin-post-formatter', 'hashtag-cleanup', 'twitter-thread-splitter', 'caption-character-counter', 'emoji-spacing-cleanup', 'social-text-line-breaks', 'youtube-title-checker', 'pinterest-description-formatter', 'facebook-post-formatter', 'social-link-preview', 'bio-link-text-cleaner', 'caption-to-bullets', 'remove-extra-spaces', 'normalize-smart-quotes', 'utm-caption-cleanup', 'social-publishing-checklist'],
  },
  {
    id: 'evergreen-calculators-dev-utilities',
    name: 'Evergreen calculators and light developer utilities',
    priority: 6,
    ceiling: '1M-2M monthly views only after repeat-use quality beats commodity calculators and formatters.',
    why: 'Big market, but crowded. Build selectively around repeat use, privacy, and workflow grouping.',
    monetization: 'Medium. Repeat visits can be valuable, but pages must stay fast and uncluttered.',
    seeds: ['age-calculator', 'date-difference-calculator', 'percentage-calculator', 'word-counter', 'character-counter', 'unit-converter', 'json-formatter', 'base64-decode', 'base64-encode', 'url-encode', 'url-decode', 'uuid-generator', 'hash-generator', 'timestamp-converter', 'color-converter', 'regex-tester', 'csv-to-json', 'json-to-csv', 'markdown-preview', 'text-diff-checker'],
  },
];

write('TRAFFIC_SCALE_PLAN.md', `
# OpenToolsKit Traffic Scale Plan

Purpose: define a realistic path from the current PDF-heavy utility surface to a multi-cluster utility platform that can earn 10M monthly pageviews without doorway pages, hidden content, or low-value scaled pages.

${refBlock}

## Current Starting Point

- Live strength: locale-prefixed PDF stack with tool pages, category hubs, workflow support, trust pages, and monetized result surfaces.
- Planned or partial strength: root utility stack concepts for image, social, metadata, calculator, and developer utilities. These should not receive indexable pages until the tool can genuinely complete the task.
- Primary growth rule: tool capability comes before query expansion. A page can exist only when it helps a user complete or understand a real task better than the nearest existing page.
- Architecture rule: each new route must have a cluster role, a canonical URL, visible user content, and at least two internal links from relevant live pages before publication.

## Stage A - 100K Monthly Views

Target clusters:
- PDF workflows first.
- Begin exact-KB image/upload-limit planning, but do not publish unsupported image pages yet.

Target page counts by type:
- Tool pages: 70-100 upgraded live PDF tools.
- Cluster hubs: 6 PDF category hubs plus one all-tools directory.
- Troubleshooting pages: 10-15 PDF upload, compression, conversion, password, OCR, and corruption failures.
- Comparison pages: 8-12 PDF task comparisons.
- Workflow pages: 5-8 multi-step PDF workflows.
- Spec/reference pages: 5-8 PDF format, size, page, metadata, and security references.

Internal-link depth:
- Every PDF tool links to its category hub, all-tools directory, workflow builder, 2-5 adjacent tools, and at least one support intent once that support page exists.
- Hubs link to top tools, failure-mode guides, and the next likely workflow.

Pages/session target: 1.5.

Top 10 traffic share target: below 45%. The top tools will still dominate, but at least half of organic landings should come from the broader PDF cluster.

Expected risks and bottlenecks:
- Tool pages may feel too templated if comparisons, examples, and edge cases are generic.
- Ad surfaces must remain contained so users do not perceive the product as an ad farm.
- Non-PDF pages should stay planned until tools exist.

## Stage B - 500K Monthly Views

Target clusters:
- PDF workflows remain the core.
- Launch exact-KB image/upload-limit tools after product support exists.
- Start passport/application photo MVP only after image resize/crop/background support exists.

Target page counts by type:
- Tool pages: 120-160 across PDF plus first image tools.
- Cluster hubs: 10-14.
- Use-case pages: 25-40, focused on upload failures and post-PDF workflows.
- Troubleshooting pages: 35-55.
- Comparison pages: 20-30.
- Spec/reference pages: 25-40.
- Workflow pages: 15-25.
- Collection/pack pages: 8-12.

Internal-link depth:
- Every cluster has a hub and at least three routes back to core tools.
- New image pages link to exact tools, not to generic directories only.
- Use task anchors such as "compress PDF before upload" or "resize a signature image under 50KB".

Pages/session target: 1.6-1.7.

Top 10 traffic share target: below 35%. Long-tail should begin to carry exact problem queries.

Expected risks and bottlenecks:
- Exact-size image pages can become spam if sizes are arbitrary. Only publish values tied to common upload limits or workflows.
- Passport/ID pages must avoid country-specific claims unless requirements are verified and maintained.

## Stage C - 1M Monthly Views

Target clusters:
- PDF workflows.
- Exact-KB image/upload-limit fixes.
- Passport, ID, and application photos.
- Metadata/SEO launch tools begin if preview/checker tools exist.

Target page counts by type:
- Tool pages: 200-260.
- Cluster hubs: 16-24.
- Use-case pages: 70-100.
- Troubleshooting pages: 80-120.
- Comparison pages: 45-70.
- Spec/reference pages: 70-100.
- Workflow pages: 35-55.
- Collection/pack pages: 20-35.
- Guides/glossary: 40-70, only where concepts help tool use.

Internal-link depth:
- Hubs are no more than two clicks from the homepage or tools directory.
- Every support page links back to the exact tool, the cluster hub, and one next likely action.
- Comparison pages resolve cannibalization by stating which tool/job belongs where.

Pages/session target: 1.8.

Top 10 traffic share target: below 28%.

Expected risks and bottlenecks:
- Non-PDF product build becomes the limiting factor. Do not let content get ahead of working tools.
- International expansion requires locale canonical and hreflang discipline before scale.

## Stage D - 3M Monthly Views

Target clusters:
- Mature PDF and image/photo clusters.
- Metadata/SEO and social formatting clusters with live tools.
- Select evergreen calculators/developer utilities with repeat-use value.

Target page counts by type:
- Tool pages: 350-500.
- Cluster hubs: 30-45.
- Use-case pages: 150-230.
- Troubleshooting pages: 160-260.
- Comparison pages: 100-150.
- Spec/reference pages: 140-220.
- Workflow pages: 75-120.
- Collection/pack pages: 50-80.
- Guides/glossary: 100-180.

Internal-link depth:
- Cross-cluster links connect real adjacent jobs: JPG to PDF, image compression before PDF, metadata cleanup before publishing, social preview after OG preview.
- No page should be orphaned; every page has an inbound role from a hub, tool, or support page.

Pages/session target: 2.0.

Top 10 traffic share target: below 22%.

Expected risks and bottlenecks:
- Page speed and monetization scripts need cluster-level monitoring.
- Maintaining specs across photo, SEO, and platform pages becomes editorial work, not just engineering.

## Stage E - 10M Monthly Views

Target clusters:
- Six mature clusters with working tools and support content.
- Locale expansion only for clusters with enough search demand and maintained translations.
- Programmatic publishing is allowed only through the safe-scale gate in \`SAFE_SCALE_RULES.md\`.

Target page counts by type:
- Tool pages: 650-900.
- Cluster hubs: 60-90.
- Use-case pages: 350-550.
- Troubleshooting pages: 350-600.
- Comparison pages: 220-350.
- Spec/reference pages: 280-450.
- Workflow pages: 160-260.
- Collection/pack pages: 110-180.
- Guides/glossary: 250-420.

Internal-link depth:
- Important pages reachable within three clicks from a hub.
- Every page has a declared role: solve, route, compare, troubleshoot, specify, or bundle.
- Long-tail pages must have measurable unique value and link back into real product flows.

Pages/session target: 2.2.

Top 10 traffic share target: below 15%. Long-tail should drive most incremental traffic.

Expected risks and bottlenecks:
- Editorial maintenance and product truth become the biggest risks.
- Aggressive ad density would reduce trust and repeat usage; monetization must stay proportional to completion moments.
- 10M views likely requires stronger image/photo and calculator/dev repeat-use products, not only more PDF pages.
`);

write('SAFE_SCALE_RULES.md', `
# Safe Scale Rules

Purpose: prevent OpenToolsKit from becoming a doorway or thin-page site while still allowing durable query expansion.

${refBlock}

## Core Rule

A page is publishable only when it is materially better for a specific user task than the nearest existing page. Keyword demand alone is never enough.

## Allowed Expansion Drivers

- A distinct user problem, such as "PDF too large to upload" versus the generic "compress PDF" tool page.
- A distinct output format, such as PDF to JPG versus PDF to PNG.
- A real platform or product requirement, such as exact image file size, pixel dimensions, or accepted format.
- A troubleshooting scenario with a clear cause and fix.
- A workflow context that combines multiple tools in a way a user actually performs.
- A comparison that prevents users from choosing the wrong tool.
- A spec/reference page that is maintained and linked to a tool that can act on it.

## Disallowed Expansion Drivers

- City, state, or country swaps without verified and maintained local requirements.
- Tiny wording changes around the same task.
- Arbitrary numbers with no real upload-limit or workflow value.
- Fake "best" pages with no original testing, examples, or selection criteria.
- Doorway pages that all funnel to the same tool without new help.
- Pages that promise a tool output the product cannot create.
- Schema markup that describes content or actions not visible on the page.
- Client-only SEO sections hidden from normal users or unavailable in rendered HTML.

## Required Pre-Publish Checks

| Check | Publish threshold | Reject when |
| --- | --- | --- |
| Duplication risk | Below 55 | Same intent as a live URL with only wording changes |
| Cannibalization risk | Below 60 | Searcher would not know why this page differs from an existing tool page |
| Content difference score | 60 or above | The page has fewer than 3 meaningful differentiators |
| Usefulness score | 70 or above | The page does not help complete, diagnose, compare, or route a task |
| Product support | Required for tool/use-case pages | The tool cannot complete the promised job |
| Internal-link role | Clear or rewrite | No hub, tool, or workflow needs this page |

The code-level scoring helper lives in \`src/lib/growth/clusters.ts\` as \`scoreScaleCandidate\`. It is intentionally conservative: unsupported or indistinct candidates return \`reject\`, not \`publish\`.

## Content-Difference Threshold

A candidate needs at least three of these before publication:

- Different input problem.
- Different output requirement.
- Different failure cause.
- Different tool sequence.
- Different constraint, limit, or compatibility rule.
- Different comparison outcome.
- Different maintained spec.
- Different example set based on real user jobs.

## Internal-Link Role

Every page must declare one primary role:

- Solve: direct tool page.
- Route: hub or collection.
- Diagnose: troubleshooting page.
- Compare: comparison page.
- Specify: requirement/reference page.
- Bundle: workflow or pack page.

If no existing or planned page needs to link to the candidate, the page should not ship.

## Examples: Accept

- \`/en/guides/pdf-too-large-to-upload\`: distinct failure mode, links to compress PDF, split PDF, and optimize/repair hub.
- \`/tools/compress-image-to-50kb\`: acceptable only after an image compressor exists and the page explains common 50KB upload limits, dimensions, formats, and failure cases.
- \`/guides/merge-pdf-vs-combine-single-page\`: comparison clarifies different outcomes and links to both tools.

## Examples: Reject

- \`/tools/compress-image-to-51kb\`: arbitrary size with no unique requirement.
- \`/tools/best-pdf-tool-online\`: vague, unsupported, and cannibalizes the directory.
- \`/guides/passport-photo-usa-canada-uk-australia-every-country\`: unmaintainable and likely inaccurate unless backed by verified specs.
- \`/tools/merge-pdf-fast-free-online-no-signup\`: keyword stuffing around the existing merge PDF page.

## Publication Workflow

1. Confirm the product can solve or support the task.
2. Score the candidate using the safe-scale criteria.
3. Assign a cluster, page type, canonical URL, and internal-link role.
4. Write visible user-first content with examples and next actions.
5. Add structured data only for visible entities and page types.
6. Add to sitemap only after canonical and noindex rules are verified.
7. Monitor Search Console for cannibalization after launch.
`);

const clusterSections = clusters.map((cluster) => `## ${cluster.priority}. ${cluster.name}

Why this cluster matters:
${cluster.why}

Expected traffic ceiling:
${cluster.ceiling}

Monetization alignment:
${cluster.monetization}

Top 20 seed pages:
${cluster.seeds.map((seed, index) => `${index + 1}. ${seed}`).join('\n')}

Required tool pages:
- Build or upgrade only the tools that can complete the task in the browser.
- Preserve client-side privacy messaging and clear input/output constraints.
- Add examples, edge cases, and adjacent-tool links to every important tool page.

Required support pages:
- Use-case pages for common jobs.
- Troubleshooting pages for failure modes.
- Spec/reference pages only when requirements are maintained.

Required comparison pages:
- Compare adjacent tools with explicit job boundaries.
- Explain when not to use the current tool.
- Link to both alternatives with descriptive anchors.

Internal-link plan:
- Hub to top tools, top support pages, and workflows.
- Tool to hub, adjacent tools, troubleshooting, comparisons, and workflow.
- Support page back to exact tool, hub, and next likely action.
- Cross-cluster links only when the workflow is real.

Schema plan:
- SoftwareApplication for live tools.
- BreadcrumbList for all indexable pages.
- ItemList for hubs and collections.
- FAQ/HowTo only when the visible content actually contains that structure.

Image/media plan:
- Use media only when it clarifies the task or improves preview CTR.
- Descriptive filenames and alt text.
- No decorative image inflation.

Content freshness and maintenance:
- Review query data monthly once Search Console has impressions.
- Review specs quarterly, or sooner when a platform requirement changes.
- Mark pages for rewrite if they lose traffic while the matching tool remains healthy.
`).join('\n');

write('CLUSTER_EXECUTION_PLAN.md', `
# Cluster Execution Plan

Purpose: prioritize growth by real product support, monetization relevance, and durable search opportunity. This plan does not authorize unsupported routes.

Priority logic:
1. Existing strongest live routes first.
2. Highest-intent clusters second.
3. High-volume evergreen clusters third.
4. New clusters only when product support exists.

${clusterSections}
`);

write('SESSION_DEPTH_PLAN.md', `
# Session Depth Plan

Purpose: increase pages/session without turning the product into an ad maze. Session depth should come from better task routing, not forced pagination.

## Baseline

Current analytics baseline is not committed to the repo. Treat baseline as unknown until production analytics are reviewed. Track by cluster, landing page type, device, and monetization eligibility.

## Target: 1.5 Pages Per Session

Build now:
- Add cluster-aware task pathways on tool pages. Implemented in \`src/components/seo/GrowthPathways.tsx\`.
- Ensure every PDF tool links to category hub, all-tools directory, workflow builder, and adjacent tools.
- Use descriptive anchors, not vague "learn more" links.
- Keep result/download monetization panels complete, but do not interrupt core task completion.

Expected effect:
- More users continue to a related PDF action after completing or evaluating the first task.

## Target: 1.8 Pages Per Session

Build next:
- Add troubleshooting modules to high-intent PDF tools once support pages exist.
- Add "continue with" workflow suggestions after successful downloads.
- Promote cluster hubs from homepage and tools directory based on actual demand.
- Add recently used tools if storage/privacy review confirms it remains local-only.

Expected effect:
- Users move from a single tool to a task sequence: compress then split, JPG to PDF then merge, redact then flatten.

## Target: 2.2 Pages Per Session

Build later:
- Cross-cluster workflow suggestions, such as image compression before JPG to PDF or metadata preview before publishing.
- Platform-specific collections when tools and specs exist.
- Saved local workflows with transparent browser storage.
- Better hub pages that route by problem, not just category.

Expected effect:
- Repeat users treat OpenToolsKit as a utility workspace instead of a one-off converter.

## UX Guardrails

- Never block a tool behind navigation.
- Keep ads below modal z-index and away from core controls.
- Do not add pagination only to inflate pageviews.
- Do not show dead-end related links.
- Keep mobile bottom ads from covering download or workflow controls.

## Measurement

Track:
- pages/session by cluster.
- next-click rate from \`tool-growth-pathways\`.
- related-tool click-through rate.
- workflow-builder entry rate.
- result-panel sponsor CTR separate from internal next-step CTR.
- return visits to repeat-use tools.
`);

write('BUILD_NEXT_DECISIONS.md', `
# Build Next Decisions

Purpose: separate what OpenToolsKit should build now, later, and never. High volume is not enough.

## Build Now

Criteria:
- Product support is live or easy to add safely.
- Search intent maps to a real browser-side task.
- Monetization can happen after completion without degrading trust.
- Page can provide unique examples, edge cases, or troubleshooting value.

Build now list:
- Upgrade top PDF tools with stronger examples and internal task pathways.
- PDF troubleshooting pages: too large to upload, password protected, corrupted file, OCR not working, conversion output wrong.
- PDF comparisons: merge vs organize, split vs extract, compress vs linearize, redact vs remove metadata, encrypt vs password remove.
- PDF workflows: prepare upload PDF, clean document before sharing, convert scans to searchable PDF, make a signed PDF packet.
- Exact-KB image tools only after product support exists.

## Build Later

Criteria:
- Strong search opportunity, but product needs meaningful work first.
- Specs or requirements need maintenance.
- The cluster needs a hub and at least 5 real tools before support pages make sense.

Build later list:
- Passport/ID/application photo workflows.
- Metadata/SEO preview and launch tools.
- Social formatting tools with platform-specific preview behavior.
- Evergreen calculators and developer utilities selected for repeat use.
- Locale expansion beyond current live stack once canonical/hreflang and translation quality are verified.

## Never Build

Reject these even if query volume looks attractive:
- City/state/country doorway pages without verified maintained requirements.
- Exact-size pages for arbitrary numbers with no known upload use.
- Fake "best tool" or "top 10" pages without original testing.
- Pages for tools the product cannot perform.
- Low-value glossary pages that do not route to a task.
- Automated near-duplicate pages that swap only adjectives, speed claims, or free/no-signup modifiers.
- Schema-only pages where structured data says more than the visible page.

## Decision Matrix

| Factor | Build now | Build later | Never build |
| --- | --- | --- | --- |
| Product support | Live | Planned | Missing or unrealistic |
| Unique value | Clear task or failure mode | Clear but needs product/spec work | Keyword-only |
| Monetization relevance | Completion/result intent | Potential but unproven | Ad-first or misleading |
| Editorial burden | Maintained by tool behavior | Needs scheduled review | Unbounded maintenance |
| Technical feasibility | Existing route/template support | Requires new page system | Requires unsafe automation |
`);

write('SCALE_TECHNICAL_CHECKLIST.md', `
# Scale Technical Checklist

Purpose: verify technical SEO before publishing large numbers of pages.

## Canonicals

- Each indexable route has one canonical URL.
- Locale paths do not canonicalize incorrectly to another language.
- Root redirects and locale-prefixed routes do not create duplicate canonical variants.
- Trailing slash behavior matches \`next.config.js\`.

## Sitemaps

- Only indexable, canonical pages are included.
- New cluster routes are added only after the route is live and useful.
- Image sitemap entries are used only for meaningful task media, not decorative assets.
- Sitemap count and file size stay within platform limits.

## Robots and Noindex

- Draft, preview, unsupported, and thin routes are noindexed or absent.
- Internal search, generated filters, and parameter variants are not indexed.
- \`robots.txt\` aligns with sitemap location.

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

- No duplicate route families for \`/tools/*\` and \`/[locale]/tools/*\` unless canonical strategy is explicit.
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

- \`npm test\` focused suite passes.
- \`npx tsc --noEmit\` passes or all failures are documented as unrelated blockers.
- \`npm run build\` produces \`out/\`.
- Deployment environment has partner redirect secrets, not committed repo values.
- Production smoke test checks homepage, tools directory, top tool, and a result/download flow.
`);

write('10M_VIEWS_SCOREBOARD.md', `
# 10M Views Scoreboard

Purpose: track whether growth is becoming a healthy utility platform or just more pages.

## Core Metrics

| Metric | Current | 100K target | 500K target | 1M target | 3M target | 10M target |
| --- | --- | --- | --- | --- | --- | --- |
| Monthly pageviews | TBD | 100K | 500K | 1M | 3M | 10M |
| Monthly users | TBD | 45K-70K | 220K-330K | 450K-650K | 1.3M-1.9M | 4M-6M |
| Pages/session | TBD | 1.5 | 1.6-1.7 | 1.8 | 2.0 | 2.2 |
| Top 10 pages share | TBD | <45% | <35% | <28% | <22% | <15% |
| Long-tail share | TBD | >55% | >65% | >72% | >78% | >85% |
| Organic landing pages with traffic | TBD | 80+ | 220+ | 450+ | 900+ | 1,800+ |
| Indexed canonical pages | TBD | 100-150 | 250-350 | 500-750 | 1,000-1,500 | 2,000-3,000 |
| Percent pages with traffic | TBD | >55% | >60% | >65% | >70% | >75% |
| Top cluster by traffic | TBD | PDF | PDF/Image | PDF/Image | Mixed | Mixed |
| Top cluster by revenue | TBD | PDF | PDF/Image | PDF/Image | Mixed | Mixed |
| Query coverage progress | TBD | PDF core | PDF + image MVP | 3 clusters | 5 clusters | 6 clusters |
| Content quality issues | TBD | <10 open | <20 open | <30 open | <50 open | <80 open |
| Cannibalization alerts | TBD | 0 severe | <5 medium | <10 medium | <15 medium | <25 medium |

## Milestone Gates

### 100K Monthly Views

- PDF tool upgrades complete for top tools.
- Category hubs and task pathways are visible.
- At least 10 PDF troubleshooting/support pages exist.
- Pages/session reaches 1.5.

### 500K Monthly Views

- Exact-KB image/upload-limit tools are live before pages scale.
- Top image support pages have unique upload-limit value.
- PDF long-tail pages produce more than half of organic landings.

### 1M Monthly Views

- Three clusters produce meaningful traffic.
- Comparison and troubleshooting pages reduce tool-page cannibalization.
- More than 65% of indexed pages receive impressions and some traffic.

### 3M Monthly Views

- Five clusters have live tools and support pages.
- Cross-cluster workflows drive page depth without forced navigation.
- Technical SEO checks run before every large content batch.

### 10M Monthly Views

- Six clusters are mature, maintained, and product-backed.
- Long-tail traffic share is above 85%.
- Top 10 pages share is below 15%.
- Monetization remains completion-oriented and trust-preserving.

## Alert Rules

- If pages with traffic drop below 50%, pause expansion and prune/merge weak pages.
- If top 10 share rises above milestone threshold, strengthen hubs and support breadth.
- If cannibalization alerts grow, consolidate overlapping pages and update canonicals.
- If pages/session declines after ad changes, reduce ad density before adding more pages.
`);

const rows = [];
const add = (cluster, pageType, url, primary, secondary, intent, potential, monetization, risk, status, priority) => {
  rows.push({ cluster, pageType, url, primary, secondary, intent, potential, monetization, risk, status, priority });
};
const label = (slug) => slug.split('-').map((word) => {
  const acronyms = { pdf: 'PDF', jpg: 'JPG', png: 'PNG', ocr: 'OCR', webp: 'WEBP', svg: 'SVG', heic: 'HEIC' };
  return acronyms[word] || `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
}).join(' ');

const pdfTools = [
  'compress-pdf', 'merge-pdf', 'split-pdf', 'organize-pdf', 'jpg-to-pdf', 'pdf-to-jpg', 'edit-pdf', 'sign-pdf', 'encrypt-pdf', 'decrypt-pdf', 'ocr-pdf', 'crop-pdf', 'rotate-pdf', 'remove-metadata', 'sanitize-pdf', 'repair-pdf', 'flatten-pdf', 'pdf-to-docx', 'word-to-pdf', 'extract-pages', 'delete-pages', 'png-to-pdf', 'image-to-pdf', 'pdf-to-png', 'pdf-to-excel', 'excel-to-pdf', 'pdf-to-pptx', 'pptx-to-pdf', 'txt-to-pdf', 'json-to-pdf', 'pdf-to-json', 'pdf-to-markdown', 'add-watermark', 'page-numbers', 'header-footer', 'form-filler', 'form-creator', 'bookmark', 'table-of-contents', 'extract-images', 'add-attachments', 'extract-attachments', 'edit-metadata', 'view-metadata', 'compare-pdfs', 'linearize-pdf', 'fix-page-size', 'page-dimensions', 'remove-restrictions', 'digital-sign-pdf', 'validate-signature', 'find-and-redact', 'change-permissions', 'pdf-booklet', 'n-up-pdf', 'grid-combine', 'combine-single-page', 'reverse-pages', 'rotate-custom', 'deskew-pdf', 'alternate-merge', 'pdf-to-zip', 'pdf-to-tiff', 'pdf-to-svg', 'webp-to-pdf', 'svg-to-pdf', 'heic-to-pdf', 'tiff-to-pdf',
];
pdfTools.forEach((slug, index) => add('PDF workflows', 'tool', `/en/tools/${slug}`, label(slug).toLowerCase(), `${label(slug)} online|browser ${label(slug).toLowerCase()}|private ${label(slug).toLowerCase()}`, 'Complete one PDF task in the browser', 'High', 'High', index < 20 ? 'Low' : 'Medium', 'live - upgrade depth', 'P0'));
['organize-manage', 'optimize-repair', 'convert-to-pdf', 'convert-from-pdf', 'edit-annotate', 'secure-pdf'].forEach((cat) => add('PDF workflows', 'cluster-hub', `/en/tools/category/${cat}`, `${cat.replace(/-/g, ' ')} pdf tools`, `best ${cat.replace(/-/g, ' ')} pdf tools|pdf ${cat.replace(/-/g, ' ')} hub`, 'Route users to the right PDF task', 'High', 'High', 'Low', 'live - strengthen hub copy', 'P0'));

[
  'pdf-too-large-to-upload', 'pdf-password-protected-cant-edit', 'pdf-conversion-output-looks-wrong', 'scanned-pdf-text-not-selectable', 'pdf-file-corrupted', 'pdf-pages-wrong-size', 'pdf-metadata-still-visible', 'pdf-upload-rejected', 'pdf-annotations-not-showing', 'pdf-form-fields-not-fillable', 'pdf-signature-invalid', 'pdf-bookmarks-missing', 'pdf-images-too-low-quality', 'pdf-slow-to-open', 'pdf-permissions-block-printing', 'pdf-redaction-not-secure', 'pdf-page-order-wrong', 'pdf-ocr-language-issues', 'pdf-attachment-not-visible', 'pdf-too-many-pages',
].forEach((slug) => add('PDF workflows', 'troubleshooting', `/en/guides/${slug}`, slug.replace(/-/g, ' '), `${slug.replace(/-/g, ' ')} fix|why ${slug.replace(/-/g, ' ')}`, 'Diagnose a PDF failure and route to the right tool', 'High', 'High', 'Low', 'planned - route required', 'P1'));
[
  'compress-pdf-vs-linearize-pdf', 'split-pdf-vs-extract-pages', 'merge-pdf-vs-organize-pdf', 'redact-pdf-vs-remove-metadata', 'encrypt-pdf-vs-change-permissions', 'jpg-to-pdf-vs-image-to-pdf', 'pdf-to-jpg-vs-extract-images', 'ocr-pdf-vs-pdf-to-docx', 'flatten-pdf-vs-sanitize-pdf', 'crop-pdf-vs-fix-page-size', 'rotate-pdf-vs-rotate-custom', 'pdf-booklet-vs-n-up-pdf', 'delete-pages-vs-remove-blank-pages', 'form-filler-vs-form-creator', 'digital-sign-pdf-vs-sign-pdf', 'repair-pdf-vs-sanitize-pdf', 'pdf-to-excel-vs-pdf-to-csv', 'word-to-pdf-vs-rtf-to-pdf', 'png-to-pdf-vs-jpg-to-pdf', 'pdf-multi-tool-vs-organize-pdf',
].forEach((slug) => add('PDF workflows', 'comparison', `/en/guides/${slug}`, slug.replace(/-/g, ' '), `${slug.replace(/-/g, ' or ')}|which pdf tool should i use`, 'Choose the correct adjacent PDF tool', 'Medium', 'High', 'Medium', 'planned - route required', 'P1'));
[
  'pdf-file-size-limit-guide', 'pdf-page-size-guide', 'pdf-password-permissions-guide', 'pdf-metadata-fields-guide', 'pdf-ocr-language-guide', 'pdf-image-quality-guide', 'pdf-signature-validation-guide', 'pdf-a-vs-standard-pdf', 'pdf-form-field-compatibility', 'pdf-attachment-compatibility', 'pdf-compression-settings-guide', 'pdf-redaction-safety-checklist', 'pdf-bookmark-structure-guide', 'pdf-print-ready-size-guide', 'pdf-mobile-upload-checklist',
].forEach((slug) => add('PDF workflows', 'spec', `/en/guides/${slug}`, slug.replace(/-/g, ' '), `${slug.replace(/-/g, ' ')} pdf|pdf requirements`, 'Understand a maintained PDF requirement before using a tool', 'Medium', 'Medium', 'Low', 'planned - editorial required', 'P2'));
[
  'prepare-pdf-for-upload', 'clean-pdf-before-sharing', 'make-scanned-pdf-searchable', 'combine-images-into-pdf-packet', 'create-signed-pdf-packet', 'compress-and-split-large-pdf', 'redact-and-flatten-pdf', 'convert-office-files-to-pdf', 'extract-pdf-pages-and-images', 'organize-repair-secure-pdf',
].forEach((slug) => add('PDF workflows', 'workflow', `/en/workflows/${slug}`, slug.replace(/-/g, ' '), `${slug.replace(/-/g, ' ')} workflow|how to ${slug.replace(/-/g, ' ')}`, 'Complete a multi-step PDF job', 'High', 'High', 'Low', 'planned - route required', 'P1'));

[20, 30, 40, 50, 60, 80, 100, 150, 200, 250, 300, 500].forEach((size) => add('Exact-KB image and upload-limit fixes', 'tool', `/tools/compress-image-to-${size}kb`, `compress image to ${size}kb`, `make photo under ${size}kb|reduce jpg to ${size}kb|compress png to ${size}kb`, 'Hit a common exact upload-size limit', 'High', 'High', [20, 50, 100, 200].includes(size) ? 'Low' : 'Medium', 'planned - build image compressor first', 'P1'));
[
  'signature-image-too-large', 'photo-rejected-by-application-form', 'profile-photo-upload-failed', 'image-too-large-for-portal', 'scan-photo-too-large', 'jpg-too-large-for-online-form', 'png-file-too-large', 'make-photo-under-upload-limit', 'resize-image-for-email', 'reduce-photo-without-blur', 'compress-image-for-school-form', 'compress-image-for-job-application', 'compress-image-for-government-portal', 'image-dimensions-too-large', 'convert-photo-to-jpg-for-upload', 'fix-heic-photo-upload', 'transparent-png-upload-issue', 'image-aspect-ratio-rejected', 'mobile-photo-file-too-large', 'batch-compress-application-images',
].forEach((slug) => add('Exact-KB image and upload-limit fixes', slug.includes('too') || slug.includes('failed') || slug.includes('rejected') ? 'troubleshooting' : 'use-case', `/guides/${slug}`, slug.replace(/-/g, ' '), `${slug.replace(/-/g, ' ')} fix|${slug.replace(/-/g, ' ')} tool`, 'Fix a real image upload problem', 'High', 'High', 'Low', 'planned - build image tools first', 'P1'));
['image-upload-limit-guide', 'jpg-vs-png-for-upload', 'image-dpi-vs-pixel-size', 'photo-file-size-vs-dimensions', 'common-application-photo-limits', 'image-compression-quality-guide', 'webp-vs-jpg-upload-compatibility', 'signature-image-size-guide', 'profile-photo-size-guide', 'browser-image-processing-privacy'].forEach((slug) => add('Exact-KB image and upload-limit fixes', 'spec', `/guides/${slug}`, slug.replace(/-/g, ' '), `${slug.replace(/-/g, ' ')}|image upload requirements`, 'Explain upload requirements and route to image tools', 'Medium', 'Medium', 'Low', 'planned - editorial required', 'P2'));
['compress-jpg-vs-resize-image', 'compress-png-vs-convert-to-jpg', 'crop-image-vs-resize-image', 'reduce-file-size-vs-reduce-dimensions', 'webp-vs-jpg-for-forms', 'exact-kb-compression-vs-quality'].forEach((slug) => add('Exact-KB image and upload-limit fixes', 'comparison', `/guides/${slug}`, slug.replace(/-/g, ' '), `${slug.replace(/-/g, ' or ')}|which image fix`, 'Choose the right image repair method', 'Medium', 'Medium', 'Medium', 'planned - build image tools first', 'P2'));

['passport-photo-maker', 'white-background-photo-tool', 'id-photo-cropper', 'application-photo-maker', 'visa-photo-resizer', '2x2-photo-maker', '35x45mm-photo-tool', 'signature-photo-maker', 'student-id-photo-tool', 'job-application-photo-tool', 'photo-for-online-form', 'crop-face-centered-photo', 'printable-passport-photo-sheet', 'mobile-passport-photo-check', 'document-photo-background', 'application-photo-upload-prep'].forEach((slug) => add('Passport, ID, and application photo workflows', 'tool', `/tools/${slug}`, slug.replace(/-/g, ' '), `${slug.replace(/-/g, ' ')} online|private ${slug.replace(/-/g, ' ')}`, 'Prepare an identity or application photo', 'High', 'High', 'Medium', 'planned - build photo tools first', 'P2'));
['passport-photo-size-guide', 'id-photo-aspect-ratio-guide', 'white-background-photo-guide', 'application-photo-rejected', 'face-too-small-in-photo', 'photo-background-not-white', 'photo-too-dark-for-id', 'photo-file-size-too-large', 'print-passport-photo-sheet', 'online-form-photo-requirements', 'signature-photo-requirements', 'student-id-photo-requirements', 'visa-photo-upload-failed', 'head-size-photo-guide', 'passport-photo-dimensions-mm'].forEach((slug) => add('Passport, ID, and application photo workflows', slug.includes('failed') || slug.includes('rejected') || slug.includes('too') ? 'troubleshooting' : 'spec', `/guides/${slug}`, slug.replace(/-/g, ' '), `${slug.replace(/-/g, ' ')}|id photo requirements`, 'Fix or understand identity photo requirements', 'Medium', 'High', 'Medium', 'planned - verified specs required', 'P2'));
['passport-photo-vs-id-photo', 'crop-photo-vs-resize-photo', 'white-background-vs-transparent-background', '2x2-photo-vs-35x45mm-photo', 'online-passport-photo-vs-print-sheet', 'signature-photo-vs-id-photo'].forEach((slug) => add('Passport, ID, and application photo workflows', 'comparison', `/guides/${slug}`, slug.replace(/-/g, ' '), `${slug.replace(/-/g, ' or ')}|which photo tool`, 'Prevent wrong photo-prep path', 'Medium', 'Medium', 'Medium', 'planned - verified specs required', 'P3'));

['meta-title-checker', 'meta-description-checker', 'og-preview', 'twitter-card-preview', 'robots-txt-builder', 'sitemap-generator', 'slug-generator', 'canonical-url-checker', 'schema-helper', 'favicon-checker', 'social-preview-checker', 'hreflang-checker', 'structured-data-validator', 'page-title-length-checker', 'metadata-cleanup-tool'].forEach((slug) => add('Metadata, SEO, and publishing launch tools', 'tool', `/tools/${slug}`, slug.replace(/-/g, ' '), `${slug.replace(/-/g, ' ')} online|preview ${slug.replace(/-/g, ' ')}`, 'Check or generate publishing metadata', 'Medium', 'Medium', 'Medium', 'planned - build checker first', 'P2'));
['page-title-too-long', 'meta-description-too-short', 'og-image-not-showing', 'twitter-card-not-updating', 'robots-txt-blocking-google', 'sitemap-not-indexed', 'canonical-url-conflict', 'schema-markup-not-valid', 'favicon-not-showing', 'social-preview-wrong-image', 'hreflang-conflict', 'page-not-in-sitemap', 'metadata-launch-checklist', 'open-graph-image-size-guide', 'robots-txt-template-guide', 'sitemap-index-guide', 'canonical-vs-redirect-guide', 'slug-best-practices', 'structured-data-visibility-guide', 'technical-seo-launch-workflow'].forEach((slug) => add('Metadata, SEO, and publishing launch tools', slug.includes('not') || slug.includes('too') || slug.includes('conflict') || slug.includes('blocking') ? 'troubleshooting' : 'guide', `/guides/${slug}`, slug.replace(/-/g, ' '), `${slug.replace(/-/g, ' ')}|seo launch check`, 'Fix or prepare publishing metadata', 'Medium', 'Medium', 'Low', 'planned - build checker first', 'P2'));

['instagram-line-breaks', 'instagram-bio-formatter', 'tiktok-caption-cleaner', 'youtube-description-formatter', 'linkedin-post-formatter', 'hashtag-cleanup', 'twitter-thread-splitter', 'caption-character-counter', 'emoji-spacing-cleanup', 'social-text-line-breaks', 'youtube-title-checker', 'pinterest-description-formatter', 'facebook-post-formatter', 'bio-link-text-cleaner', 'caption-to-bullets'].forEach((slug) => add('Social formatting and publishing cleanup', 'tool', `/tools/${slug}`, slug.replace(/-/g, ' '), `${slug.replace(/-/g, ' ')} online|format ${slug.replace(/-/g, ' ')}`, 'Clean publishing text before posting', 'Medium', 'Medium', 'Medium', 'planned - build formatter first', 'P3'));
['instagram-line-breaks-not-working', 'bio-text-loses-formatting', 'tiktok-caption-too-long', 'youtube-description-links-format', 'linkedin-post-spacing-guide', 'hashtag-spacing-guide', 'caption-character-limit-guide', 'remove-extra-spaces-from-caption', 'normalize-smart-quotes-for-social', 'social-publishing-checklist', 'youtube-title-length-guide', 'instagram-bio-character-limit', 'tiktok-caption-character-limit', 'linkedin-post-line-breaks', 'social-preview-copy-cleanup'].forEach((slug) => add('Social formatting and publishing cleanup', slug.includes('not') || slug.includes('too') || slug.includes('loses') ? 'troubleshooting' : 'guide', `/guides/${slug}`, slug.replace(/-/g, ' '), `${slug.replace(/-/g, ' ')}|social formatting`, 'Fix platform text formatting', 'Medium', 'Low', 'Low', 'planned - build formatter first', 'P3'));

['age-calculator', 'date-difference-calculator', 'percentage-calculator', 'word-counter', 'character-counter', 'unit-converter', 'json-formatter', 'base64-decode', 'base64-encode', 'url-encode', 'url-decode', 'uuid-generator', 'hash-generator', 'timestamp-converter', 'color-converter', 'regex-tester', 'csv-to-json', 'json-to-csv', 'markdown-preview', 'text-diff-checker'].forEach((slug) => add('Evergreen calculators and light dev utilities', 'tool', `/tools/${slug}`, slug.replace(/-/g, ' '), `${slug.replace(/-/g, ' ')} online|private ${slug.replace(/-/g, ' ')}`, 'Repeat-use calculator or developer utility', 'High', 'Medium', 'High', 'planned - build utility first', 'P3'));
['json-formatting-errors', 'base64-decode-invalid-input', 'url-encoding-vs-decoding', 'uuid-v4-vs-v7', 'sha256-vs-md5-hash', 'unix-timestamp-conversion-guide', 'word-count-vs-character-count', 'percentage-change-vs-percentage-of', 'date-difference-business-days', 'csv-json-conversion-issues', 'regex-test-cases-guide', 'markdown-preview-safety', 'color-hex-rgb-hsl-guide', 'text-diff-workflow', 'calculator-privacy-guide'].forEach((slug) => add('Evergreen calculators and light dev utilities', slug.includes('vs') ? 'comparison' : 'guide', `/guides/${slug}`, slug.replace(/-/g, ' '), `${slug.replace(/-/g, ' ')}|developer utility guide`, 'Support repeat-use utility workflows', 'Medium', 'Low', 'Medium', 'planned - build utility first', 'P3'));

const variantTemplates = {
  tool: ['private {q}', '{q} without uploading files', 'browser-based {q}'],
  'cluster-hub': ['best {q}', '{q} by task', '{q} directory'],
  'use-case': ['{q} walkthrough', '{q} tool', '{q} in browser'],
  troubleshooting: ['fix {q}', 'why {q}', '{q} solution'],
  comparison: ['{q} which one to use', '{q} differences', 'choose between {q}'],
  spec: ['{q} requirements', '{q} checklist', '{q} explained'],
  workflow: ['how to {q}', '{q} steps', '{q} checklist'],
  collection: ['{q} collection', '{q} toolkit', '{q} workflow'],
  guide: ['{q} guide', '{q} checklist', 'how to fix {q}'],
  glossary: ['what is {q}', '{q} meaning', '{q} explained'],
};

const initialRows = rows.slice();
const seenQueryUrls = new Set(rows.map((row) => `${row.url}|${row.primary}`));
let variantIndex = 0;
while (rows.length < 500 && variantIndex < initialRows.length * 3) {
  const row = initialRows[variantIndex % initialRows.length];
  const templates = variantTemplates[row.pageType] || variantTemplates.guide;
  const template = templates[Math.floor(variantIndex / initialRows.length) % templates.length];
  const primary = template.replace('{q}', row.primary);
  const key = `${row.url}|${primary}`;

  if (!seenQueryUrls.has(key)) {
    seenQueryUrls.add(key);
    add(
      row.cluster,
      row.pageType,
      row.url,
      primary,
      `${row.primary}|${row.secondary}`,
      row.intent,
      row.potential,
      row.monetization,
      row.risk,
      `query target - same canonical page; ${row.status}`,
      row.priority,
    );
  }

  variantIndex += 1;
}

const headers = ['cluster', 'page type', 'URL', 'primary query', 'secondary queries', 'search intent', 'traffic potential bucket', 'monetization relevance', 'cannibalization risk', 'content status', 'implementation priority'];
const escapeCsv = (value) => `"${String(value).replace(/"/g, '""')}"`;
const csv = [headers.map(escapeCsv).join(',')]
  .concat(rows.slice(0, 500).map((row) => [row.cluster, row.pageType, row.url, row.primary, row.secondary, row.intent, row.potential, row.monetization, row.risk, row.status, row.priority].map(escapeCsv).join(',')))
  .join('\n');
write('QUERY_TO_PAGE_MODEL.csv', csv);

const top500Rows = rows.slice(0, 500).map((row, index) => `| ${index + 1} | ${row.cluster} | ${row.pageType} | \`${row.url}\` | ${row.primary} | ${row.status} | ${row.priority} |`).join('\n');
write('TOP_500_QUERY_EXPANSION_PLAN.md', `
# Top 500 Query Expansion Plan

This is a build-toward query model, not permission to publish 500 pages immediately. Rows marked as planned or requiring product work must not become indexable until the matching tool, support content, canonical handling, and internal links exist. Repeated target URLs are intentional when multiple query targets should consolidate into one canonical page.

Quality rules:
- Prefer fewer stronger pages over more weaker pages.
- Do not publish arbitrary number variants.
- Do not publish non-PDF clusters until product support exists.
- Use \`SAFE_SCALE_RULES.md\` before any batch enters production.

| # | Cluster | Page type | Target URL | Primary query | Status | Priority |
| --- | --- | --- | --- | --- | --- | --- |
${top500Rows}
`);

console.log(`Generated ${rows.length} query targets; wrote Phase 4 artifacts.`);
