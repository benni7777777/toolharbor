'use client';

import { useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';
import type { MonetizationContext, MonetizationPreviewMode, MonetizationProfile } from '@/types/monetization';
import { getLocalStorageItem, setLocalStorageItem } from '@/lib/monetization/storage';
import { isHardGateFeatureEnabled } from '@/lib/monetization/feature-flags';

const DEFAULT_CONTEXT: MonetizationContext = {
  country: 'unknown',
  isUkEea: true,
};

const PREVIEW_QUERY_KEY = 'otk_monetization_preview';
const PREVIEW_MODES: MonetizationPreviewMode[] = ['auto', 'aggressive', 'native-only', 'off'];

let cachedContextPromise: Promise<MonetizationContext> | null = null;

async function fetchMonetizationContext(): Promise<MonetizationContext> {
  if (typeof window === 'undefined') {
    return DEFAULT_CONTEXT;
  }

  if (!cachedContextPromise) {
    cachedContextPromise = fetch('/api/monetization/context', {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    })
      .then(async (response) => {
        if (!response.ok) {
          return DEFAULT_CONTEXT;
        }

        const data = await response.json();
        return {
          country: typeof data.country === 'string' ? data.country : 'unknown',
          isUkEea: Boolean(data.isUkEea),
        };
      })
      .catch(() => DEFAULT_CONTEXT);
  }

  return cachedContextPromise;
}

function getPreviewMode(): MonetizationPreviewMode {
  if (typeof window === 'undefined') {
    return 'auto';
  }

  const searchParams = new URLSearchParams(window.location.search);
  const queryValue = searchParams.get(PREVIEW_QUERY_KEY);
  const previewKey = siteConfig.monetizationRules.previewOverrideStorageKey;
  const allowAggressivePreview = process.env.NODE_ENV !== 'production';

  if (queryValue && PREVIEW_MODES.includes(queryValue as MonetizationPreviewMode)) {
    if (queryValue === 'aggressive' && !allowAggressivePreview) {
      setLocalStorageItem(previewKey, 'auto');
      return 'auto';
    }

    setLocalStorageItem(previewKey, queryValue);
    return queryValue as MonetizationPreviewMode;
  }

  const storedValue = getLocalStorageItem(previewKey);
  if (storedValue && PREVIEW_MODES.includes(storedValue as MonetizationPreviewMode)) {
    if (storedValue === 'aggressive' && !allowAggressivePreview) {
      setLocalStorageItem(previewKey, 'auto');
      return 'auto';
    }

    return storedValue as MonetizationPreviewMode;
  }

  return 'auto';
}

export function useMonetizationProfile(): MonetizationProfile {
  const [context, setContext] = useState<MonetizationContext>(DEFAULT_CONTEXT);
  const [isLoading, setIsLoading] = useState(true);
  const [previewMode, setPreviewMode] = useState<MonetizationPreviewMode>('auto');

  useEffect(() => {
    setPreviewMode(getPreviewMode());

    let mounted = true;
    fetchMonetizationContext().then((resolved) => {
      if (!mounted) {
        return;
      }

      setContext(resolved);
      setIsLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const allowNativeUnits = previewMode !== 'off';
  const eligibleForAggressiveUnits = !context.isUkEea && !isLoading;
  const allowAggressiveUnits =
    eligibleForAggressiveUnits && (previewMode === 'aggressive' || previewMode === 'auto');
  const allowHardGate =
    isHardGateFeatureEnabled() &&
    allowAggressiveUnits &&
    siteConfig.monetizationRules.hardGateSeconds > 0;

  return {
    ...context,
    isLoading,
    previewMode,
    allowNativeUnits,
    allowAggressiveUnits,
    allowHardGate,
  };
}
