'use client';

import type { MonetizationEventPayload } from '@/types/monetization';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    __OTK_MONETIZATION_DEBUG__?: {
      sessionId: string;
      events: Array<Record<string, unknown>>;
      lastEvent?: Record<string, unknown>;
    };
  }
}

function getDebugSessionId() {
  const existing = window.__OTK_MONETIZATION_DEBUG__?.sessionId;
  if (existing) {
    return existing;
  }

  return `otk-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function isDebugEnabled() {
  if (process.env.NODE_ENV !== 'production') {
    return true;
  }

  return new URLSearchParams(window.location.search).get('otk_monetization_debug') === '1';
}

export function trackMonetizationEvent(payload: MonetizationEventPayload) {
  if (typeof window === 'undefined') {
    return;
  }

  const { event, ...rest } = payload;
  const sessionId = payload.sessionId ?? getDebugSessionId();
  const eventPayload = {
    event: 'otk_monetization',
    monetizationEvent: event,
    ...rest,
    route: payload.route ?? window.location.pathname,
    sessionId,
    timestamp: Date.now(),
  };

  window.__OTK_MONETIZATION_DEBUG__ = window.__OTK_MONETIZATION_DEBUG__ ?? {
    sessionId,
    events: [],
  };
  window.__OTK_MONETIZATION_DEBUG__.events.push(eventPayload);
  window.__OTK_MONETIZATION_DEBUG__.lastEvent = eventPayload;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(eventPayload);
  window.dispatchEvent(new CustomEvent('otk:monetization', { detail: eventPayload }));

  if (isDebugEnabled()) {
    console.info('[OpenToolsKit monetization]', event, eventPayload);
  }
}

export function getMonetizationDebugSnapshot() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.__OTK_MONETIZATION_DEBUG__ ?? null;
}
