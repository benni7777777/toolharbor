# OpenToolsKit

<div align="center">
  <img src="public/images/logo.png" alt="OpenToolsKit Logo" width="120" height="120" />
  <h1>Open-source browser tools for documents and utility workflows</h1>
  <p><strong>Private by default. Browser-first. AGPL-licensed.</strong></p>
  <p>
    OpenToolsKit provides a multilingual PDF suite, workflow editor, browser extension,
    Cloudflare Pages deployment path, and review-mode controls for optional monetization surfaces.
  </p>
</div>

<div align="center">

[Website](https://www.opentoolskit.com/en/) | [Source Code](https://github.com/benni7777777/toolharbor) | [Issues](https://github.com/benni7777777/toolharbor/issues)

</div>

## Overview

OpenToolsKit is a browser-first tool platform built for private document work and broader utility workflows. The current public site ships the replatformed PDF suite, workflow editor, and extension under a distinct OpenToolsKit product shell, with room to expand the shared tool registry into additional non-PDF tool families.

Core characteristics:

- Local browser processing where applicable
- Public AGPL-3.0 source availability
- Multilingual static export for Cloudflare Pages
- Workflow editor and browser extension included in scope
- Explicit light, dark, and system theme support
- Optional post-result partner suggestions that are disabled during AdSense review mode

## How OpenToolsKit differs

OpenToolsKit is not presented as a drop-in rename of PDFCraft. This codebase has been reworked to introduce:

- A broader tool-platform direction instead of a PDF-only product frame
- New OpenToolsKit branding, shell, typography, palette, and theme system
- Shared config for metadata, source visibility, legal attribution, and sponsor disclosure
- Cloudflare Pages and Worker routing for deployment and secret-backed outbound partner redirects
- A provider-aware monetization model that keeps ads out of the core tool action row

## AGPL and attribution

This project remains licensed under **AGPL-3.0**.

OpenToolsKit is based on [PDFCraft](https://github.com/PDFCraftTool/pdfcraft), and the derivative status is intentionally kept visible through the footer, support surfaces, and [`NOTICE.md`](NOTICE.md). The live website should always link to the public source repository that corresponds to the deployed service.

## Acknowledgement

Thank you to the original PDFCraft maintainers for publishing the upstream project under AGPL-3.0 and making this derivative replatform legally and technically possible.

OpenToolsKit keeps that upstream attribution visible while materially modifying the product into a broader browser-tool platform.

## Getting started

### Prerequisites

- Node.js 18.17 or later
- npm

### Local development

```bash
git clone https://github.com/benni7777777/toolharbor.git
cd toolharbor
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` starts the development server
- `npm run build` creates the static export in `out/`
- `npm run test` runs the test suite
- `npm run lint` runs ESLint

## Deployment

The app is configured for static export and Cloudflare deployment.

- Cloudflare Pages serves the static `out/` directory
- A Cloudflare Worker/Pages Function handles same-origin sponsor redirects at `/go/*`
- Security and caching headers should be served through Pages-compatible artifacts such as `public/_headers`

See [`DEPLOYMENT.md`](DEPLOYMENT.md), [`wrangler.toml`](wrangler.toml), and [`.env.example`](.env.example) for deployment and environment details.

## Ads and sponsor boundaries

OpenToolsKit may render:

- env-backed Adsterra display banners in fixed-size rail, inline, leaderboard, tablet, and mobile slots
- Adsterra native placements on discovery and informational pages
- limited session-based SocialBar/Popunder scripts on non-tool-action pages only
- Zeydoo-backed post-result partner CTAs through same-origin redirect paths

Temporary AdSense review mode is controlled by `NEXT_PUBLIC_ADSENSE_REVIEW_MODE`. While it is enabled, Adsterra, Zeydoo, sponsor gates, popunders, social bars, and partner redirect monetization are disabled so the review surface stays clean.

Display banner URLs and `atOptions` values are deployment-specific public environment variables. They are not hardcoded in the source tree. Raw partner redirect destinations and account-level credentials must remain in Cloudflare environment configuration, not in commits.

## Cloudflare Pages note

The Cloudflare Pages launch build excludes the large LibreOffice WASM payload that powers a few office-document conversions. Until those assets are moved to an external object store or worker-delivered origin, the following tools stay disabled in the public Pages deployment:

- Word to PDF
- Excel to PDF
- PowerPoint to PDF
- RTF to PDF

## Support

General user support is available through the public contact page and support email configured by `NEXT_PUBLIC_SUPPORT_EMAIL`. Developer-facing support and transparency are handled through:

- [Contact](https://www.opentoolskit.com/en/contact/)
- [Source Code](https://github.com/benni7777777/toolharbor)
- [GitHub Issues](https://github.com/benni7777777/toolharbor/issues)
- [`NOTICE.md`](NOTICE.md)

## License

Licensed under the [AGPL-3.0](LICENSE).
