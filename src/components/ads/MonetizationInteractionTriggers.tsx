'use client';

import { useEffect } from 'react';
import { siteConfig } from '@/config/site';
import { useMonetizationProfile } from '@/hooks/useMonetizationProfile';
import {
  triggerAdsterraPopunder,
  triggerAdsterraSocialBar,
} from '@/lib/monetization/adsterra-runtime';
import { getSessionStorageItem, setSessionStorageItem } from '@/lib/monetization/storage';
import { trackMonetizationEvent } from '@/lib/monetization/analytics';

type TriggerKind = 'first-tool-interaction' | 'first-file-upload' | 'first-button-click';

const SESSION_TRIGGER_PREFIX = 'opentoolskit-adsterra-popunder-triggered:';

function getBlockedReason(profile: ReturnType<typeof useMonetizationProfile>) {
  if (profile.isLoading) {
    return 'profile-loading';
  }

  if (profile.previewMode === 'off') {
    return 'preview-off';
  }

  if (profile.isUkEea) {
    return 'uk-eea-native-only';
  }

  return 'aggressive-units-disabled';
}

function hasFiles(event: DragEvent) {
  return Boolean(event.dataTransfer?.files?.length);
}

export function MonetizationInteractionTriggers() {
  const monetizationProfile = useMonetizationProfile();

  useEffect(() => {
    if (!siteConfig.ads.enabled || !siteConfig.ads.providers.adsterra.enabled) {
      return;
    }

    function attemptAggressiveScripts(kind: TriggerKind, trustedEvent: Event) {
      const sessionKey = `${SESSION_TRIGGER_PREFIX}${kind}`;
      if (getSessionStorageItem(sessionKey) === 'true') {
        return;
      }

      if (!monetizationProfile.allowAggressiveUnits) {
        trackMonetizationEvent({
          event: 'monetization_blocked_reason',
          placement: kind,
          provider: 'adsterra',
          country: monetizationProfile.country,
          allowedAggressiveUnits: false,
          reason: getBlockedReason(monetizationProfile),
          metadata: {
            unit: 'popunder',
            sourceReason: kind,
            previewMode: monetizationProfile.previewMode,
            isLoading: monetizationProfile.isLoading,
            isUkEea: monetizationProfile.isUkEea,
          },
        });
        if (!monetizationProfile.isLoading) {
          setSessionStorageItem(sessionKey, 'true');
        }
        return;
      }

      setSessionStorageItem(sessionKey, 'true');
      triggerAdsterraPopunder({
        placement: kind,
        reason: kind,
        trustedEvent,
      });
      triggerAdsterraSocialBar({
        placement: kind,
        reason: kind,
      });
    }

    function handleClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) {
        return;
      }

      if (target.closest('button,[role="button"]')) {
        attemptAggressiveScripts('first-button-click', event);
      }

      if (target.closest('[data-testid="tool-page-interface"]')) {
        attemptAggressiveScripts('first-tool-interaction', event);
      }
    }

    function handleChange(event: Event) {
      const target = event.target instanceof HTMLInputElement ? event.target : null;
      if (target?.type === 'file' && target.files && target.files.length > 0) {
        attemptAggressiveScripts('first-file-upload', event);
      }
    }

    function handleDrop(event: DragEvent) {
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest('[data-testid="tool-page-interface"]') && hasFiles(event)) {
        attemptAggressiveScripts('first-file-upload', event);
      }
    }

    document.addEventListener('click', handleClick, true);
    document.addEventListener('change', handleChange, true);
    document.addEventListener('drop', handleDrop, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('change', handleChange, true);
      document.removeEventListener('drop', handleDrop, true);
    };
  }, [monetizationProfile]);

  return null;
}

export default MonetizationInteractionTriggers;
