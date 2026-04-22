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
  const nonCanonicalLoc = sitemap.match(/<loc>https:\/\/www\.opentoolskit\.com\/[^<]*(?<!\/)<\/loc>/);
  if (nonCanonicalLoc) {
    fail(`out/sitemap.xml contains a non-trailing-slash page URL: ${nonCanonicalLoc[0]}`);
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
    '/go/',
    '/api/',
  ];

  for (const file of htmlFiles) {
    const text = fs.readFileSync(file, 'utf8');
    for (const match of text.matchAll(hrefPattern)) {
      const href = match[1];
      if (!href.startsWith('/') || skipPrefixes.some((prefix) => href.startsWith(prefix))) {
        continue;
      }

      const cleaned = href.split('?')[0].split('#')[0];
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
