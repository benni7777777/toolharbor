# OpenToolsKit Ad Runtime Verification

Date: 2026-04-17

## Verification summary

| Check | Status | Evidence |
| --- | --- | --- |
| Native Banner uses real Adsterra code | Pass in code/test | Runtime injects `https://pl29133190.profitablecpmratenetwork.com/13abb80829d1e16b339d390deb70c6a5/invoke.js` and creates the exact container ID. |
| Native Banner one-per-page arbitration | Pass in unit test | Duplicate native placements create one script and one container; lower-priority hosts are marked `blocked`. |
| Native Banner render detection | Pass in unit test | DOM population of the container moves host status to `rendered`. |
| Native Banner blocked/no-fill detection | Pass in unit test | Empty container after timeout moves status to `no-fill-timeout`. |
| Popunder trusted click requirement | Pass in unit test | Missing event is blocked; trusted test click injects one script; second trigger is capped. |
| Popunder timing on result download | Pass in component test | The popunder script is appended before the synthetic download anchor on the real `DownloadButton` click path. |
| Social Bar cooldown | Pass in unit test | First trigger injects one script; second trigger is blocked by cooldown/session cap. |
| Cloudflare Rocket Loader compatibility | Pass in code/build | All monetization scripts are dynamically injected with `data-cfasync="false"`. |
| Soft post-result drawer default | Pass in component test | Aggressive profile shows post-result drawer by default without hard gate. |
| Hard gate feature flag | Pass in component test | Gate appears only when `NEXT_PUBLIC_OTK_HARD_GATE_ENABLED=true`. |
| Partner redirect secret boundary | Pass in code/search | Client links use `/go/*`; raw partner destination is not stored in source. |
| Partner CTA placement compatibility | Pass in component/function tests | UI uses `post-result-primary`; worker allowlist accepts it and preserves safe metadata. |
| COEP-free ad loading | Requires production header check | Adsterra requires no global `Cross-Origin-Embedder-Policy`; keep the Cloudflare removal transform active until response headers prove it is absent. |

## Manual browser verification steps

Use normal Chrome or Edge with extensions off. Do not test with ad blockers, Brave shields, DNS blocking, or strict incognito tracking protection.

1. Open `https://www.opentoolskit.com/?otk_monetization_debug=1&otk_monetization_preview=aggressive`.
2. Check `window.__OTK_MONETIZATION_DEBUG__` in DevTools.
3. Confirm `native_banner_mount_attempted` fires.
4. Confirm the page contains one `script[data-otk-adsterra="native-banner"]`.
5. Confirm the page contains one `#container-13abb80829d1e16b339d390deb70c6a5`.
6. Complete one tool result/download flow.
7. Confirm the soft post-result drawer appears.
8. Click the download/result action and confirm Popunder is attempted once.
9. Confirm Social Bar is attempted only once per cooldown window on allowed surfaces.
10. Click the partner CTA and confirm it opens `/go/post-result-primary...` in a new tab before redirecting.

## Debug snippets

```js
window.__OTK_MONETIZATION_DEBUG__
window.__OTK_ADSTERRA_RUNTIME__
document.querySelectorAll('script[data-otk-adsterra]')
document.querySelectorAll('#container-13abb80829d1e16b339d390deb70c6a5')
```

## Production caveat

A passing runtime does not guarantee an ad creative will be filled. A blank result can still be caused by Adsterra no-fill, account approval state, user geography, browser tracking protection, or third-party blocking.
