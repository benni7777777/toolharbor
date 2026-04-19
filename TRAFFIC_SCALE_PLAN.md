# OpenToolsKit Traffic Scale Plan

Purpose: define a realistic path from the current PDF-heavy utility surface to a multi-cluster utility platform that can earn 10M monthly pageviews without doorway pages, hidden content, or low-value scaled pages.

References used for guardrails:
- Google Search Central, helpful people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google Search Central, canonical URLs: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google Search Central, sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- Google Search Central, BreadcrumbList markup: https://developers.google.com/search/docs/appearance/structured-data/breadcrumb

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
- Programmatic publishing is allowed only through the safe-scale gate in `SAFE_SCALE_RULES.md`.

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
