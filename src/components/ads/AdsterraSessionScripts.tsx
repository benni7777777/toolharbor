'use client';

import { useEffect } from 'react';
import { siteConfig } from '@/config/site';

interface AdsterraSessionScriptsProps {
  popunder?: boolean;
  socialBar?: boolean;
}

function injectScript(src: string, kind: string) {
  if (document.querySelector(`script[data-otk-adsterra="${kind}"][src="${src}"]`)) {
    return;
  }

  const script = document.createElement('script');
  script.src = src;
  script.async = false;
  script.dataset.otkAdsterra = kind;
  document.body.appendChild(script);
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
    const hasFired = window.sessionStorage.getItem(popunderConfig.sessionKey);
    if (!hasFired) {
      window.sessionStorage.setItem(popunderConfig.sessionKey, '1');
      injectScript(popunderConfig.scriptSrc, 'popunder');
    }
  }

  if (socialBar) {
    const hasFired = window.sessionStorage.getItem(socialBarConfig.sessionKey);
    if (!hasFired) {
      window.sessionStorage.setItem(socialBarConfig.sessionKey, '1');
      injectScript(socialBarConfig.scriptSrc, 'socialbar');
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
