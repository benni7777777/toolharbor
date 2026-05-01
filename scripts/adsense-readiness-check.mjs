import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const outDir = path.join(root, 'out');
const expectedAdsTxt = 'google.com, pub-7143107898355663, DIRECT, f08c47fec0942fa0';
const canonicalHost = 'https://www.opentoolskit.com';
const apexHost = 'https://opentoolskit.com';

const failures = [];

function fail(message) {
  failures.push(message);
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) {
    return files;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function assertContains(relativePath, needle, label) {
  if (!read(relativePath).includes(needle)) {
    fail(`${label}: missing ${needle}`);
  }
}

function checkSourceFiles() {
  const adsTxt = read('public/ads.txt').trim();
  if (adsTxt !== expectedAdsTxt) {
    fail('public/ads.txt does not contain the exact AdSense seller record.');
  }

  assertContains('src/lib/monetization/review-mode.ts', 'NEXT_PUBLIC_ADSENSE_REVIEW_MODE', 'review mode');
  assertContains('src/lib/monetization/review-mode.ts', 'NEXT_PUBLIC_GOOGLE_ADSENSE_VERIFICATION_ENABLED', 'AdSense verification flag');
  assertContains('src/app/layout.tsx', 'google-adsense-account', 'global head meta');
  assertContains('src/lib/monetization/review-mode.ts', 'adsbygoogle.js', 'global head script');
  assertContains('src/app/robots.ts', 'sitemap.xml', 'robots sitemap');
  assertContains('public/_redirects', 'https://opentoolskit.com/* https://www.opentoolskit.com/:splat 301', 'apex redirect');
  assertContains('public/_redirects', '/ /en/ 302', 'root locale redirect');

  const netlify = read('netlify.toml');
  if (netlify.includes('to = "/index.html"') && netlify.includes('status = 200')) {
    fail('netlify.toml still contains a SPA catch-all that can mask 404s.');
  }

  const srcAndMessages = [
    ...walk(path.join(root, 'src')),
    ...walk(path.join(root, 'messages')),
  ].filter((file) => /\.(ts|tsx|json)$/.test(file));

  const stalePatterns = [
    /Phase 1/i,
    /launch-ready/i,
    /launch tools/i,
    /does not offer email support/i,
    /GitHub-first support/i,
    /80\+/,
    /67\+/,
    /9 languages/i,
  ];

  for (const file of srcAndMessages) {
    const text = fs.readFileSync(file, 'utf8');
    const rel = path.relative(root, file);
    if (text.includes(apexHost)) {
      fail(`${rel} references apex host directly instead of the canonical www host.`);
    }
    for (const pattern of stalePatterns) {
      if (pattern.test(text)) {
        fail(`${rel} still matches stale trust/product copy pattern ${pattern}.`);
      }
    }
  }

  const secretLikeAdsterraDomains = [
    'profitablecpmrate',
    'profitablecpmgate',
    'highperformanceformat',
  ];
  const siteConfig = read('src/config/site.ts');
  for (const domain of secretLikeAdsterraDomains) {
    if (siteConfig.includes(domain)) {
      fail(`src/config/site.ts hardcodes third-party monetization domain ${domain}.`);
    }
  }
}

function outPathForHref(href) {
  const withoutQuery = href.split('?')[0].split('#')[0];
  if (!withoutQuery || withoutQuery === '/') {
    return path.join(outDir, 'index.html');
  }

  const normalized = withoutQuery.endsWith('/') ? withoutQuery : `${withoutQuery}/`;
  return path.join(outDir, normalized.slice(1), 'index.html');
}

function outPathForAbsoluteUrl(url) {
  const parsed = new URL(url);
  return outPathForHref(parsed.pathname);
}

function collectAbsoluteUrls(value, urls = []) {
  if (!value) {
    return urls;
  }

  if (typeof value === 'string') {
    if (value.startsWith('https://www.opentoolskit.com/') || value.startsWith('https://opentoolskit.com/')) {
      urls.push(value);
    }
    return urls;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      collectAbsoluteUrls(item, urls);
    }
    return urls;
  }

  if (typeof value === 'object') {
    for (const nested of Object.values(value)) {
      collectAbsoluteUrls(nested, urls);
    }
  }

  return urls;
}

function isBlockedPath(pathname) {
  return pathname.startsWith('/api/') || pathname.startsWith('/go/');
}

function isHtmlRoutePath(pathname) {
  return pathname === '/' || (!/\.[a-z0-9]{2,16}$/i.test(pathname) && !pathname.startsWith('/_next/'));
}

function validateGeneratedHtmlUrl(url, sourceLabel) {
  if (!url.startsWith(`${canonicalHost}/`)) {
    fail(`${sourceLabel} uses a non-canonical host URL: ${url}`);
    return;
  }

  const parsed = new URL(url);
  if (isBlockedPath(parsed.pathname)) {
    fail(`${sourceLabel} points to a robots-blocked path: ${url}`);
  }

  if (isHtmlRoutePath(parsed.pathname) && !parsed.pathname.endsWith('/')) {
    fail(`${sourceLabel} points to a non-trailing-slash route: ${url}`);
  }

  if (parsed.pathname === '/') {
    fail(`${sourceLabel} points to the root redirect helper instead of a final canonical URL: ${url}`);
    return;
  }

  if (isHtmlRoutePath(parsed.pathname) && !fs.existsSync(outPathForAbsoluteUrl(url))) {
    fail(`${sourceLabel} points to a missing generated page: ${url}`);
  }
}

function decodeEntities(value) {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function stripHtmlToText(html) {
  const mainMatch = html.match(/<main\b[\s\S]*?<\/main>/i);
  const primaryHtml = mainMatch?.[0] ?? html;
  return decodeEntities(
    primaryHtml
      .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
      .replace(/<svg\b[\s\S]*?<\/svg>/gi, ' ')
      .replace(/<nav\b[\s\S]*?<\/nav>/gi, ' ')
      .replace(/<footer\b[\s\S]*?<\/footer>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  );
}

function normalizeVisibleText(value) {
  return value
    .toLowerCase()
    .replace(/\d{4}-\d{2}-\d{2}/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function getMinimumVisibleCharacters(pathname) {
  if (pathname === '/en/') {
    return 1800;
  }
  if (pathname === '/en/guides/') {
    return 1200;
  }
  if (pathname.startsWith('/en/guides/')) {
    return 2600;
  }
  if (pathname.startsWith('/en/tools/category/')) {
    return 1800;
  }
  if (pathname.startsWith('/en/tools/') && pathname !== '/en/tools/') {
    return 2600;
  }
  if (pathname === '/en/tools/') {
    return 1800;
  }
  if (/^\/en\/(about|contact|editorial|faq|privacy|terms|workflow)\//.test(pathname)) {
    return 1100;
  }
  return 900;
}

function checkPublisherContentQuality({ sitemapUrls, htmlFiles }) {
  const sitemapPathnames = new Set(sitemapUrls.map((url) => new URL(url).pathname));
  const lowTextPages = [];
  const missingH1Pages = [];
  const missingDescriptionPages = [];
  const placeholderPages = [];
  const reviewModeAdPages = [];
  const noindexPages = [];
  const contentHashes = new Map();
  let indexablePageCount = 0;

  for (const file of htmlFiles) {
    const rel = path.relative(outDir, file);
    const html = fs.readFileSync(file, 'utf8');
    const isNoindex = /<meta name="robots" content="[^"]*noindex/i.test(html);
    if (isNoindex) {
      noindexPages.push(rel);
    }

    const pathname = `/${rel.replace(/\\/g, '/').replace(/index\.html$/, '')}`;
    const normalizedPathname = pathname === '/' ? '/' : pathname;
    const inSitemap = sitemapPathnames.has(normalizedPathname);
    if (!inSitemap) {
      continue;
    }

    indexablePageCount += 1;

    const text = stripHtmlToText(html);
    const minimumChars = getMinimumVisibleCharacters(normalizedPathname);
    if (text.length < minimumChars) {
      lowTextPages.push(`${rel} (${text.length}/${minimumChars} visible chars)`);
    }

    if (!/<h1\b[^>]*>/i.test(html)) {
      missingH1Pages.push(rel);
    }

    if (!/<meta name="description" content="[^"]{50,}"/i.test(html)) {
      missingDescriptionPages.push(rel);
    }

    if (/\b(coming soon|under construction|lorem ipsum|todo:|placeholder content)\b/i.test(text)) {
      placeholderPages.push(rel);
    }

    if (/profitablecpm|zeydoo|adsterra-native-host|otk-adsterra|popunder|socialbar|sponsored left rail|sponsored right rail/i.test(html)) {
      reviewModeAdPages.push(rel);
    }

    const normalizedText = normalizeVisibleText(text);
    const hash = normalizedText.slice(0, 2400);
    const previous = contentHashes.get(hash);
    if (previous && normalizedText.length > 1200) {
      fail(`Potential duplicate visible content between ${previous} and ${rel}.`);
    } else {
      contentHashes.set(hash, rel);
    }
  }

  if (lowTextPages.length > 0) {
    fail(`Indexable pages below visible-content thresholds:\n${lowTextPages.slice(0, 40).join('\n')}`);
  }
  if (missingH1Pages.length > 0) {
    fail(`Indexable pages missing an H1:\n${missingH1Pages.slice(0, 40).join('\n')}`);
  }
  if (missingDescriptionPages.length > 0) {
    fail(`Indexable pages missing a usable meta description:\n${missingDescriptionPages.slice(0, 40).join('\n')}`);
  }
  if (placeholderPages.length > 0) {
    fail(`Indexable pages contain placeholder or under-construction language:\n${placeholderPages.slice(0, 40).join('\n')}`);
  }
  if (reviewModeAdPages.length > 0) {
    fail(`Review-mode output still contains ad or aggressive monetization surfaces:\n${reviewModeAdPages.slice(0, 40).join('\n')}`);
  }

  console.log(`Publisher content audit: ${indexablePageCount} indexable sitemap page(s), ${noindexPages.length} generated noindex page(s).`);
}

function checkOutputFiles() {
  if (!fs.existsSync(outDir)) {
    console.warn('out/ does not exist yet; skipping generated-output checks. Run npm run build first.');
    return;
  }

  const outAdsTxt = fs.readFileSync(path.join(outDir, 'ads.txt'), 'utf8').trim();
  if (outAdsTxt !== expectedAdsTxt) {
    fail('out/ads.txt does not contain the exact AdSense seller record.');
  }

  const robots = fs.readFileSync(path.join(outDir, 'robots.txt'), 'utf8');
  if (!robots.includes(`Sitemap: ${canonicalHost}/sitemap.xml`)) {
    fail('out/robots.txt does not include the canonical sitemap URL.');
  }
  if (/Disallow:\s*\/\s*$/m.test(robots)) {
    fail('out/robots.txt disallows the whole site.');
  }

  const sitemap = fs.readFileSync(path.join(outDir, 'sitemap.xml'), 'utf8');
  if (sitemap.includes(apexHost)) {
    fail('out/sitemap.xml contains apex-host URLs.');
  }
  if (!sitemap.includes(`${canonicalHost}/en/`)) {
    fail('out/sitemap.xml is missing the canonical English homepage.');
  }
  if (sitemap.includes(`<loc>${canonicalHost}/</loc>`)) {
    fail('out/sitemap.xml includes the root redirect helper.');
  }
  const nonCanonicalLoc = sitemap.match(/<loc>https:\/\/www\.opentoolskit\.com\/[^<]*(?<!\/)<\/loc>/);
  if (nonCanonicalLoc) {
    fail(`out/sitemap.xml contains a non-trailing-slash page URL: ${nonCanonicalLoc[0]}`);
  }

  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const sitemapUrlSet = new Set(sitemapUrls);
  for (const url of sitemapUrls) {
    validateGeneratedHtmlUrl(url, 'out/sitemap.xml');

    const pagePath = outPathForAbsoluteUrl(url);
    if (!fs.existsSync(pagePath)) {
      continue;
    }

    const html = fs.readFileSync(pagePath, 'utf8');
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    if (canonical !== url) {
      fail(`${path.relative(outDir, pagePath)} canonical does not match sitemap URL. expected=${url} actual=${canonical || 'missing'}`);
    }

    const ogUrl = html.match(/<meta property="og:url" content="([^"]+)"/)?.[1];
    if (ogUrl && ogUrl !== url) {
      fail(`${path.relative(outDir, pagePath)} og:url does not match canonical URL. expected=${url} actual=${ogUrl}`);
    }

    if (/<meta name="robots" content="[^"]*noindex/i.test(html)) {
      fail(`${path.relative(outDir, pagePath)} is noindex but appears in sitemap.`);
    }

    const alternates = [...html.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/g)];
    if (alternates.length === 0) {
      fail(`${path.relative(outDir, pagePath)} is missing hreflang alternates.`);
    }

    for (const [, hreflang, href] of alternates) {
      validateGeneratedHtmlUrl(href, `${path.relative(outDir, pagePath)} hreflang ${hreflang}`);
      if (hreflang !== 'x-default' && !sitemapUrlSet.has(href)) {
        fail(`${path.relative(outDir, pagePath)} hreflang ${hreflang} is not present in sitemap: ${href}`);
      }
    }
  }

  const home = fs.readFileSync(path.join(outDir, 'en', 'index.html'), 'utf8');
  if (!home.includes('name="google-adsense-account" content="ca-pub-7143107898355663"')) {
    fail('Generated English homepage is missing google-adsense-account meta tag.');
  }
  if (!home.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7143107898355663')) {
    fail('Generated English homepage is missing AdSense verification script.');
  }
  if (/profitablecpm|zeydoo|Adsterra Social|popunder/i.test(home)) {
    fail('Generated English homepage still exposes aggressive monetization strings in review mode.');
  }

  if (!fs.existsSync(path.join(outDir, '404.html'))) {
    fail('Generated static output is missing 404.html.');
  }

  const htmlFiles = walk(outDir).filter((file) => file.endsWith('.html'));
  const broken = [];
  const hrefPattern = /\s(?:href|src)=["']([^"']+)["']/g;
  const skipPrefixes = [
    'http:',
    'https:',
    'mailto:',
    'tel:',
    '#',
    'data:',
    '/_next/',
    '/images/',
    '/workers/',
    '/pdfjs-viewer/',
    '/pdfjs-annotation-viewer/',
    '/pymupdf-wasm/',
    '/libreoffice-wasm/',
  ];

  for (const file of htmlFiles) {
    const text = fs.readFileSync(file, 'utf8');
    if (text.includes(apexHost)) {
      fail(`${path.relative(outDir, file)} references apex host directly instead of the canonical www host.`);
    }

    const ldJsonBlocks = [...text.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    for (const [, block] of ldJsonBlocks) {
      try {
        const parsed = JSON.parse(block);
        for (const url of collectAbsoluteUrls(parsed)) {
          validateGeneratedHtmlUrl(url.split('#')[0], `${path.relative(outDir, file)} JSON-LD`);
        }
      } catch {
        fail(`${path.relative(outDir, file)} contains invalid JSON-LD.`);
      }
    }

    for (const match of text.matchAll(hrefPattern)) {
      const href = match[1];
      if (!href.startsWith('/') || skipPrefixes.some((prefix) => href.startsWith(prefix))) {
        continue;
      }

      if (href.startsWith('/api/') || href.startsWith('/go/')) {
        broken.push(`${path.relative(outDir, file)} -> ${href} (robots-blocked internal link)`);
        continue;
      }

      const cleaned = href.split('?')[0].split('#')[0];
      if (cleaned === '/') {
        broken.push(`${path.relative(outDir, file)} -> ${href} (root redirect helper)`);
        continue;
      }

      if (cleaned && !cleaned.endsWith('/') && !/\.[a-z0-9]{2,16}$/i.test(cleaned)) {
        broken.push(`${path.relative(outDir, file)} -> ${href} (non-trailing-slash route)`);
        continue;
      }

      if (/\.[a-z0-9]{2,16}$/i.test(cleaned)) {
        const assetPath = path.join(outDir, cleaned.slice(1));
        if (!fs.existsSync(assetPath)) {
          broken.push(`${path.relative(outDir, file)} -> ${href}`);
        }
        continue;
      }

      const target = outPathForHref(href);
      if (!fs.existsSync(target)) {
        broken.push(`${path.relative(outDir, file)} -> ${href}`);
      }
    }
  }

  if (broken.length > 0) {
    fail(`Generated output has broken internal hrefs:\n${broken.slice(0, 30).join('\n')}`);
  }

  checkPublisherContentQuality({ sitemapUrls, htmlFiles });
}

checkSourceFiles();
checkOutputFiles();

if (failures.length > 0) {
  console.error(`AdSense readiness check failed with ${failures.length} issue(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('AdSense readiness check passed.');
