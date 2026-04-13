import type { Metadata } from 'next';
import RootRedirectClient from './RootRedirectClient';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Locale Redirect | OpenToolsKit',
  description: 'Redirect helper for the localized OpenToolsKit experience.',
  alternates: {
    canonical: `${siteConfig.url}/${siteConfig.defaultLocale}`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootPage() {
  return <RootRedirectClient />;
}
