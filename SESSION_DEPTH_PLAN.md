# Session Depth Plan

Purpose: increase pages/session without turning the product into an ad maze. Session depth should come from better task routing, not forced pagination.

## Baseline

Current analytics baseline is not committed to the repo. Treat baseline as unknown until production analytics are reviewed. Track by cluster, landing page type, device, and monetization eligibility.

## Target: 1.5 Pages Per Session

Build now:
- Add cluster-aware task pathways on tool pages. Implemented in `src/components/seo/GrowthPathways.tsx`.
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
- next-click rate from `tool-growth-pathways`.
- related-tool click-through rate.
- workflow-builder entry rate.
- result-panel sponsor CTR separate from internal next-step CTR.
- return visits to repeat-use tools.
