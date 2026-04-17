# OpenToolsKit Monetization Failsafes

Date: 2026-04-17

## Failsafe matrix

| Failure mode | Detection | User-facing outcome |
| --- | --- | --- |
| Native script blocked | Script error or no container population before timeout | Native host is marked failed/no-fill and the core tool flow continues. |
| Duplicate native placement | Runtime sees multiple native hosts for one native code | Highest-priority host wins; all lower-priority hosts are blocked with `duplicate-native-zone`. |
| Adsterra no-fill | Native container remains empty after timeout | Event `native_banner_failed` with reason `blocked-timeout`; no download impact. |
| Popunder called without trusted event | No click/tap event passed | Popunder is not injected; event `monetization_blocked_reason` with `untrusted-event`. |
| Popunder cooldown active | Local/session cooldown hit | Popunder is not injected; no user disruption. |
| Social Bar cooldown active | Local/session cooldown hit | Social Bar is not injected; no user disruption. |
| UK/EEA aggressive units restricted | Monetization profile returns UK/EEA unless preview override is active | Native units can render; hard gate, popunder, and social bar stay off. |
| Hard gate not verified | `NEXT_PUBLIC_OTK_HARD_GATE_ENABLED` missing or false | Soft post-result drawer is used by default. |
| Missing partner redirect secret | Worker cannot read `PARTNER_REDIRECT_BASE_URL` or `ZEYDOO_BASE_URL` | Worker redirects to safe fallback support page with no secret exposure. |
| Invalid partner placement | `/go/*` placement not in allowlist | Worker redirects to safe fallback support page. |
| Raw partner URL leak attempt | Source/build search | Direct partner destination is not present in source or public config. |

## UX guardrails

- Ads are not injected inside upload controls, drag/drop zones, processing progress, or result previews.
- Result/download monetization uses the soft drawer by default.
- The hard gate remains available for later controlled rollout but is disabled by default.
- Popunder is click-triggered and capped.
- Social Bar is capped.
- Native Banner is labeled as sponsored and separated from core actions.

