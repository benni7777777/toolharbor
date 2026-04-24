import { monetizationRuntime } from '@/lib/monetization/review-mode';

export type ThemePreference = 'light' | 'dark' | 'system';
export type ToolFamily =
  | 'pdf'
  | 'image'
  | 'text'
  | 'publishing'
  | 'developer'
  | 'calculator'
  | 'social';

type AdsterraAtOptions = Record<string, string | number | boolean | Record<string, unknown>>;

function readPublicEnv(name: string, testFallback = '') {
  const value = process.env[name]?.trim() ?? '';
  if (value) {
    return value;
  }

  return process.env.NODE_ENV === 'test' ? testFallback : '';
}

function parseAdsterraAtOptions(raw: string | undefined) {
  if (!raw?.trim()) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as AdsterraAtOptions;
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
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
    height: 300,
    format: 'iframe',
  },
  mobileSticky: {
    width: 320,
    height: 50,
    format: 'iframe',
  },
  banner468x60: {
    width: 468,
    height: 60,
    format: 'iframe',
  },
} as const;

function buildDisplayBannerConfig({
  scriptEnv,
  atOptionsEnv,
  containerId,
  label,
  width,
  height,
  minViewportWidth,
  maxViewportWidth,
}: {
  scriptEnv: string;
  atOptionsEnv: string;
  containerId: string;
  label: string;
  width: number;
  height: number;
  minViewportWidth?: number;
  maxViewportWidth?: number;
}) {
  const scriptSrc = readPublicEnv(scriptEnv);
  const atOptions = parseAdsterraAtOptions(readPublicEnv(atOptionsEnv));

  return {
    enabled: monetizationRuntime.adsterraEnabled && Boolean(scriptSrc && atOptions),
    scriptSrc,
    containerId,
    label,
    width,
    height,
    minViewportWidth,
    maxViewportWidth,
    env: {
      scriptSrc: scriptEnv,
      atOptions: atOptionsEnv,
    },
    atOptions: atOptions ?? {},
  };
}

const adsterraNativeScriptSrc = readPublicEnv(
  'NEXT_PUBLIC_ADSTERRA_NATIVE_SCRIPT_SRC',
  'https://ads.example/native.js',
);
const adsterraNativeContainerId = readPublicEnv(
  'NEXT_PUBLIC_ADSTERRA_NATIVE_CONTAINER_ID',
  'container-test-native-banner',
) || 'otk-adsterra-native-banner';
const adsterraPopunderScriptSrc = readPublicEnv(
  'NEXT_PUBLIC_ADSTERRA_POPUNDER_SCRIPT_SRC',
  'https://ads.example/popunder.js',
);
const adsterraSocialBarScriptSrc = readPublicEnv(
  'NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR_SCRIPT_SRC',
  'https://ads.example/socialbar.js',
);
const supportEmail = readPublicEnv('NEXT_PUBLIC_SUPPORT_EMAIL') || 'support@opentoolskit.com';

export const siteConfig = {
  name: 'OpenToolsKit',
  shortName: 'OTK',
  description:
    'Open-source browser tools for PDF and document workflows. Private by default, fast in the browser, and built with visible AGPL source availability.',
  launchDescription:
    'Private, browser-first document tools with public source, clear attribution, and practical support paths.',
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
    supportEmail,
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
  },
  theme: {
    storageKey: 'opentoolskit-theme-preference',
    defaultMode: 'system' as ThemePreference,
    lightThemeColor: '#f4efe4',
    darkThemeColor: '#071217',
  },
  ads: {
    enabled: monetizationRuntime.adsterraEnabled,
    disclosureLabel: 'Sponsored',
    disclosureSummary:
      'OpenToolsKit stays free thanks to advertising and partner offers. Ads and partner links are delivered by third-party networks.',
    actionDisclosure:
      'We do not individually control or endorse every creative or landing page.',
    providers: {
      adsterra: {
        enabled: monetizationRuntime.adsterraEnabled,
        nativeBanner: {
          enabled: monetizationRuntime.adsterraEnabled && Boolean(adsterraNativeScriptSrc),
          scriptSrc: adsterraNativeScriptSrc,
          containerId: adsterraNativeContainerId,
        },
        popunder: {
          enabled: monetizationRuntime.adsterraEnabled && Boolean(adsterraPopunderScriptSrc),
          scriptSrc: adsterraPopunderScriptSrc,
          cooldownStorageKey: 'opentoolskit-adsterra-popunder-last-fired',
        },
        socialBar: {
          enabled: monetizationRuntime.adsterraEnabled && Boolean(adsterraSocialBarScriptSrc),
          scriptSrc: adsterraSocialBarScriptSrc,
          cooldownStorageKey: 'opentoolskit-adsterra-socialbar-last-fired',
        },
        displayBanners: {
          // Display/banner iframe units are deployment-specific public env values.
          // Do not hardcode these zone URLs or keys in the open-source repo.
          leaderboard: buildDisplayBannerConfig({
            scriptEnv: 'NEXT_PUBLIC_ADSTERRA_LEADERBOARD_SCRIPT_SRC',
            atOptionsEnv: 'NEXT_PUBLIC_ADSTERRA_LEADERBOARD_AT_OPTIONS',
            containerId: 'otk-adsterra-leaderboard',
            label: 'Desktop leaderboard',
            width: adsterraDisplayBannerDefaults.leaderboard.width,
            height: adsterraDisplayBannerDefaults.leaderboard.height,
            minViewportWidth: 900,
          }),
          rectangle: buildDisplayBannerConfig({
            scriptEnv: 'NEXT_PUBLIC_ADSTERRA_RECTANGLE_SCRIPT_SRC',
            atOptionsEnv: 'NEXT_PUBLIC_ADSTERRA_RECTANGLE_AT_OPTIONS',
            containerId: 'otk-adsterra-rectangle',
            label: 'Desktop rectangle',
            width: adsterraDisplayBannerDefaults.rectangle.width,
            height: adsterraDisplayBannerDefaults.rectangle.height,
            minViewportWidth: 1024,
          }),
          leftRail: buildDisplayBannerConfig({
            scriptEnv: 'NEXT_PUBLIC_ADSTERRA_LEFT_RAIL_SCRIPT_SRC',
            atOptionsEnv: 'NEXT_PUBLIC_ADSTERRA_LEFT_RAIL_AT_OPTIONS',
            containerId: 'otk-adsterra-left-rail',
            label: 'Desktop left rail',
            width: adsterraDisplayBannerDefaults.leftRail.width,
            height: adsterraDisplayBannerDefaults.leftRail.height,
            minViewportWidth: 1280,
          }),
          rightRail: buildDisplayBannerConfig({
            scriptEnv: 'NEXT_PUBLIC_ADSTERRA_RIGHT_RAIL_SCRIPT_SRC',
            atOptionsEnv: 'NEXT_PUBLIC_ADSTERRA_RIGHT_RAIL_AT_OPTIONS',
            containerId: 'otk-adsterra-right-rail',
            label: 'Desktop right rail',
            width: adsterraDisplayBannerDefaults.rightRail.width,
            height: adsterraDisplayBannerDefaults.rightRail.height,
            minViewportWidth: 1280,
          }),
          mobileSticky: buildDisplayBannerConfig({
            scriptEnv: 'NEXT_PUBLIC_ADSTERRA_MOBILE_STICKY_SCRIPT_SRC',
            atOptionsEnv: 'NEXT_PUBLIC_ADSTERRA_MOBILE_STICKY_AT_OPTIONS',
            containerId: 'otk-adsterra-mobile-sticky',
            label: 'Mobile sticky banner',
            width: adsterraDisplayBannerDefaults.mobileSticky.width,
            height: adsterraDisplayBannerDefaults.mobileSticky.height,
            maxViewportWidth: 1023,
          }),
          banner468x60: buildDisplayBannerConfig({
            scriptEnv: 'NEXT_PUBLIC_ADSTERRA_468X60_SCRIPT_SRC',
            atOptionsEnv: 'NEXT_PUBLIC_ADSTERRA_468X60_AT_OPTIONS',
            containerId: 'otk-adsterra-468x60',
            label: 'Inline tablet banner',
            width: adsterraDisplayBannerDefaults.banner468x60.width,
            height: adsterraDisplayBannerDefaults.banner468x60.height,
            minViewportWidth: 640,
            maxViewportWidth: 899,
          }),
        },
      },
      partnerRedirect: {
        enabled: monetizationRuntime.partnerRedirectEnabled,
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
    hardGateSeconds: 10,
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
    enabled: monetizationRuntime.sponsorSurfacesEnabled,
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
    { title: 'Home', href: '/en/' },
    { title: 'Tools', href: '/en/tools/' },
    { title: 'Workflow', href: '/en/workflow/' },
    { title: 'About', href: '/en/about/' },
    { title: 'FAQ', href: '/en/faq/' },
  ],
  footerNav: [
    { title: 'Privacy', href: '/en/privacy/' },
    { title: 'Terms', href: '/en/terms/' },
    { title: 'Editorial policy', href: '/en/editorial/' },
    { title: 'Support', href: '/en/contact/' },
    { title: 'Source', href: siteConfig.links.source },
  ],
} as const;
