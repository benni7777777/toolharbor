# OpenToolsKit Monetization Deploy Checklist

Date: 2026-04-17

## Build configuration

- `NEXT_PUBLIC_OTK_HARD_GATE_ENABLED=false` until live ad runtime verification is complete.
- `PARTNER_REDIRECT_SOURCE=opentoolskit`.
- `PARTNER_REDIRECT_BASE_URL` set as a Cloudflare secret.
- `ZEYDOO_BASE_URL` may remain for one-release backward compatibility only.
- Real inline rail/leaderboard ads require separate Adsterra Banner/Display zones:
  - `NEXT_PUBLIC_ADSTERRA_LEFT_RAIL_SCRIPT_SRC`
  - `NEXT_PUBLIC_ADSTERRA_LEFT_RAIL_AT_OPTIONS`
  - `NEXT_PUBLIC_ADSTERRA_RIGHT_RAIL_SCRIPT_SRC`
  - `NEXT_PUBLIC_ADSTERRA_RIGHT_RAIL_AT_OPTIONS`
  - optional `NEXT_PUBLIC_ADSTERRA_LEADERBOARD_*`, `NEXT_PUBLIC_ADSTERRA_RECTANGLE_*`, and `NEXT_PUBLIC_ADSTERRA_MOBILE_STICKY_*`.
- Do not paste Popunder, Social Bar, Native Banner, or Zeydoo smartlink URLs into display-banner variables. Those formats do not render inline Opera-style creatives in side rails.
- Do not commit Adsterra API keys, partner destination URLs, dashboard links, or personal identifiers.
- Do not set `Cross-Origin-Embedder-Policy` globally while Adsterra is enabled.

## Cloudflare checks

- Pages output directory remains `out`.
- Functions directory is uploaded.
- `/api/monetization/context` returns Cloudflare country and UK/EEA status.
- `/go/post-result-primary` returns a 302 redirect with `Cache-Control: no-cache, no-store, max-age=0`.
- Rocket Loader must not rewrite monetization scripts; runtime scripts use `data-cfasync="false"`.
- Production responses must not include global `Cross-Origin-Embedder-Policy`; keep the Cloudflare response-header transform that removes it until verified absent.

## Post-deploy runtime checks

Open:

`https://www.opentoolskit.com/?otk_monetization_debug=1&otk_monetization_preview=aggressive`

Verify:

- One native banner script exists per page.
- One native container ID exists per page.
- If display/banner zones are configured, `display_banner_mount_attempted` appears for `leftRail` and `rightRail`.
- If display/banner zones are not configured, side rails intentionally fall back to first-party partner CTA cards.
- `native_banner_mount_attempted` appears in debug events.
- `native_banner_rendered` appears if Adsterra fills the placement.
- If no creative appears, `native_banner_failed` or runtime no-fill state is visible.
- Popunder only fires after a real click and only once per 12 hours/session.
- Popunder script insertion happens before the synthetic download anchor on result/download clicks.
- Social Bar only fires once per 12 hours/session on allowed surfaces.
- Result/download flow shows the soft drawer by default.
- Hard gate does not appear unless `NEXT_PUBLIC_OTK_HARD_GATE_ENABLED=true`.
- Partner CTA opens `/go/post-result-primary...` and does not expose the raw destination in page source.

## Hard gate rollout rule

Only enable `NEXT_PUBLIC_OTK_HARD_GATE_ENABLED=true` after all of these are verified live:

- Native Banner script request is made.
- Native Banner either renders or logs a clear no-fill/blocked state.
- Popunder fires only from trusted click paths.
- Social Bar obeys cooldown.
- Partner redirect works with the Cloudflare secret.
- Blocked ad scripts do not break download flow.
