# OpenToolsKit Monetization Deploy Checklist

Date: 2026-04-17

## Build configuration

- AdSense review mode is temporarily enabled by default in code and should be explicit in Cloudflare as `NEXT_PUBLIC_ADSENSE_REVIEW_MODE=true`.
- While review mode is on, Adsterra display/native, Popunder, Social Bar, Zeydoo partner redirects, sponsor previews, and timed gates are intentionally disabled.
- `NEXT_PUBLIC_OTK_HARD_GATE_ENABLED=false` until live ad runtime verification is complete.
- `PARTNER_REDIRECT_SOURCE=opentoolskit`.
- `PARTNER_REDIRECT_BASE_URL` set as a Cloudflare secret.
- `ZEYDOO_BASE_URL` may remain for one-release backward compatibility only.
- Real inline rail/leaderboard ads require separate Adsterra Banner/Display zones:
  - `NEXT_PUBLIC_ADSTERRA_LEFT_RAIL_SCRIPT_SRC`
  - `NEXT_PUBLIC_ADSTERRA_LEFT_RAIL_AT_OPTIONS`
  - `NEXT_PUBLIC_ADSTERRA_RIGHT_RAIL_SCRIPT_SRC`
  - `NEXT_PUBLIC_ADSTERRA_RIGHT_RAIL_AT_OPTIONS`
  - `NEXT_PUBLIC_ADSTERRA_LEADERBOARD_SCRIPT_SRC`
  - `NEXT_PUBLIC_ADSTERRA_LEADERBOARD_AT_OPTIONS`
  - `NEXT_PUBLIC_ADSTERRA_RECTANGLE_SCRIPT_SRC`
  - `NEXT_PUBLIC_ADSTERRA_RECTANGLE_AT_OPTIONS`
  - `NEXT_PUBLIC_ADSTERRA_MOBILE_STICKY_SCRIPT_SRC`
  - `NEXT_PUBLIC_ADSTERRA_MOBILE_STICKY_AT_OPTIONS`
  - optional tablet/narrow inline unit: `NEXT_PUBLIC_ADSTERRA_468X60_SCRIPT_SRC` and `NEXT_PUBLIC_ADSTERRA_468X60_AT_OPTIONS`.
- Display/banner zones are env-only in source. If a display env pair is missing or invalid, that placement does not render and does not fall back to a fake sponsor card.
- Do not paste Popunder, Social Bar, Native Banner, or Zeydoo smartlink URLs into display-banner variables. Those formats do not render inline Opera-style creatives in side rails.
- Do not commit Adsterra API keys, partner destination URLs, dashboard links, or personal identifiers.
- Do not set `Cross-Origin-Embedder-Policy` globally while Adsterra is enabled.

## Cloudflare checks

- Canonical host is `https://www.opentoolskit.com`.
- `https://opentoolskit.com/*` redirects to `https://www.opentoolskit.com/*`.
- `/ads.txt` serves `google.com, pub-7143107898355663, DIRECT, f08c47fec0942fa0` as plain text.
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
- If display/banner zones are configured, `display_banner_mount_attempted` appears for configured slots such as `leftRail`, `rightRail`, `leaderboard`, `rectangle`, `mobileSticky`, or `banner468x60`.
- If display/banner zones are not configured, those placements intentionally collapse instead of showing empty boxes or first-party sponsor-card stand-ins.
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
