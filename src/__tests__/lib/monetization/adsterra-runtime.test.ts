import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  mountAdsterraNative,
  resetAdsterraRuntimeForTests,
  triggerAdsterraPopunder,
  triggerAdsterraSocialBar,
} from '@/lib/monetization/adsterra-runtime';
import { siteConfig } from '@/config/site';

beforeEach(() => {
  vi.useFakeTimers();
  resetAdsterraRuntimeForTests();
  window.localStorage.clear();
  window.sessionStorage.clear();
});

afterEach(() => {
  resetAdsterraRuntimeForTests();
  vi.useRealTimers();
});

describe('Adsterra runtime', () => {
  it('mounts exactly one native banner script and exact container for the highest-priority slot', () => {
    const lowPriorityHost = document.createElement('div');
    const highPriorityHost = document.createElement('div');
    document.body.append(lowPriorityHost, highPriorityHost);

    mountAdsterraNative({
      placement: 'homepage-native',
      priority: 40,
      host: lowPriorityHost,
    });
    mountAdsterraNative({
      placement: 'result-drawer',
      priority: 95,
      host: highPriorityHost,
    });

    vi.advanceTimersByTime(100);

    const scripts = document.querySelectorAll('script[data-otk-adsterra="native-banner"]');
    const containers = document.querySelectorAll(`#${siteConfig.ads.providers.adsterra.nativeBanner.containerId}`);

    expect(scripts).toHaveLength(1);
    expect(containers).toHaveLength(1);
    expect(highPriorityHost.dataset.otkAdStatus).toBe('mounting');
    expect(lowPriorityHost.dataset.otkAdStatus).toBe('blocked');
    expect(lowPriorityHost.dataset.otkAdReason).toBe('duplicate-native-zone');
    expect(scripts[0]).toHaveAttribute('data-cfasync', 'false');
  });

  it('marks native banner no-fill timeout when the script never populates the container', () => {
    const host = document.createElement('div');
    document.body.append(host);

    mountAdsterraNative({
      placement: 'homepage-native',
      priority: 40,
      host,
    });

    vi.advanceTimersByTime(100);
    const script = document.querySelector('script[data-otk-adsterra="native-banner"]');
    script?.dispatchEvent(new Event('load'));
    vi.advanceTimersByTime(9100);

    expect(host.dataset.otkAdStatus).toBe('no-fill-timeout');
    expect(host.dataset.otkAdReason).toBe('blocked-timeout');
  });

  it('marks native banner rendered after Adsterra populates the exact container', async () => {
    const host = document.createElement('div');
    document.body.append(host);

    mountAdsterraNative({
      placement: 'result-drawer',
      priority: 95,
      host,
    });

    vi.advanceTimersByTime(100);
    const script = document.querySelector('script[data-otk-adsterra="native-banner"]');
    const container = document.getElementById(siteConfig.ads.providers.adsterra.nativeBanner.containerId);

    script?.dispatchEvent(new Event('load'));
    container?.appendChild(document.createElement('iframe'));
    await Promise.resolve();

    expect(host.dataset.otkAdStatus).toBe('rendered');
  });

  it('requires a trusted user action for popunder and respects cooldown', () => {
    const blocked = triggerAdsterraPopunder({
      placement: 'result-success',
      reason: 'direct-download-click',
    });

    expect(blocked).toBe(false);
    expect(document.querySelector('script[data-otk-adsterra="popunder"]')).toBeNull();

    const click = new MouseEvent('click');
    const first = triggerAdsterraPopunder({
      placement: 'result-success',
      reason: 'direct-download-click',
      trustedEvent: click,
    });
    const second = triggerAdsterraPopunder({
      placement: 'result-success',
      reason: 'direct-download-click',
      trustedEvent: click,
    });

    expect(first).toBe(true);
    expect(second).toBe(false);
    expect(document.querySelectorAll('script[data-otk-adsterra="popunder"]')).toHaveLength(1);
  });

  it('loads social bar once and applies cooldown', () => {
    const first = triggerAdsterraSocialBar({
      placement: 'homepage',
      reason: 'homepage-load',
    });
    const second = triggerAdsterraSocialBar({
      placement: 'homepage',
      reason: 'homepage-load',
    });

    expect(first).toBe(true);
    expect(second).toBe(false);
    expect(document.querySelectorAll('script[data-otk-adsterra="socialbar"]')).toHaveLength(1);
    expect(document.querySelector('script[data-otk-adsterra="socialbar"]')).toHaveAttribute('data-cfasync', 'false');
  });
});
