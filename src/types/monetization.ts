export type MonetizationEventName =
  | 'gate_shown'
  | 'gate_timer_started'
  | 'gate_timer_complete'
  | 'gate_timer_completed'
  | 'gate_unlocked_by_timer'
  | 'gate_unlocked_by_partner_click'
  | 'partner_click'
  | 'partner_click_triggered'
  | 'partner_redirect_success'
  | 'partner_redirect_failure'
  | 'native_impression'
  | 'native_banner_mount_attempted'
  | 'native_banner_rendered'
  | 'native_banner_failed'
  | 'popunder_injected'
  | 'popunder_triggered'
  | 'socialbar_injected'
  | 'socialbar_triggered'
  | 'download_unlocked'
  | 'gate_abandon'
  | 'monetization_blocked_reason';

export type MonetizationPreviewMode = 'auto' | 'aggressive' | 'native-only' | 'off';

export type AdRuntimeStatus =
  | 'idle'
  | 'mounting'
  | 'loaded'
  | 'rendered'
  | 'blocked'
  | 'no-fill-timeout'
  | 'failed';

export type DownloadUnlockReason = 'timer' | 'partner' | 'bypass' | 'fallback';

export type MonetizationBlockedReason =
  | 'uk-eea-native-only'
  | 'preview-off'
  | 'cooldown'
  | 'duplicate-native-zone'
  | 'script-error'
  | 'blocked-timeout'
  | 'missing-secret'
  | 'hard-gate-disabled'
  | 'passive-popunder-disabled'
  | 'profile-loading'
  | 'untrusted-event';

export interface MonetizationEventPayload {
  event: MonetizationEventName;
  tool?: string;
  placement?: string;
  provider?: string;
  country?: string;
  allowedAggressiveUnits?: boolean;
  unlockReason?: DownloadUnlockReason;
  reason?: MonetizationBlockedReason | string;
  status?: AdRuntimeStatus;
  route?: string;
  sessionId?: string;
  debugId?: string;
  metadata?: Record<string, unknown>;
}

export interface MonetizationContext {
  country: string;
  isUkEea: boolean;
}

export interface MonetizationProfile extends MonetizationContext {
  isLoading: boolean;
  previewMode: MonetizationPreviewMode;
  allowNativeUnits: boolean;
  allowAggressiveUnits: boolean;
  allowHardGate: boolean;
}
