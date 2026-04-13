'use client';

import { useEffect } from 'react';
import { siteConfig } from '@/config/site';
import { trackMonetizationEvent } from '@/lib/monetization/analytics';
import { isCooldownActive, markCooldownHit } from '@/lib/monetization/storage';

interface AdsterraSessionScriptsProps {
  popunder?: boolean;
  socialBar?: boolean;
}

function injectScript(src: string, kind: string) {
  if (document.querySelector(`script[data-otk-adsterra="${kind}"][src="${src}"]`)) {
    return false;
  }

  const script = document.createElement('script');
  script.src = src;
  script.async = false;
  script.setAttribute('data-cfasync', 'false');
  script.dataset.otkAdsterra = kind;
  document.body.appendChild(script);
  return true;
}

export function triggerAdsterraSessionScripts({
  popunder = false,
  socialBar = false,
}: AdsterraSessionScriptsProps) {
  if (typeof window === 'undefined') {
    return;
  }

  if (!siteConfig.ads.enabled || !siteConfig.ads.providers.adsterra.enabled) {
    return;
  }

  const { popunder: popunderConfig, socialBar: socialBarConfig } = siteConfig.ads.providers.adsterra;

  if (popunder) {
    const cooldownActive = isCooldownActive(
      popunderConfig.cooldownStorageKey,
      siteConfig.monetizationRules.popunderCooldownHours,
    );

    if (!cooldownActive) {
      const injected = injectScript(popunderConfig.scriptSrc, 'popunder');
      if (injected) {
        markCooldownHit(popunderConfig.cooldownStorageKey);
        trackMonetizationEvent({
          event: 'popunder_injected',
          placement: 'session',
          provider: 'adsterra',
        });
      }
    }
  }

  if (socialBar) {
    const cooldownActive = isCooldownActive(
      socialBarConfig.cooldownStorageKey,
      siteConfig.monetizationRules.socialBarCooldownHours,
    );

    if (!cooldownActive) {
      const injected = injectScript(socialBarConfig.scriptSrc, 'socialbar');
      if (injected) {
        markCooldownHit(socialBarConfig.cooldownStorageKey);
        trackMonetizationEvent({
          event: 'socialbar_injected',
          placement: 'session',
          provider: 'adsterra',
        });
      }
    }
  }
}

export function AdsterraSessionScripts({
  popunder = false,
  socialBar = false,
}: AdsterraSessionScriptsProps) {
  useEffect(() => {
    triggerAdsterraSessionScripts({ popunder, socialBar });
  }, [popunder, socialBar]);

  return null;
}

export default AdsterraSessionScripts;
