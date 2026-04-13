'use client';

import { useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';
import type { MonetizationContext, MonetizationPreviewMode, MonetizationProfile } from '@/types/monetization';
import { getLocalStorageItem, setLocalStorageItem } from '@/lib/monetization/storage';

const DEFAULT_CONTEXT: MonetizationContext = {
  country: 'unknown',
  isUkEea: true,
};

const PREVIEW_QUERY_KEY = 'otk_monetization_preview';

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

  if (queryValue && ['auto', 'aggressive', 'native-only', 'off'].includes(queryValue)) {
    setLocalStorageItem(previewKey, queryValue);
    return queryValue as MonetizationPreviewMode;
  }

  const storedValue = getLocalStorageItem(previewKey);
  if (storedValue && ['auto', 'aggressive', 'native-only', 'off'].includes(storedValue)) {
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
  const allowAggressiveUnits =
    previewMode === 'aggressive' ||
    (previewMode === 'auto' && !context.isUkEea && !isLoading);
  const allowHardGate = allowAggressiveUnits && siteConfig.monetizationRules.hardGateSeconds > 0;

  return {
    ...context,
    isLoading,
    previewMode,
    allowNativeUnits,
    allowAggressiveUnits,
    allowHardGate,
  };
}
