# Safe Scale Rules

Purpose: prevent OpenToolsKit from becoming a doorway or thin-page site while still allowing durable query expansion.

References used for guardrails:
- Google Search Central, helpful people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google Search Central, canonical URLs: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google Search Central, sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- Google Search Central, BreadcrumbList markup: https://developers.google.com/search/docs/appearance/structured-data/breadcrumb

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

The code-level scoring helper lives in `src/lib/growth/clusters.ts` as `scoreScaleCandidate`. It is intentionally conservative: unsupported or indistinct candidates return `reject`, not `publish`.

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

- `/en/guides/pdf-too-large-to-upload`: distinct failure mode, links to compress PDF, split PDF, and optimize/repair hub.
- `/tools/compress-image-to-50kb`: acceptable only after an image compressor exists and the page explains common 50KB upload limits, dimensions, formats, and failure cases.
- `/guides/merge-pdf-vs-combine-single-page`: comparison clarifies different outcomes and links to both tools.

## Examples: Reject

- `/tools/compress-image-to-51kb`: arbitrary size with no unique requirement.
- `/tools/best-pdf-tool-online`: vague, unsupported, and cannibalizes the directory.
- `/guides/passport-photo-usa-canada-uk-australia-every-country`: unmaintainable and likely inaccurate unless backed by verified specs.
- `/tools/merge-pdf-fast-free-online-no-signup`: keyword stuffing around the existing merge PDF page.

## Publication Workflow

1. Confirm the product can solve or support the task.
2. Score the candidate using the safe-scale criteria.
3. Assign a cluster, page type, canonical URL, and internal-link role.
4. Write visible user-first content with examples and next actions.
5. Add structured data only for visible entities and page types.
6. Add to sitemap only after canonical and noindex rules are verified.
7. Monitor Search Console for cannibalization after launch.
