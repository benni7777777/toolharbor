export type ThemePreference = 'light' | 'dark' | 'system';
export type ToolFamily =
  | 'pdf'
  | 'image'
  | 'text'
  | 'publishing'
  | 'developer'
  | 'calculator'
  | 'social';

type AdsterraAtOptions = Record<string, string | number | boolean>;

function parseAdsterraAtOptions(raw: string | undefined, fallback: AdsterraAtOptions) {
  if (!raw?.trim()) {
    return fallback;
  }

  try {
    const parsed = JSON.parse(raw) as AdsterraAtOptions;
    return parsed && typeof parsed === 'object' ? parsed : fallback;
  } catch {
    return fallback;
  }
}

const adsterraDisplayBannerDefaults = {
  leaderboard: {
    width: 728,
    height: 90,
    format: 'iframe',
  },
  rectangle: {
    width: 300,
    height: 250,
    format: 'iframe',
  },
  leftRail: {
    width: 160,
    height: 600,
    format: 'iframe',
  },
  rightRail: {
    width: 160,
    height: 600,
    format: 'iframe',
  },
  mobileSticky: {
    width: 320,
    height: 50,
    format: 'iframe',
  },
} as const;

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
      'OpenToolsKit stays free thanks to advertising and partner offers. Ads and partner links are delivered by third-party networks.',
    actionDisclosure:
      'We do not individually control or endorse every creative or landing page.',
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
          cooldownStorageKey: 'opentoolskit-adsterra-popunder-last-fired',
        },
        socialBar: {
          scriptSrc:
            'https://pl29133189.profitablecpmratenetwork.com/e9/36/e3/e936e3ac148536d9b73ee692803490a2.js',
          cooldownStorageKey: 'opentoolskit-adsterra-socialbar-last-fired',
        },
        displayBanners: {
          leaderboard: {
            enabled: Boolean(process.env.NEXT_PUBLIC_ADSTERRA_LEADERBOARD_SCRIPT_SRC),
            scriptSrc: process.env.NEXT_PUBLIC_ADSTERRA_LEADERBOARD_SCRIPT_SRC ?? '',
            containerId: 'otk-adsterra-leaderboard',
            label: 'Desktop leaderboard',
            width: adsterraDisplayBannerDefaults.leaderboard.width,
            height: adsterraDisplayBannerDefaults.leaderboard.height,
            atOptions: parseAdsterraAtOptions(
              process.env.NEXT_PUBLIC_ADSTERRA_LEADERBOARD_AT_OPTIONS,
              adsterraDisplayBannerDefaults.leaderboard,
            ),
          },
          rectangle: {
            enabled: Boolean(process.env.NEXT_PUBLIC_ADSTERRA_RECTANGLE_SCRIPT_SRC),
            scriptSrc: process.env.NEXT_PUBLIC_ADSTERRA_RECTANGLE_SCRIPT_SRC ?? '',
            containerId: 'otk-adsterra-rectangle',
            label: 'Desktop rectangle',
            width: adsterraDisplayBannerDefaults.rectangle.width,
            height: adsterraDisplayBannerDefaults.rectangle.height,
            atOptions: parseAdsterraAtOptions(
              process.env.NEXT_PUBLIC_ADSTERRA_RECTANGLE_AT_OPTIONS,
              adsterraDisplayBannerDefaults.rectangle,
            ),
          },
          leftRail: {
            enabled: Boolean(process.env.NEXT_PUBLIC_ADSTERRA_LEFT_RAIL_SCRIPT_SRC),
            scriptSrc: process.env.NEXT_PUBLIC_ADSTERRA_LEFT_RAIL_SCRIPT_SRC ?? '',
            containerId: 'otk-adsterra-left-rail',
            label: 'Desktop left rail',
            width: adsterraDisplayBannerDefaults.leftRail.width,
            height: adsterraDisplayBannerDefaults.leftRail.height,
            atOptions: parseAdsterraAtOptions(
              process.env.NEXT_PUBLIC_ADSTERRA_LEFT_RAIL_AT_OPTIONS,
              adsterraDisplayBannerDefaults.leftRail,
            ),
          },
          rightRail: {
            enabled: Boolean(process.env.NEXT_PUBLIC_ADSTERRA_RIGHT_RAIL_SCRIPT_SRC),
            scriptSrc: process.env.NEXT_PUBLIC_ADSTERRA_RIGHT_RAIL_SCRIPT_SRC ?? '',
            containerId: 'otk-adsterra-right-rail',
            label: 'Desktop right rail',
            width: adsterraDisplayBannerDefaults.rightRail.width,
            height: adsterraDisplayBannerDefaults.rightRail.height,
            atOptions: parseAdsterraAtOptions(
              process.env.NEXT_PUBLIC_ADSTERRA_RIGHT_RAIL_AT_OPTIONS,
              adsterraDisplayBannerDefaults.rightRail,
            ),
          },
          mobileSticky: {
            enabled: Boolean(process.env.NEXT_PUBLIC_ADSTERRA_MOBILE_STICKY_SCRIPT_SRC),
            scriptSrc: process.env.NEXT_PUBLIC_ADSTERRA_MOBILE_STICKY_SCRIPT_SRC ?? '',
            containerId: 'otk-adsterra-mobile-sticky',
            label: 'Mobile sticky banner',
            width: adsterraDisplayBannerDefaults.mobileSticky.width,
            height: adsterraDisplayBannerDefaults.mobileSticky.height,
            atOptions: parseAdsterraAtOptions(
              process.env.NEXT_PUBLIC_ADSTERRA_MOBILE_STICKY_AT_OPTIONS,
              adsterraDisplayBannerDefaults.mobileSticky,
            ),
          },
        },
      },
      partnerRedirect: {
        enabled: true,
        redirectPathPrefix: '/go',
        providerQueryValue: 'partner',
        placementId: 'post-result-primary',
        providerName: 'partner',
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
        partnerProvider: 'partner',
      },
    },
  },
  monetizationRules: {
    hardGateSeconds: 15,
    hardGatePerSessionMax: 1,
    hardGateSessionStorageKey: 'opentoolskit-hard-gate-count',
    popunderCooldownHours: 12,
    socialBarCooldownHours: 12,
    unlockOnPartnerClick: true,
    closeButtonBehavior: 'after-timer',
    previewOverrideStorageKey: 'opentoolskit-monetization-preview',
    geoPolicy: {
      ukEea: 'native-only-until-consent',
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
      'Ads and partner links are delivered by third-party networks. We do not individually control or endorse every creative or landing page.',
    helperText:
      'OpenToolsKit stays free thanks to advertising and partner offers. Source code for the live service is publicly available under AGPL-3.0.',
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
