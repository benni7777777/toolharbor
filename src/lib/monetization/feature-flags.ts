import { monetizationRuntime } from '@/lib/monetization/review-mode';

export function isHardGateFeatureEnabled() {
  return monetizationRuntime.hardGateEnabled
    && process.env.NEXT_PUBLIC_OTK_HARD_GATE_ENABLED !== 'false';
}
