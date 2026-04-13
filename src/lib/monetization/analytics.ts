'use client';

import type { MonetizationEventPayload } from '@/types/monetization';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackMonetizationEvent(payload: MonetizationEventPayload) {
  if (typeof window === 'undefined') {
    return;
  }

  const { event, ...rest } = payload;
  const eventPayload = {
    event: 'otk_monetization',
    monetizationEvent: event,
    ...rest,
    timestamp: Date.now(),
  };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(eventPayload);
  window.dispatchEvent(new CustomEvent('otk:monetization', { detail: eventPayload }));
}
