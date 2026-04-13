# Live Surface Redirects and Cleanup

| Dead route or state | Action taken | Redirect target |
| --- | --- | --- |
| `https://opentoolskit.com/*` | Keep apex-to-www redirect so the live site resolves to the canonical host. | `https://www.opentoolskit.com/:splat` |
| `/` | Keep as noindex locale handoff and canonicalize the live English entry route. | `https://www.opentoolskit.com/en/` |
| `/{locale}/tools?category=*` | Do not surface query-string category states in the live link graph. | `/{locale}/tools/category/{category}` |
| `/go/*` | Keep out of crawl/index flow and route through the runtime redirect only. | Runtime/worker destination |
| `/_not-found` | Keep as system 404 only, excluded from indexation and sitemap coverage. | N/A |

No dead internal links were found in the live exported HTML surface.

