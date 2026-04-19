'use client';

import { useEffect, useRef } from 'react';
import {
  armAdsterraPopunder,
  triggerAdsterraPopunder,
  triggerAdsterraSocialBar,
} from '@/lib/monetization/adsterra-runtime';

export interface AdsterraSessionScriptsProps {
  popunder?: boolean;
  socialBar?: boolean;
  placement?: string;
  reason?: string;
  trustedEvent?: Event;
}

export function triggerAdsterraSessionScripts({
  popunder = false,
  socialBar = false,
  placement = 'session',
  reason = 'session-trigger',
  trustedEvent,
}: AdsterraSessionScriptsProps) {
  if (typeof window === 'undefined') {
    return;
  }

  if (popunder) {
    triggerAdsterraPopunder({ placement, reason, trustedEvent });
  }

  if (socialBar) {
    triggerAdsterraSocialBar({ placement, reason });
  }
}

export function AdsterraSessionScripts({
  popunder = false,
  socialBar = false,
  placement = 'surface',
  reason = 'surface-load',
}: AdsterraSessionScriptsProps) {
  const popunderLoadedRef = useRef(false);
  const socialBarLoadedRef = useRef(false);

  useEffect(() => {
    if (popunder && !popunderLoadedRef.current) {
      popunderLoadedRef.current = true;
      armAdsterraPopunder({ placement, reason });
    }

    if (socialBar && !socialBarLoadedRef.current) {
      socialBarLoadedRef.current = true;
      triggerAdsterraSessionScripts({ popunder: false, socialBar, placement, reason });
    }
  }, [placement, popunder, reason, socialBar]);

  return null;
}

export default AdsterraSessionScripts;
