export const ADSENSE_REVIEW_MODE_ENV = 'NEXT_PUBLIC_ADSENSE_REVIEW_MODE';
export const GOOGLE_ADSENSE_VERIFICATION_ENV = 'NEXT_PUBLIC_GOOGLE_ADSENSE_VERIFICATION_ENABLED';
export const THIRD_PARTY_MONETIZATION_ENV = 'NEXT_PUBLIC_THIRD_PARTY_MONETIZATION_ENABLED';
export const GOOGLE_ADSENSE_ACCOUNT_ID = 'ca-pub-7143107898355663';
export const GOOGLE_ADSENSE_CLIENT_ID = GOOGLE_ADSENSE_ACCOUNT_ID;
export const GOOGLE_ADSENSE_SCRIPT_SRC =
  `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${GOOGLE_ADSENSE_CLIENT_ID}`;
export const ADS_TXT_CONTENT = 'google.com, pub-7143107898355663, DIRECT, f08c47fec0942fa0';

export function readBooleanEnv(name: string, defaultValue: boolean) {
  const raw = process.env[name]?.trim().toLowerCase();

  if (raw === 'true' || raw === '1' || raw === 'yes') {
    return true;
  }

  if (raw === 'false' || raw === '0' || raw === 'no') {
    return false;
  }

  return defaultValue;
}

const DEFAULT_ADSENSE_REVIEW_MODE = process.env.NODE_ENV === 'test' ? false : true;

// Temporary AdSense review mode defaults ON for production builds during this
// review pass. Set NEXT_PUBLIC_ADSENSE_REVIEW_MODE=false after approval to
// restore third-party monetization. Tests default to normal monetization mode
// so the reusable architecture remains covered.
export const monetizationControl = {
  adsenseReviewMode: readBooleanEnv(ADSENSE_REVIEW_MODE_ENV, DEFAULT_ADSENSE_REVIEW_MODE),
  googleAdsenseVerificationEnabled: readBooleanEnv(GOOGLE_ADSENSE_VERIFICATION_ENV, true),
  thirdPartyMonetizationEnabled: readBooleanEnv(THIRD_PARTY_MONETIZATION_ENV, true),
} as const;

const thirdPartyMonetizationEnabled =
  monetizationControl.thirdPartyMonetizationEnabled
  && !monetizationControl.adsenseReviewMode;

export const monetizationRuntime = {
  adsenseReviewMode: monetizationControl.adsenseReviewMode,
  googleAdsenseVerificationEnabled: monetizationControl.googleAdsenseVerificationEnabled,
  injectAdsenseVerification: monetizationControl.googleAdsenseVerificationEnabled,
  thirdPartyMonetizationEnabled,
  adsterraEnabled: thirdPartyMonetizationEnabled,
  zeydooEnabled: thirdPartyMonetizationEnabled,
  partnerRedirectEnabled: thirdPartyMonetizationEnabled,
  sponsorSurfacesEnabled: thirdPartyMonetizationEnabled,
  aggressiveUnitsEnabled: thirdPartyMonetizationEnabled,
  hardGateEnabled: thirdPartyMonetizationEnabled,
  showMonetizationDisclosure: thirdPartyMonetizationEnabled,
} as const;
