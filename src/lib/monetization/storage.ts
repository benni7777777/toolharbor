'use client';

function isStorageAvailable(kind: 'localStorage' | 'sessionStorage') {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const storage = window[kind];
    const key = '__otk_storage_probe__';
    storage.setItem(key, '1');
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function getLocalStorageItem(key: string) {
  if (!isStorageAvailable('localStorage')) {
    return null;
  }

  return window.localStorage.getItem(key);
}

export function setLocalStorageItem(key: string, value: string) {
  if (!isStorageAvailable('localStorage')) {
    return;
  }

  window.localStorage.setItem(key, value);
}

export function getSessionStorageItem(key: string) {
  if (!isStorageAvailable('sessionStorage')) {
    return null;
  }

  return window.sessionStorage.getItem(key);
}

export function setSessionStorageItem(key: string, value: string) {
  if (!isStorageAvailable('sessionStorage')) {
    return;
  }

  window.sessionStorage.setItem(key, value);
}

export function getSessionCount(key: string) {
  const value = getSessionStorageItem(key);
  return value ? Number.parseInt(value, 10) || 0 : 0;
}

export function incrementSessionCount(key: string) {
  const nextValue = getSessionCount(key) + 1;
  setSessionStorageItem(key, String(nextValue));
  return nextValue;
}

export function isCooldownActive(key: string, cooldownHours: number) {
  const value = getLocalStorageItem(key);
  if (!value) {
    return false;
  }

  const lastSeen = Number.parseInt(value, 10);
  if (!Number.isFinite(lastSeen)) {
    return false;
  }

  const cooldownMs = cooldownHours * 60 * 60 * 1000;
  return Date.now() - lastSeen < cooldownMs;
}

export function markCooldownHit(key: string) {
  setLocalStorageItem(key, String(Date.now()));
}
