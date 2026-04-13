export type MonetizationEventName =
  | 'gate_shown'
  | 'gate_timer_complete'
  | 'gate_unlocked_by_partner_click'
  | 'partner_click'
  | 'native_impression'
  | 'popunder_injected'
  | 'socialbar_injected'
  | 'download_unlocked'
  | 'gate_abandon';

export type MonetizationPreviewMode = 'auto' | 'aggressive' | 'native-only' | 'off';

export interface MonetizationEventPayload {
  event: MonetizationEventName;
  tool?: string;
  placement?: string;
  provider?: string;
  country?: string;
  allowedAggressiveUnits?: boolean;
  unlockReason?: 'timer' | 'partner';
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
