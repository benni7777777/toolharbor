export type SponsorPreviewThemeId =
  | 'browser-speed'
  | 'pdf-workflow'
  | 'conversion-shortcut'
  | 'productivity-addon'
  | 'secure-sharing';

export interface SponsorPreviewTheme {
  id: SponsorPreviewThemeId;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  asset: {
    src: string;
    alt: string;
  };
}

const SESSION_RECENT_THEMES_KEY = 'opentoolskit-sponsor-preview-themes';

export const sponsorPreviewThemes: SponsorPreviewTheme[] = [
  {
    id: 'browser-speed',
    eyebrow: 'Browser companion',
    title: 'Speed up your next browser task',
    description: 'Review a sponsored option for faster browsing, cleaner tabs, or smoother daily web work.',
    ctaLabel: 'Open sponsored offer',
    asset: {
      src: '/images/sponsors/browser-speed.svg',
      alt: 'Abstract browser speed sponsor preview',
    },
  },
  {
    id: 'pdf-workflow',
    eyebrow: 'Document helper',
    title: 'Continue with a document-ready setup',
    description: 'See a partner option that may help with editing, signing, storage, or follow-up document tasks.',
    ctaLabel: 'See partner option',
    asset: {
      src: '/images/sponsors/pdf-workflow.svg',
      alt: 'Document productivity sponsor preview',
    },
  },
  {
    id: 'conversion-shortcut',
    eyebrow: 'File shortcut',
    title: 'Find another file conversion path',
    description: 'Open a sponsored route for users comparing file, media, or format tools after this result.',
    ctaLabel: 'Try recommended next step',
    asset: {
      src: '/images/sponsors/conversion-shortcut.svg',
      alt: 'File conversion shortcut sponsor preview',
    },
  },
  {
    id: 'productivity-addon',
    eyebrow: 'Productivity add-on',
    title: 'Explore a useful productivity add-on',
    description: 'A sponsored partner page opens separately so your current tool and download stay intact.',
    ctaLabel: 'Open sponsored offer',
    asset: {
      src: '/images/sponsors/productivity-addon.svg',
      alt: 'Productivity add-on sponsor preview',
    },
  },
  {
    id: 'secure-sharing',
    eyebrow: 'Private sharing',
    title: 'Review a safer sharing option',
    description: 'Compare a partner option for sharing, protecting, or moving files after your browser-side task.',
    ctaLabel: 'See partner option',
    asset: {
      src: '/images/sponsors/secure-sharing.svg',
      alt: 'Secure sharing sponsor preview',
    },
  },
];

function hashSeed(seed: string) {
  let hash = 0;

  for (let index = 0; index < seed.length; index += 1) {
    hash = ((hash << 5) - hash + seed.charCodeAt(index)) | 0;
  }

  return Math.abs(hash);
}

function readRecentThemeIds() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.sessionStorage.getItem(SESSION_RECENT_THEMES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((value): value is SponsorPreviewThemeId =>
      sponsorPreviewThemes.some((theme) => theme.id === value),
    ) : [];
  } catch {
    return [];
  }
}

export function rememberSponsorPreviewTheme(themeId: SponsorPreviewThemeId) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const recent = readRecentThemeIds().filter((id) => id !== themeId);
    window.sessionStorage.setItem(
      SESSION_RECENT_THEMES_KEY,
      JSON.stringify([themeId, ...recent].slice(0, 3)),
    );
  } catch {
    // Ignore storage failures; theme selection remains deterministic from the seed.
  }
}

export function getSponsorPreviewTheme(themeId?: SponsorPreviewThemeId) {
  return sponsorPreviewThemes.find((theme) => theme.id === themeId) ?? sponsorPreviewThemes[0];
}

export function pickSponsorPreviewTheme({
  seed,
  requestedTheme,
  rotate = true,
}: {
  seed: string;
  requestedTheme?: SponsorPreviewThemeId;
  rotate?: boolean;
}) {
  if (requestedTheme) {
    return getSponsorPreviewTheme(requestedTheme);
  }

  const startIndex = hashSeed(seed) % sponsorPreviewThemes.length;
  const recent = rotate ? readRecentThemeIds() : [];
  const orderedThemes = [
    ...sponsorPreviewThemes.slice(startIndex),
    ...sponsorPreviewThemes.slice(0, startIndex),
  ];
  const selected = orderedThemes.find((theme) => !recent.includes(theme.id)) ?? orderedThemes[0];

  return selected;
}
