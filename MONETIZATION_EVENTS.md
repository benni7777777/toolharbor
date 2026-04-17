# OpenToolsKit Monetization Events

Date: 2026-04-17

## Runtime debug objects

| Object | Purpose |
| --- | --- |
| `window.__OTK_MONETIZATION_DEBUG__` | Stores monetization analytics events pushed by `trackMonetizationEvent`. |
| `window.__OTK_ADSTERRA_RUNTIME__` | Stores Adsterra runtime registrations, selected native slot, and script/runtime events. |

Verbose console logging is enabled in development or with:

`?otk_monetization_debug=1`

Aggressive preview testing is enabled with:

`?otk_monetization_preview=aggressive`

## Event names

| Event | Meaning |
| --- | --- |
| `gate_shown` | Hard gate opened. Disabled by default unless feature flag is on. |
| `gate_timer_started` | Hard gate countdown started. |
| `gate_timer_complete` | Legacy timer completion event kept for compatibility. |
| `gate_timer_completed` | Hard gate countdown reached zero. |
| `gate_unlocked_by_timer` | Hard gate unlocked by timer. |
| `gate_unlocked_by_partner_click` | Partner CTA unlocked the hard gate. |
| `partner_click` | Legacy partner-click event kept for compatibility. |
| `partner_click_triggered` | Partner CTA click occurred. |
| `partner_redirect_success` | Reserved for server/edge redirect success instrumentation. |
| `partner_redirect_failure` | Reserved for server/edge redirect failure instrumentation. |
| `native_impression` | Legacy native impression event kept for compatibility. |
| `native_banner_mount_attempted` | Native runtime attempted to mount the real Adsterra script. |
| `native_banner_rendered` | Native container was populated. |
| `native_banner_failed` | Native script failed or timed out without fill. |
| `popunder_injected` | Legacy popunder injected event kept for compatibility. |
| `popunder_triggered` | Popunder script was injected from an allowed click path. |
| `socialbar_injected` | Legacy socialbar injected event kept for compatibility. |
| `socialbar_triggered` | Social Bar script was injected under cooldown rules. |
| `download_unlocked` | Download became available by timer, partner, bypass, or fallback. |
| `gate_abandon` | User dismissed an unlocked gate without using the gate download action. |
| `monetization_blocked_reason` | A monetization action was intentionally blocked. |

## Common blocked reasons

| Reason | Meaning |
| --- | --- |
| `uk-eea-native-only` | Aggressive units restricted until consent support exists. |
| `preview-off` | Monetization preview override disabled ad pressure. |
| `cooldown` | Local/session cooldown blocked repeat firing. |
| `duplicate-native-zone` | Another native slot won the one-per-page arbitration. |
| `script-error` | Third-party script failed to load. |
| `blocked-timeout` | Native container was not populated before timeout. |
| `missing-secret` | Partner redirect secret missing server-side. |
| `hard-gate-disabled` | Hard gate feature flag is off. |
| `passive-popunder-disabled` | Passive/page-load popunder request was blocked. |
| `untrusted-event` | Popunder was requested without a trusted user action. |

## Payload shape

```ts
{
  event: 'otk_monetization',
  monetizationEvent: string,
  route: string,
  sessionId: string,
  timestamp: number,
  placement?: string,
  provider?: string,
  tool?: string,
  country?: string,
  reason?: string,
  status?: string,
  unlockReason?: 'timer' | 'partner' | 'bypass' | 'fallback',
  metadata?: Record<string, unknown>
}
```

