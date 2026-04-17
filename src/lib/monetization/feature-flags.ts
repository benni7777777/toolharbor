export function isHardGateFeatureEnabled() {
  return process.env.NEXT_PUBLIC_OTK_HARD_GATE_ENABLED === 'true';
}

