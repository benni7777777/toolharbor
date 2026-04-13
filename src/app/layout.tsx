import type { Metadata } from 'next';
import '@/lib/polyfills/promise-with-resolvers';
import '@/app/globals.css';
import { siteConfig } from '@/config/site';

const themeInitScript = `
(() => {
  try {
    const key = '${siteConfig.theme.storageKey}';
    const stored = localStorage.getItem(key) || '${siteConfig.theme.defaultMode}';
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const resolved = stored === 'system' ? (media.matches ? 'dark' : 'light') : stored;
    const root = document.documentElement;
    root.dataset.theme = stored;
    root.classList.toggle('dark', resolved === 'dark');
    root.style.colorScheme = resolved;
  } catch (error) {
    document.documentElement.dataset.theme = '${siteConfig.theme.defaultMode}';
  }
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.description,
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

// Root layout - provides the basic HTML structure
// The actual layout with i18n is in [locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content={siteConfig.theme.lightThemeColor} media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content={siteConfig.theme.darkThemeColor} media="(prefers-color-scheme: dark)" />
        <style dangerouslySetInnerHTML={{ __html: 'html{scrollbar-gutter:stable}' }} />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
