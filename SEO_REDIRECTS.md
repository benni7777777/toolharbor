# Redirect and 404 Cleanup Map

| Broken/dead route | Action taken | Redirect target |
| --- | --- | --- |
| `https://opentoolskit.com/*` | 301 apex-to-www redirect kept in `public/_redirects`. | `https://www.opentoolskit.com/:splat` |
| `/` | Converted into a noindex locale handoff helper so it does not compete with `/en`. | `https://www.opentoolskit.com/en/` canonical |
| `/{locale}/tools?category=*` | Retired from internal linking; replaced by real category hub routes. | `/{locale}/tools/category/{category}` |
| `/_not-found` | Left as a system 404 and excluded from indexation. | N/A |
| `/go/*` | Kept as a utility redirect surface and blocked in `robots.txt`. | Worker/runtime redirect target |

No broken internal anchor links were found in the exported HTML crawl.

