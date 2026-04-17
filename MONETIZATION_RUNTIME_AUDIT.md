# OpenToolsKit Monetization Runtime Audit

Date: 2026-04-17

## Scope

This repair pass audited the live monetization code paths for Adsterra Native Banner, Popunder, Social Bar, the post-result sponsor drawer, the optional hard result gate, and the Cloudflare Pages partner redirect at `/go/*`.

## Findings

| Surface | Finding | Fix applied |
| --- | --- | --- |
| Native Banner | The UI could render sponsor shells without proving that the real Adsterra script mounted, loaded, or populated the required container. Multiple placements also risked duplicate use of the one available native code. | Added a dedicated client runtime with priority arbitration. It creates exactly one real native slot per page, preserves `container-13abb80829d1e16b339d390deb70c6a5`, injects the script after mount, and records loaded/rendered/timeout/failure states. |
| Popunder | The previous session component could be used passively from page load. Popunders need trusted user actions to work reliably and avoid spam behavior. | Popunder now requires a trusted click event. Result/download clicks are the primary trigger, with tool-card discovery clicks as fallback. Cooldown remains one per 12 hours plus once per session. |
| Social Bar | Social Bar had basic script injection but weak state reporting. | Social Bar now uses the shared runtime, applies `data-cfasync="false"`, records trigger/load/error events, and respects the 12-hour/session cap. |
| Result flow | The hard gate was profile-driven and could appear before runtime verification was complete. | Hard gate is retained but feature-flagged behind `NEXT_PUBLIC_OTK_HARD_GATE_ENABLED=true`. Default production behavior is the soft post-result drawer. |
| Partner redirect | `/go/*` redirected through the worker but did not validate placement names or set explicit no-cache redirect headers. | Added placement allowlisting, preferred `PARTNER_REDIRECT_BASE_URL`, legacy `ZEYDOO_BASE_URL` support, safe fallback, and `302` responses with `Cache-Control: no-cache, no-store, max-age=0`. |
| Observability | There was no durable debug object for checking runtime events in production. | Added `window.__OTK_MONETIZATION_DEBUG__`, `getMonetizationDebugSnapshot()`, and debug console output in development or with `?otk_monetization_debug=1`. |

## Runtime model

The site now treats the current Adsterra Native Banner code as one real native unit per page. If several UI placements request it, the runtime chooses the highest-priority live host:

1. Result gate
2. Result drawer
3. Tool page
4. Tools hub
5. Category hub
6. Homepage
7. Trust/info pages

Lower-priority native hosts are blocked with reason `duplicate-native-zone` and do not create duplicate container IDs or duplicate invoke scripts.

## Remaining uncertainty

The code can verify script insertion, events, timeout handling, and DOM population behavior. It cannot force Adsterra to return creatives when a browser extension, DNS filter, tracking protection, regional no-fill, or Adsterra account-side setting blocks delivery. Live production verification should be done in normal Chrome or Edge with extensions off using:

`https://www.opentoolskit.com/?otk_monetization_debug=1&otk_monetization_preview=aggressive`

## Hard gate status

The 15-second hard gate is implemented but disabled by default. Enable only after live verification:

`NEXT_PUBLIC_OTK_HARD_GATE_ENABLED=true`

