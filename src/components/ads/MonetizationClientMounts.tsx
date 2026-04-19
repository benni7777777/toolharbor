'use client';

import dynamic from 'next/dynamic';

const SiteMonetizationRails = dynamic(
  () => import('@/components/ads/SiteMonetizationRails'),
  { ssr: false },
);

const MonetizationInteractionTriggers = dynamic(
  () => import('@/components/ads/MonetizationInteractionTriggers'),
  { ssr: false },
);

export function MonetizationClientMounts() {
  return (
    <>
      <SiteMonetizationRails />
      <MonetizationInteractionTriggers />
    </>
  );
}

export default MonetizationClientMounts;
