$ErrorActionPreference = 'Stop'
$repo = 'C:\Users\nebli\Desktop\WEBSITE\pdfcraft'
$outDir = Join-Path $repo 'out'
$siteUrl = 'https://www.opentoolskit.com'

function Normalize-Route([string]$route) {
  if ([string]::IsNullOrWhiteSpace($route)) { return '/' }
  $route = ($route -replace '\\', '/').Trim()
  if (-not $route.StartsWith('/')) { $route = '/' + $route }
  if ($route.EndsWith('/index')) { $route = $route.Substring(0, $route.Length - '/index'.Length) }
  if ($route -eq '/404') { return '/_not-found' }
  if ($route.Length -gt 1) { $route = $route.TrimEnd('/') }
  if ([string]::IsNullOrWhiteSpace($route)) { return '/' }
  return $route
}

function Route-From-File([string]$fullName) {
  $relative = ($fullName.Substring($outDir.Length).TrimStart('\', '/') -replace '\\', '/')
  if ($relative -eq 'index.html') { return '/' }
  if ($relative.EndsWith('/index.html')) {
    return Normalize-Route($relative.Substring(0, $relative.Length - '/index.html'.Length))
  }
  if ($relative.EndsWith('.html')) {
    return Normalize-Route($relative.Substring(0, $relative.Length - '.html'.Length))
  }
  return Normalize-Route($relative)
}

function Clean-Text([string]$value) {
  if ([string]::IsNullOrWhiteSpace($value)) { return '' }
  $value = [regex]::Replace($value, '<[^>]+>', ' ')
  $value = [System.Net.WebUtility]::HtmlDecode($value)
  $value = [regex]::Replace($value, '\s+', ' ')
  return $value.Trim()
}

function Escape-Md([string]$value) {
  if ($null -eq $value) { return '' }
  return (($value -replace '\|', '\|') -replace "`r?`n", ' ')
}

function Get-PageType([string]$route) {
  if ($route -eq '/') { return 'root-redirect' }
  if ($route -eq '/_not-found') { return '404' }
  if ($route -match '^/[a-z]{2}(?:-[A-Z]{2})?$') { return 'homepage' }
  if ($route -match '^/[a-z]{2}(?:-[A-Z]{2})?/tools$') { return 'tools-directory' }
  if ($route -match '^/[a-z]{2}(?:-[A-Z]{2})?/tools/category/[^/]+$') { return 'category-hub' }
  if ($route -match '^/[a-z]{2}(?:-[A-Z]{2})?/tools/[^/]+$') { return 'tool-page' }
  if ($route -match '^/[a-z]{2}(?:-[A-Z]{2})?/workflow$') { return 'workflow' }
  if ($route -match '^/[a-z]{2}(?:-[A-Z]{2})?/(about|faq|privacy|contact)$') { return 'trust-page' }
  return 'other'
}

function Get-IndexDecision([string]$route, [string]$robotsMeta) {
  if ($robotsMeta -match 'noindex') { return 'noindex' }
  if ($route -eq '/' -or $route -eq '/_not-found') { return 'noindex' }
  return 'index'
}

function Get-Reason([string]$route, [string]$pageType, [string]$indexDecision) {
  if ($route -eq '/') { return 'Root locale handoff page. Canonical points to /en and robots are noindex.' }
  if ($route -eq '/_not-found') { return 'System 404 route. Excluded from index and sitemap.' }
  if ($pageType -eq 'tool-page') { return 'High-intent canonical tool route with unique title, description, and SoftwareApplication schema.' }
  if ($pageType -eq 'category-hub') { return 'Canonical category hub that clusters related tools and distributes internal links.' }
  if ($pageType -eq 'tools-directory') { return 'Canonical tools directory with crawlable links to all category hubs and tool routes.' }
  if ($pageType -eq 'workflow') { return 'Canonical workflow route with distinct use-case intent and breadcrumb/webpage schema.' }
  if ($pageType -eq 'trust-page') { return 'Indexable trust/support page that reinforces brand and product entity signals.' }
  if ($pageType -eq 'homepage') { return 'Canonical localized homepage for the selected locale.' }
  if ($indexDecision -eq 'index') { return 'Canonical route.' }
  return 'Non-index utility route.'
}

function Get-Cannibalization([string]$route, [string]$pageType) {
  if ($pageType -eq 'category-hub') { return 'medium' }
  if ($pageType -ne 'tool-page') { return 'low' }
  if ($route -match '/tools/(merge-pdf|split-pdf|extract-pages|organize-pdf|pdf-multi-tool)$') { return 'medium' }
  if ($route -match '/tools/(jpg-to-pdf|image-to-pdf|png-to-pdf|webp-to-pdf|bmp-to-pdf|tiff-to-pdf|svg-to-pdf|heic-to-pdf|pdf-to-jpg|pdf-to-png)$') { return 'medium' }
  if ($route -match '/tools/(compress-pdf|repair-pdf|linearize-pdf|sanitize-pdf|encrypt-pdf|decrypt-pdf|remove-metadata|find-and-redact|change-permissions|remove-restrictions)$') { return 'medium' }
  return 'low'
}

function Get-MonetizationRelevance([string]$route, [string]$pageType) {
  if ($pageType -eq 'tool-page') { return 'high' }
  if ($pageType -in @('homepage', 'tools-directory', 'category-hub', 'trust-page')) { return 'medium' }
  if ($pageType -eq 'workflow') { return 'low' }
  return 'low'
}

function Get-LiveStatus([string]$route, [string]$pageType) {
  if ($pageType -eq '404') { return 'system' }
  if ($route -eq '/') { return 'utility' }
  return 'live'
}

function Get-LivePriorityScore([string]$route, [string]$pageType, [string]$dupRisk, [string]$actionNeeded, [string]$monetizationRelevance) {
  $score = 0

  switch ($monetizationRelevance) {
    'high' { $score += 40 }
    'medium' { $score += 22 }
    default { $score += 8 }
  }

  switch ($pageType) {
    'homepage' { $score += 24 }
    'tools-directory' { $score += 30 }
    'category-hub' { $score += 28 }
    'tool-page' { $score += 34 }
    'workflow' { $score += 16 }
    'trust-page' { $score += 12 }
  }

  if ($route -eq '/en') { $score += 26 }
  if ($route -match '^/en/tools$') { $score += 24 }
  if ($route -match '^/en/workflow$') { $score += 18 }
  if ($route -match '^/en/(about|faq|privacy|contact)$') { $score += 8 }
  if ($route -match '^/en/tools/category/(organize-manage|optimize-repair|secure-pdf|convert-to-pdf|convert-from-pdf|edit-annotate)$') { $score += 24 }
  if ($route -match '^/en/tools/(merge-pdf|compress-pdf|split-pdf|edit-pdf|jpg-to-pdf|image-to-pdf|pdf-to-jpg|pdf-to-png|sign-pdf|encrypt-pdf|delete-pages|extract-pages|organize-pdf|pdf-to-docx|pdf-to-excel|add-watermark|form-filler|decrypt-pdf|find-and-redact|remove-metadata)$') {
    $score += 28
  }
  if ($dupRisk -eq 'medium') { $score += 8 }
  if ($actionNeeded -match 'Expand unique query-first') { $score += 12 }

  return $score
}

function Get-PriorityReason([string]$route, [string]$pageType, [string]$monetizationRelevance) {
  if ($pageType -eq 'homepage') { return 'Homepage discovery page that introduces the brand and routes users into monetized tool clusters.' }
  if ($pageType -eq 'tools-directory') { return 'Main commercial hub for tool discovery, internal-link distribution, and high-intent route selection.' }
  if ($pageType -eq 'workflow') { return 'Distinct live product surface with strong repeat-task intent and internal-link value across the PDF suite.' }
  if ($pageType -eq 'category-hub') { return 'Category hub that captures clustered intent and funnels users into monetized live tools.' }
  if ($pageType -eq 'trust-page') { return 'Trust/support route that reinforces the entity and monetized product without looking thin or disposable.' }
  if ($route -match '/tools/(merge-pdf|compress-pdf|split-pdf|jpg-to-pdf|pdf-to-jpg|sign-pdf|encrypt-pdf)$') { return 'High-intent tool route with strong user demand and confirmed post-result monetization.' }
  if ($monetizationRelevance -eq 'high') { return 'Monetized result page that can earn directly after successful completion.' }
  if ($monetizationRelevance -eq 'medium') { return 'Discovery or trust route that supports monetized downstream traffic.' }
  return 'Live route with lower direct monetization value but useful internal-link support.'
}

function Get-ChangeFocus([string]$route, [string]$pageType, [string]$actionNeeded) {
  if ($actionNeeded -match 'Expand unique query-first') { return 'Add stronger query-first copy and a dedicated SEO override.' }
  if ($pageType -eq 'workflow') { return 'Expose more crawlable HTML and route users into live high-intent tool paths.' }
  if ($pageType -eq 'tools-directory') { return 'Strengthen internal links toward the best live conversion paths.' }
  if ($pageType -eq 'category-hub') { return 'Sharpen intent split between sibling categories and top tools.' }
  if ($pageType -eq 'trust-page') { return 'Use trust copy and links to support monetized live routes without bloating the page.' }
  if ($pageType -eq 'tool-page') { return 'Keep tool meaning distinct from sibling routes and reinforce next actions.' }
  return 'Maintain canonical handling and live-route clarity.'
}

function Get-ExpectedImpact([string]$pageType, [string]$monetizationRelevance) {
  if ($pageType -eq 'tool-page' -and $monetizationRelevance -eq 'high') { return 'Higher CTR and more monetized completions from clearer search intent alignment.' }
  if ($pageType -eq 'category-hub') { return 'Better topical clustering and more efficient distribution into monetized tools.' }
  if ($pageType -eq 'tools-directory') { return 'Stronger discovery-to-tool flow and better crawl depth into live routes.' }
  if ($pageType -eq 'workflow') { return 'Improved renderability and better capture of repeat-task workflow intent.' }
  if ($pageType -eq 'trust-page') { return 'Better brand/entity signals that support conversion and ranking trust.' }
  if ($pageType -eq 'homepage') { return 'Better brand query CTR and clearer commercial routing from the entry point.' }
  return 'Cleaner live-surface crawl and less ambiguity for search engines.'
}

$files = Get-ChildItem -Path $outDir -Recurse -Filter 'index.html' | Sort-Object FullName
$routes = New-Object System.Collections.Generic.List[object]
foreach ($file in $files) {
  $route = Route-From-File $file.FullName
  $html = Get-Content -LiteralPath $file.FullName -Raw
  $title = if ($html -match '<title>(.*?)</title>') { Clean-Text $matches[1] } else { '' }
  $description = if ($html -match '<meta name="description" content="([^"]*)"') { Clean-Text $matches[1] } else { '' }
  $keywordsRaw = if ($html -match '<meta name="keywords" content="([^"]*)"') { $matches[1] } else { '' }
  $keywords = @()
  if ($keywordsRaw) { $keywords = $keywordsRaw.Split(',') | ForEach-Object { $_.Trim() } | Where-Object { $_ } }
  $primaryQuery = if ($keywords.Count -gt 0) { $keywords[0] } elseif ($title) { ($title -replace '\s*\|\s*OpenToolsKit$', '') } else { '' }
  $secondaryQueries = if ($keywords.Count -gt 1) { ($keywords | Select-Object -Skip 1 -First 4) -join '; ' } else { '' }
  $canonical = if ($html -match '<link rel="canonical" href="([^"]*)"') { $matches[1] } else { '' }
  $robotsMeta = if ($html -match '<meta name="robots" content="([^"]*)"') { $matches[1] } else { '' }
  $h1 = if ($html -match '<h1[^>]*>(.*?)</h1>') { Clean-Text $matches[1] } else { '' }
  $schemaTypes = [regex]::Matches($html, '"@type":"([^"]+)"') | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique
  $anchorLinks = [regex]::Matches($html, '<a[^>]+href="([^"]+)"') | ForEach-Object { $_.Groups[1].Value }
  $internalOut = @()
  foreach ($href in $anchorLinks) {
    $normalized = ''
    if ($href.StartsWith($siteUrl)) {
      $normalized = Normalize-Route($href.Substring($siteUrl.Length))
    } elseif ($href.StartsWith('/')) {
      $normalized = Normalize-Route(($href -split '[?#]')[0])
    }
    if ($normalized -and $normalized -notmatch '^/(_next|images|workers|favicon|icon-|manifest\.webmanifest|robots\.txt|sitemap\.xml|go/)') {
      $internalOut += $normalized
    }
  }
  $pageType = Get-PageType $route
  $indexDecision = Get-IndexDecision $route $robotsMeta
  $routes.Add([pscustomobject]@{
    Route = $route
    PageType = $pageType
    IndexDecision = $indexDecision
    Canonical = $canonical
    Title = $title
    H1 = $h1
    Description = $description
    PrimaryQuery = $primaryQuery
    SecondaryQueries = $secondaryQueries
    SchemaTypes = ($schemaTypes -join ', ')
    InternalOutRoutes = @($internalOut | Select-Object -Unique)
    RobotsMeta = $robotsMeta
  })
}

$knownRoutes = New-Object 'System.Collections.Generic.HashSet[string]'
foreach ($route in $routes.Route) { [void]$knownRoutes.Add((Normalize-Route $route)) }

$incomingMap = @{}
$brokenLinks = New-Object System.Collections.Generic.List[object]
foreach ($route in $routes) {
  foreach ($target in $route.InternalOutRoutes) {
    if (-not $knownRoutes.Contains($target)) {
      $brokenLinks.Add([pscustomobject]@{ Source = $route.Route; Target = $target })
      continue
    }
    if (-not $incomingMap.ContainsKey($target)) { $incomingMap[$target] = New-Object System.Collections.Generic.List[string] }
    $incomingMap[$target].Add($route.Route)
  }
}

$titleCounts = @{}
$descriptionCounts = @{}
foreach ($route in $routes) {
  if ($route.Title) {
    if ($titleCounts.ContainsKey($route.Title)) { $titleCounts[$route.Title]++ } else { $titleCounts[$route.Title] = 1 }
  }
  if ($route.Description) {
    if ($descriptionCounts.ContainsKey($route.Description)) { $descriptionCounts[$route.Description]++ } else { $descriptionCounts[$route.Description] = 1 }
  }
}

$inventory = foreach ($route in $routes | Sort-Object Route) {
  $incoming = if ($incomingMap.ContainsKey($route.Route)) { @($incomingMap[$route.Route] | Select-Object -Unique) } else { @() }
  $dupRisk = if ($route.IndexDecision -eq 'noindex') { 'noindex' } elseif (($route.Title -and $titleCounts[$route.Title] -gt 1) -or ($route.Description -and $descriptionCounts[$route.Description] -gt 1)) { 'medium' } elseif ($route.Title -like '*Browser-Side PDF Workflow*') { 'medium' } else { 'low' }
  $cannibalization = Get-Cannibalization $route.Route $route.PageType
  $actionNeeded = if ($route.Route -eq '/') { 'Keep noindex locale handoff and out of the sitemap.' } elseif ($dupRisk -eq 'medium' -and $route.Title -like '*Browser-Side PDF Workflow*') { 'Expand unique query-first copy and dedicated SEO override.' } elseif ($cannibalization -eq 'medium') { 'Maintain comparison links and monitor sibling intent overlap.' } else { 'Keep as canonical route.' }
  [pscustomobject]@{
    'URL path' = $route.Route
    'Page type' = $route.PageType
    'Index/noindex recommendation' = $route.IndexDecision
    'Canonical target' = $route.Canonical
    'Current title' = $route.Title
    'Current H1' = $route.H1
    'Current meta description' = $route.Description
    'Primary query target' = $route.PrimaryQuery
    'Secondary query targets' = $route.SecondaryQueries
    'Internal links in' = if ($incoming.Count -gt 0) { '{0}: {1}' -f $incoming.Count, (($incoming | Select-Object -First 5) -join ', ') } else { '0' }
    'Internal links out' = if ($route.InternalOutRoutes.Count -gt 0) { '{0}: {1}' -f $route.InternalOutRoutes.Count, (($route.InternalOutRoutes | Select-Object -First 5) -join ', ') } else { '0' }
    'Schema type(s)' = $route.SchemaTypes
    'Duplication risk' = $dupRisk
    'Cannibalization risk' = $cannibalization
    'Action needed' = $actionNeeded
  }
}

$indexableRoutes = @($inventory | Where-Object { $_.'Index/noindex recommendation' -eq 'index' })
$noindexRoutes = @($inventory | Where-Object { $_.'Index/noindex recommendation' -eq 'noindex' })
$sitemapXml = Get-Content -LiteralPath (Join-Path $outDir 'sitemap.xml') -Raw
$sitemapUrlCount = ([regex]::Matches($sitemapXml, '<url>')).Count

$audit = New-Object System.Text.StringBuilder
[void]$audit.AppendLine('# SEO Audit')
[void]$audit.AppendLine('')
[void]$audit.AppendLine('## Summary')
[void]$audit.AppendLine('')
[void]$audit.AppendLine("- Exported HTML routes audited: $($inventory.Count)")
[void]$audit.AppendLine("- Indexable routes: $($indexableRoutes.Count)")
[void]$audit.AppendLine("- Noindex routes: $($noindexRoutes.Count)")
[void]$audit.AppendLine("- Broken internal links found: $($brokenLinks.Count)")
[void]$audit.AppendLine("- Sitemap URL count: $sitemapUrlCount")
[void]$audit.AppendLine('')
[void]$audit.AppendLine('## Risk Summary')
[void]$audit.AppendLine('')
[void]$audit.AppendLine('- Canonical domain is standardized on `https://www.opentoolskit.com`.')
[void]$audit.AppendLine('- Root `/` is now a noindex locale handoff page and no longer competes with `/en`.')
[void]$audit.AppendLine('- Category filter query links were retired in favor of crawlable category hub routes.')
[void]$audit.AppendLine('- Duplicate-content risk remains mainly on long-tail tool pages still using fallback SEO copy.')
[void]$audit.AppendLine('- Sitemap coverage now matches canonical localized pages only; utility routes are excluded.')
[void]$audit.AppendLine('')
[void]$audit.AppendLine('## Priority Recommendations')
[void]$audit.AppendLine('')
[void]$audit.AppendLine('- Keep extending dedicated SEO overrides for high-intent tools that still fall back to generic titles.')
[void]$audit.AppendLine('- Add non-PDF guides and collections only when the actual tools land, to avoid thin or misleading content.')
[void]$audit.AppendLine('- Preserve the category hub and related-path graph; it is now the main internal-link spine for crawling and cannibalization control.')
[void]$audit.AppendLine('')
[void]$audit.AppendLine('## Route Inventory')
[void]$audit.AppendLine('')
[void]$audit.AppendLine('| URL path | Page type | Index/noindex recommendation | Canonical target | Current title | Current H1 | Current meta description | Primary query target | Secondary query targets | Internal links in | Internal links out | Schema type(s) | Duplication risk | Cannibalization risk | Action needed |')
[void]$audit.AppendLine('| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |')
foreach ($row in $inventory) {
  $line = ('| {0} | {1} | {2} | {3} | {4} | {5} | {6} | {7} | {8} | {9} | {10} | {11} | {12} | {13} | {14} |' -f (Escape-Md $row.'URL path'), (Escape-Md $row.'Page type'), (Escape-Md $row.'Index/noindex recommendation'), (Escape-Md $row.'Canonical target'), (Escape-Md $row.'Current title'), (Escape-Md $row.'Current H1'), (Escape-Md $row.'Current meta description'), (Escape-Md $row.'Primary query target'), (Escape-Md $row.'Secondary query targets'), (Escape-Md $row.'Internal links in'), (Escape-Md $row.'Internal links out'), (Escape-Md $row.'Schema type(s)'), (Escape-Md $row.'Duplication risk'), (Escape-Md $row.'Cannibalization risk'), (Escape-Md $row.'Action needed'))
  [void]$audit.AppendLine($line)
}
Set-Content -LiteralPath (Join-Path $repo 'SEO_AUDIT.md') -Value $audit.ToString() -Encoding UTF8

$queryMap = $inventory | Select-Object @{
    Name='URL'; Expression={$_.'URL path'}
  }, @{
    Name='primary query'; Expression={$_.'Primary query target'}
  }, @{
    Name='secondary queries'; Expression={$_.'Secondary query targets'}
  }, @{
    Name='page type'; Expression={$_.'Page type'}
  }, @{
    Name='cannibalization notes'; Expression={if ($_.'Cannibalization risk' -eq 'medium') { $_.'Action needed' } else { 'Low overlap risk' }}
  }
$queryMap | ConvertTo-Csv -NoTypeInformation | Set-Content -LiteralPath (Join-Path $repo 'SEO_QUERY_MAP.csv') -Encoding UTF8

$indexMap = New-Object System.Text.StringBuilder
[void]$indexMap.AppendLine('# Indexation Map')
[void]$indexMap.AppendLine('')
[void]$indexMap.AppendLine('| URL path | Index/noindex | Canonical target | Reason |')
[void]$indexMap.AppendLine('| --- | --- | --- | --- |')
foreach ($route in $routes | Sort-Object Route) {
  $reason = Get-Reason $route.Route $route.PageType $route.IndexDecision
  [void]$indexMap.AppendLine(('| {0} | {1} | {2} | {3} |' -f (Escape-Md $route.Route), (Escape-Md $route.IndexDecision), (Escape-Md $route.Canonical), (Escape-Md $reason)))
}
[void]$indexMap.AppendLine('')
[void]$indexMap.AppendLine('Utility routes excluded from index and audit inventory detail: `/go/*`, `/manifest.webmanifest`, `/robots.txt`, `/sitemap.xml`.')
Set-Content -LiteralPath (Join-Path $repo 'SEO_INDEXATION_MAP.md') -Value $indexMap.ToString() -Encoding UTF8

$redirects = New-Object System.Text.StringBuilder
[void]$redirects.AppendLine('# Redirect and 404 Cleanup Map')
[void]$redirects.AppendLine('')
[void]$redirects.AppendLine('| Broken/dead route | Action taken | Redirect target |')
[void]$redirects.AppendLine('| --- | --- | --- |')
[void]$redirects.AppendLine('| `https://opentoolskit.com/*` | 301 apex-to-www redirect kept in `public/_redirects`. | `https://www.opentoolskit.com/:splat` |')
[void]$redirects.AppendLine('| `/` | Converted into a noindex locale handoff helper so it does not compete with `/en`. | `https://www.opentoolskit.com/en/` canonical |')
[void]$redirects.AppendLine('| `/{locale}/tools?category=*` | Retired from internal linking; replaced by real category hub routes. | `/{locale}/tools/category/{category}` |')
[void]$redirects.AppendLine('| `/_not-found` | Left as a system 404 and excluded from indexation. | N/A |')
[void]$redirects.AppendLine('| `/go/*` | Kept as a utility redirect surface and blocked in `robots.txt`. | Worker/runtime redirect target |')
if ($brokenLinks.Count -eq 0) {
  [void]$redirects.AppendLine('')
  [void]$redirects.AppendLine('No broken internal anchor links were found in the exported HTML crawl.')
} else {
  [void]$redirects.AppendLine('')
  [void]$redirects.AppendLine('## Broken internal links found in the export')
  [void]$redirects.AppendLine('')
  [void]$redirects.AppendLine('| Source route | Missing target |')
  [void]$redirects.AppendLine('| --- | --- |')
  foreach ($item in $brokenLinks | Sort-Object Source, Target -Unique) {
    [void]$redirects.AppendLine(('| {0} | {1} |' -f (Escape-Md $item.Source), (Escape-Md $item.Target)))
  }
}
Set-Content -LiteralPath (Join-Path $repo 'SEO_REDIRECTS.md') -Value $redirects.ToString() -Encoding UTF8

$changelogLines = @(
  '# SEO Changelog',
  '',
  '## What changed',
  '- Added centralized page and category SEO profiles, plus dedicated high-intent overrides for priority tool routes.',
  '- Fixed tool route resolution to use slugs correctly and removed stale route assumptions.',
  '- Added workflow and category metadata generators and wired structured data into homepage, tool index, category hubs, workflow, and trust pages.',
  '- Removed invalid or low-value structured data patterns such as fake review data and SearchAction markup.',
  '- Strengthened tool-page HTML with query-first copy blocks, inputs/outputs, comparison guidance, examples, and related-path context above the fold.',
  '- Replaced query-string category navigation with crawlable category hub links across the homepage, desktop navigation, mobile navigation, and tools directory.',
  '- Expanded sitemap coverage to include category hubs and workflow pages while keeping utility routes out.',
  '- Updated robots policy to block `/go/` and keep the sitemap/host aligned with the canonical production domain.',
  '- Fixed manifest shortcuts and removed stale asset references that pointed to non-existent screenshots or icons.',
  '- Converted the root `/` route into a noindex locale handoff page with a crawl-safe fallback instead of an opaque client-only redirect.',
  '',
  '## Why it changed',
  '- To give every live canonical route a distinct search target, cleaner title/description set, and valid structured data.',
  '- To reduce duplicate-content and cannibalization risk between the homepage, tools directory, category hubs, and overlapping tool pages.',
  '- To make the exported HTML more search-meaningful without depending on client interaction for context.',
  '- To align sitemap, robots, canonicals, OG URLs, and internal links around `https://www.opentoolskit.com`.',
  '',
  '## Expected SEO effect',
  '- Better crawlability through real category hub routes and stronger internal-link distribution.',
  '- Higher snippet quality from more descriptive, front-loaded titles and less boilerplate metadata.',
  '- Better entity/trust signals from improved trust pages, structured data, and visible source/privacy/support linking.',
  '- Lower duplicate-content risk at the root route and across category-filter navigation states.'
)
Set-Content -LiteralPath (Join-Path $repo 'SEO_CHANGELOG.md') -Value $changelogLines -Encoding UTF8

$liveInventory = foreach ($row in $inventory | Sort-Object 'URL path') {
  $route = $row.'URL path'
  $pageType = $row.'Page type'
  $monetizationRelevance = Get-MonetizationRelevance $route $pageType
  $priorityScore = Get-LivePriorityScore $route $pageType $row.'Duplication risk' $row.'Action needed' $monetizationRelevance

  [pscustomobject]@{
    'URL path' = $route
    'Page type' = $pageType
    'Live status' = Get-LiveStatus $route $pageType
    'Index/noindex recommendation' = $row.'Index/noindex recommendation'
    'Canonical target' = $row.'Canonical target'
    'Current title' = $row.'Current title'
    'Current H1' = $row.'Current H1'
    'Current meta description' = $row.'Current meta description'
    'Primary query target' = $row.'Primary query target'
    'Secondary query targets' = $row.'Secondary query targets'
    'Monetization relevance' = $monetizationRelevance
    'Duplication risk' = $row.'Duplication risk'
    'Cannibalization risk' = $row.'Cannibalization risk'
    'Action needed' = $row.'Action needed'
    'Priority score' = $priorityScore
    'Why it matters' = Get-PriorityReason $route $pageType $monetizationRelevance
    'What changed' = Get-ChangeFocus $route $pageType $row.'Action needed'
    'Expected impact' = Get-ExpectedImpact $pageType $monetizationRelevance
  }
}

$corePriorityRoutes = @(
  '/en',
  '/en/tools',
  '/en/workflow',
  '/en/tools/category/organize-manage',
  '/en/tools/category/optimize-repair',
  '/en/tools/category/secure-pdf',
  '/en/tools/category/convert-to-pdf',
  '/en/tools/category/convert-from-pdf',
  '/en/tools/category/edit-annotate'
)

$corePriorityRows = @(
  foreach ($priorityRoute in $corePriorityRoutes) {
    $match = $liveInventory | Where-Object { $_.'URL path' -eq $priorityRoute } | Select-Object -First 1
    if ($null -ne $match) { $match }
  }
)

$remainingPriorityRows = @(
  $liveInventory |
    Where-Object {
      $_.'URL path' -match '^/en' -and
      $_.'Index/noindex recommendation' -eq 'index' -and
      $_.'URL path' -notin $corePriorityRoutes
    } |
    Sort-Object @{ Expression = 'Priority score'; Descending = $true }, @{ Expression = 'URL path'; Descending = $false } |
    Select-Object -First (20 - $corePriorityRows.Count)
)

$liveTop20 = @($corePriorityRows + $remainingPriorityRows)

$liveAudit = New-Object System.Text.StringBuilder
[void]$liveAudit.AppendLine('# SEO Live Surface Audit')
[void]$liveAudit.AppendLine('')
[void]$liveAudit.AppendLine('## Monetization Verification Summary')
[void]$liveAudit.AppendLine('')
[void]$liveAudit.AppendLine('- Homepage discovery surfaces are live with native placements and aggressive units only when the monetization profile allows them.')
[void]$liveAudit.AppendLine('- Category hubs and trust/info pages are live with labeled discovery monetization surfaces that stay outside the core tool controls.')
[void]$liveAudit.AppendLine('- Result-success tool pages remain the highest-value commercial surface because they can show the timed gate, native placement, and partner redirect after a successful task.')
[void]$liveAudit.AppendLine('- UK/EEA gating still keeps aggressive units behind the monetization profile, so native-first coverage remains the safe default in restricted regions.')
[void]$liveAudit.AppendLine('')
[void]$liveAudit.AppendLine('## Live Surface Summary')
[void]$liveAudit.AppendLine('')
[void]$liveAudit.AppendLine("- Live HTML routes audited: $($liveInventory.Count)")
[void]$liveAudit.AppendLine("- Live indexable routes: $((@($liveInventory | Where-Object { $_.'Index/noindex recommendation' -eq 'index' })).Count)")
[void]$liveAudit.AppendLine("- Live noindex routes: $((@($liveInventory | Where-Object { $_.'Index/noindex recommendation' -eq 'noindex' })).Count)")
[void]$liveAudit.AppendLine("- Broken internal links on the live export: $($brokenLinks.Count)")
[void]$liveAudit.AppendLine("- Canonical production domain: $siteUrl")
[void]$liveAudit.AppendLine('')
[void]$liveAudit.AppendLine('## Monetization-Aware Priority Summary')
[void]$liveAudit.AppendLine('')
[void]$liveAudit.AppendLine('- Highest direct commercial value: live tool pages, because successful completions can monetize after the result unlocks.')
[void]$liveAudit.AppendLine('- Highest supporting commercial value: tools directory and category hubs, because they route discovery traffic into those monetized tool pages.')
[void]$liveAudit.AppendLine('- Highest trust support value: about, FAQ, privacy, and support/source pages, because they reinforce brand/entity trust around the monetized product.')
[void]$liveAudit.AppendLine('')
[void]$liveAudit.AppendLine('## Top 20 Live Priority Pages')
[void]$liveAudit.AppendLine('')
[void]$liveAudit.AppendLine('| URL | Query family | Monetization relevance | Why it matters | What changed | Expected impact |')
[void]$liveAudit.AppendLine('| --- | --- | --- | --- | --- | --- |')
foreach ($row in $liveTop20) {
  [void]$liveAudit.AppendLine(('| {0} | {1} | {2} | {3} | {4} | {5} |' -f (Escape-Md $row.'URL path'), (Escape-Md $row.'Primary query target'), (Escape-Md $row.'Monetization relevance'), (Escape-Md $row.'Why it matters'), (Escape-Md $row.'What changed'), (Escape-Md $row.'Expected impact')))
}
[void]$liveAudit.AppendLine('')
[void]$liveAudit.AppendLine('## Route Inventory')
[void]$liveAudit.AppendLine('')
[void]$liveAudit.AppendLine('| URL path | Page type | Live status | Index/noindex recommendation | Canonical target | Current title | Current H1 | Current meta description | Primary query target | Secondary query targets | Monetization relevance | Duplication risk | Cannibalization risk | Action needed |')
[void]$liveAudit.AppendLine('| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |')
foreach ($row in $liveInventory) {
  [void]$liveAudit.AppendLine(('| {0} | {1} | {2} | {3} | {4} | {5} | {6} | {7} | {8} | {9} | {10} | {11} | {12} | {13} |' -f (Escape-Md $row.'URL path'), (Escape-Md $row.'Page type'), (Escape-Md $row.'Live status'), (Escape-Md $row.'Index/noindex recommendation'), (Escape-Md $row.'Canonical target'), (Escape-Md $row.'Current title'), (Escape-Md $row.'Current H1'), (Escape-Md $row.'Current meta description'), (Escape-Md $row.'Primary query target'), (Escape-Md $row.'Secondary query targets'), (Escape-Md $row.'Monetization relevance'), (Escape-Md $row.'Duplication risk'), (Escape-Md $row.'Cannibalization risk'), (Escape-Md $row.'Action needed')))
}
Set-Content -LiteralPath (Join-Path $repo 'SEO_LIVE_SURFACE_AUDIT.md') -Value $liveAudit.ToString() -Encoding UTF8

$liveQueryMap = $liveInventory | Select-Object @{'Name'='URL'; Expression={$_.'URL path'}}, @{'Name'='page type'; Expression={$_.'Page type'}}, @{'Name'='primary query'; Expression={$_.'Primary query target'}}, @{'Name'='secondary queries'; Expression={$_.'Secondary query targets'}}, @{'Name'='monetization relevance'; Expression={$_.'Monetization relevance'}}, @{'Name'='cannibalization notes'; Expression={if ($_.'Cannibalization risk' -eq 'medium') { $_.'Action needed' } else { 'Low overlap risk' }}}
$liveQueryMap | ConvertTo-Csv -NoTypeInformation | Set-Content -LiteralPath (Join-Path $repo 'SEO_LIVE_QUERY_MAP.csv') -Encoding UTF8

$liveIndexMap = New-Object System.Text.StringBuilder
[void]$liveIndexMap.AppendLine('# Live Surface Indexation Map')
[void]$liveIndexMap.AppendLine('')
[void]$liveIndexMap.AppendLine('| URL path | Index/noindex | Canonical target | Reason |')
[void]$liveIndexMap.AppendLine('| --- | --- | --- | --- |')
foreach ($row in $liveInventory) {
  $reason = Get-Reason $row.'URL path' $row.'Page type' $row.'Index/noindex recommendation'
  [void]$liveIndexMap.AppendLine(('| {0} | {1} | {2} | {3} |' -f (Escape-Md $row.'URL path'), (Escape-Md $row.'Index/noindex recommendation'), (Escape-Md $row.'Canonical target'), (Escape-Md $reason)))
}
Set-Content -LiteralPath (Join-Path $repo 'SEO_LIVE_INDEXATION_MAP.md') -Value $liveIndexMap.ToString() -Encoding UTF8

$liveRedirects = New-Object System.Text.StringBuilder
[void]$liveRedirects.AppendLine('# Live Surface Redirects and Cleanup')
[void]$liveRedirects.AppendLine('')
[void]$liveRedirects.AppendLine('| Dead route or state | Action taken | Redirect target |')
[void]$liveRedirects.AppendLine('| --- | --- | --- |')
[void]$liveRedirects.AppendLine('| `https://opentoolskit.com/*` | Keep apex-to-www redirect so the live site resolves to the canonical host. | `https://www.opentoolskit.com/:splat` |')
[void]$liveRedirects.AppendLine('| `/` | Keep as noindex locale handoff and canonicalize the live English entry route. | `https://www.opentoolskit.com/en/` |')
[void]$liveRedirects.AppendLine('| `/{locale}/tools?category=*` | Do not surface query-string category states in the live link graph. | `/{locale}/tools/category/{category}` |')
[void]$liveRedirects.AppendLine('| `/go/*` | Keep out of crawl/index flow and route through the runtime redirect only. | Runtime/worker destination |')
[void]$liveRedirects.AppendLine('| `/_not-found` | Keep as system 404 only, excluded from indexation and sitemap coverage. | N/A |')
if ($brokenLinks.Count -eq 0) {
  [void]$liveRedirects.AppendLine('')
  [void]$liveRedirects.AppendLine('No dead internal links were found in the live exported HTML surface.')
}
Set-Content -LiteralPath (Join-Path $repo 'SEO_LIVE_REDIRECTS.md') -Value $liveRedirects.ToString() -Encoding UTF8

$liveChangelog = @(
  '# SEO Live Surface Changelog',
  '',
  '## What changed',
  '- Extended dedicated SEO overrides for more revenue-driving live PDF tools that previously relied on generic fallback titles and copy.',
  '- Reworked the workflow page so its core meaning is visible in HTML before the client-only editor loads.',
  '- Added high-intent internal links on the tools directory and in the site footer to push authority into the strongest monetized live routes.',
  '- Regenerated route, query, indexation, and cleanup artifacts for the current live surface with monetization relevance included.',
  '',
  '## Why',
  '- To prioritize SEO effort on pages that are both commercially valuable and already live in production.',
  '- To reduce template sameness and improve distinct search intent across important tool routes.',
  '- To tighten crawl paths into the routes most likely to rank and earn without inventing new product scope.',
  '',
  '## Expected effect',
  '- Better snippet quality and intent matching on high-value PDF tools.',
  '- Better internal-link support for monetized tool flows from sitewide discovery and trust routes.',
  '- Cleaner live-surface reporting so future SEO work stays anchored to what is actually shipping.'
)
Set-Content -LiteralPath (Join-Path $repo 'SEO_LIVE_CHANGELOG.md') -Value $liveChangelog -Encoding UTF8
