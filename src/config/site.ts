export type ThemePreference = 'light' | 'dark' | 'system';
export type ToolFamily =
  | 'pdf'
  | 'image'
  | 'text'
  | 'publishing'
  | 'developer'
  | 'calculator'
  | 'social';

export const siteConfig = {
  name: 'OpenToolsKit',
  shortName: 'OTK',
  description:
    'Open-source browser tools for PDF, image, text, publishing, developer, calculator, and social workflows. Private by default, fast by design, and built for multilingual discovery.',
  launchDescription:
    'Private, browser-first tools for PDFs today and a broader OpenToolsKit platform tomorrow.',
  url: 'https://www.opentoolskit.com',
  canonicalHost: 'www.opentoolskit.com',
  apexHost: 'opentoolskit.com',
  ogImage: '/images/og-image.png',
  creator: 'OpenToolsKit',
  defaultLocale: 'en',
  links: {
    github: 'https://github.com/benni7777777/toolharbor',
    githubIssues: 'https://github.com/benni7777777/toolharbor/issues',
    githubDiscussions: '',
    x: 'https://x.com/OpenToolsKit',
    source: 'https://github.com/benni7777777/toolharbor',
  },
  legal: {
    license: 'AGPL-3.0',
    noticeLabel: 'Derived from PDFCraft',
    noticeSummary:
      'OpenToolsKit is derived from PDFCraft. Upstream attribution and source-availability obligations remain visible across the product.',
    upstreamName: 'PDFCraft',
    upstreamUrl: 'https://github.com/PDFCraftTool/pdfcraft',
  },
  seo: {
    titleTemplate: '%s | OpenToolsKit',
    defaultTitle: 'OpenToolsKit | Browser Tools For PDF, Image, Text, Publishing, and SEO',
    twitterHandle: '@OpenToolsKit',
    locale: 'en_US',
    keywords: [
      'OpenToolsKit',
      'open source tools',
      'browser PDF tools',
      'image tools',
      'text tools',
      'SEO tools',
      'developer utilities',
      'social media tools',
      'private online tools',
      'client-side processing',
    ],
  },
  theme: {
    storageKey: 'opentoolskit-theme-preference',
    defaultMode: 'system' as ThemePreference,
    lightThemeColor: '#f4efe4',
    darkThemeColor: '#071217',
  },
  ads: {
    enabled: true,
    disclosureLabel: 'Sponsored',
    disclosureSummary:
      'Ads and partner offers help keep OpenToolsKit open source. Third-party networks supply creatives and landing pages.',
    actionDisclosure:
      'Core tool results stay available without ad or partner interaction.',
    providers: {
      adsterra: {
        enabled: true,
        nativeBanner: {
          scriptSrc:
            'https://pl29133190.profitablecpmratenetwork.com/13abb80829d1e16b339d390deb70c6a5/invoke.js',
          containerId: 'container-13abb80829d1e16b339d390deb70c6a5',
        },
        popunder: {
          scriptSrc:
            'https://pl29133188.profitablecpmratenetwork.com/61/f4/91/61f491d249763152efe5f91b4bc03b34.js',
          sessionKey: 'opentoolskit-adsterra-popunder-fired',
        },
        socialBar: {
          scriptSrc:
            'https://pl29133189.profitablecpmratenetwork.com/e9/36/e3/e936e3ac148536d9b73ee692803490a2.js',
          sessionKey: 'opentoolskit-adsterra-socialbar-fired',
        },
      },
      zeydoo: {
        enabled: true,
        redirectPathPrefix: '/go',
        providerQueryValue: 'zeydoo',
        placementId: 'post-result-primary',
      },
    },
    placements: {
      homepage: {
        nativeBanner: true,
        popunder: true,
        socialBar: true,
      },
      toolsIndex: {
        nativeBanner: true,
        popunder: false,
        socialBar: false,
      },
      categoryHub: {
        nativeBanner: true,
        popunder: true,
        socialBar: false,
      },
      infoPages: {
        nativeBanner: true,
        popunder: true,
        socialBar: true,
      },
      resultSuccess: {
        nativeBanner: true,
        popunder: true,
        socialBar: true,
        partnerProvider: 'zeydoo',
      },
    },
  },
  sponsorship: {
    enabled: true,
    storageKey: 'opentoolskit-sponsor-dismissed',
    redirectPathPrefix: '/go',
    label: 'Sponsored',
    title: 'Partner suggestion',
    eyebrow: 'Supports OpenToolsKit',
    disclosure:
      'Partner links and ad creatives are served by third-party networks. Core results stay available without sponsor interaction.',
    helperText:
      'Opening a partner link helps fund the project and its AGPL source distribution.',
  },
  cloudflare: {
    pagesBuildCommand: 'npm run build',
    pagesOutputDirectory: 'out',
    workerName: 'opentoolskit-sponsor-redirect',
    redirectPathPrefix: '/go',
  },
  toolFamilies: [
    'pdf',
    'image',
    'text',
    'publishing',
    'developer',
    'calculator',
    'social',
  ] as ToolFamily[],
} as const;

export const navConfig = {
  mainNav: [
    { title: 'Home', href: '/' },
    { title: 'Tools', href: '/tools' },
    { title: 'Workflow', href: '/workflow' },
    { title: 'About', href: '/about' },
    { title: 'FAQ', href: '/faq' },
  ],
  footerNav: [
    { title: 'Privacy', href: '/privacy' },
    { title: 'Support', href: '/contact' },
    { title: 'Source', href: siteConfig.links.source },
  ],
} as const;
