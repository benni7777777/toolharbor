import type { Metadata } from 'next';
import RootRedirectClient from './RootRedirectClient';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'OpenToolsKit',
  description: 'OpenToolsKit redirects visitors to the localized browser-tool experience.',
  alternates: {
    canonical: `${siteConfig.url}/${siteConfig.defaultLocale}/`,
    languages: {
      'x-default': `${siteConfig.url}/${siteConfig.defaultLocale}/`,
      en: `${siteConfig.url}/en/`,
    },
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function RootPage() {
  return <RootRedirectClient />;
}
