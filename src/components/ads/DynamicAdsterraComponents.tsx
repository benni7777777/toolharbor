'use client';

import dynamic from 'next/dynamic';
import type { AdsterraDisplayBannerProps } from '@/components/ads/AdsterraDisplayBanner';
import type { AdsterraInlineBannerProps } from '@/components/ads/AdsterraInlineBanner';
import type { AdsterraNativeBannerProps } from '@/components/ads/AdsterraNativeBanner';
import type { AdsterraSessionScriptsProps } from '@/components/ads/AdsterraSessionScripts';

export const AdsterraDisplayBanner = dynamic<AdsterraDisplayBannerProps>(
  () => import('@/components/ads/AdsterraDisplayBanner'),
  { ssr: false },
);

export const AdsterraNativeBanner = dynamic<AdsterraNativeBannerProps>(
  () => import('@/components/ads/AdsterraNativeBanner'),
  { ssr: false },
);

export const AdsterraInlineBanner = dynamic<AdsterraInlineBannerProps>(
  () => import('@/components/ads/AdsterraInlineBanner'),
  { ssr: false },
);

export const AdsterraSessionScripts = dynamic<AdsterraSessionScriptsProps>(
  () => import('@/components/ads/AdsterraSessionScripts'),
  { ssr: false },
);
