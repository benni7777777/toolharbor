'use client';

import { useEffect } from 'react';
import {
  armAdsterraPopunder,
  triggerAdsterraPopunder,
  triggerAdsterraSocialBar,
} from '@/lib/monetization/adsterra-runtime';

interface AdsterraSessionScriptsProps {
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
  useEffect(() => {
    if (popunder) {
      armAdsterraPopunder({ placement, reason });
    }

    triggerAdsterraSessionScripts({ popunder: false, socialBar, placement, reason });
  }, [placement, popunder, reason, socialBar]);

  return null;
}

export default AdsterraSessionScripts;
