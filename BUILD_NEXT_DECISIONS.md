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
