'use client';

import dynamic from 'next/dynamic';
import { monetizationRuntime } from '@/lib/monetization/review-mode';

const SiteMonetizationRails = dynamic(
  () => import('@/components/ads/SiteMonetizationRails'),
  { ssr: false },
);

const MonetizationInteractionTriggers = dynamic(
  () => import('@/components/ads/MonetizationInteractionTriggers'),
  { ssr: false },
);

export function MonetizationClientMounts() {
  if (monetizationRuntime.adsenseReviewMode) {
    return null;
  }

  return (
    <>
      <SiteMonetizationRails />
      <MonetizationInteractionTriggers />
    </>
  );
}

export default MonetizationClientMounts;
