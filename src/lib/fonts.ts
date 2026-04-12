/**
 * Font Configuration
 * Requirements: 8.4 - Font optimization
 * 
 * Uses next/font for automatic font optimization including:
 * - Font subsetting (only loads characters used)
 * - Self-hosting (no external requests to Google Fonts)
 * - Zero layout shift with size-adjust
 * - display: swap for better performance
 */

import { Manrope, Space_Mono } from 'next/font/google';

/**
 * Manrope font - Primary sans-serif font
 * Used for body text and UI elements
 */
export const manrope = Manrope({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-manrope',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
  adjustFontFallback: true,
});

/**
 * Space Mono font - Monospace font
 * Used for code snippets and technical content
 */
export const spaceMono = Space_Mono({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-space-mono',
  preload: false, // Only preload if code is shown above the fold
  fallback: ['Consolas', 'Monaco', 'monospace'],
  weight: ['400', '700'],
});

/**
 * Combined font variables for use in className
 */
export const fontVariables = `${manrope.variable} ${spaceMono.variable}`;

/**
 * Font class names for direct usage
 */
export const fontClassNames = {
  sans: manrope.className,
  mono: spaceMono.className,
};

/**
 * CSS custom properties for fonts
 * These are set as CSS variables and can be used in Tailwind
 */
export const fontCssVariables = {
  '--font-sans': manrope.style.fontFamily,
  '--font-mono': spaceMono.style.fontFamily,
} as const;
