import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import { generatePrivacyMetadata, generateBasicWebPageSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import PrivacyPageClient from './PrivacyPageClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';
  const t = await getTranslations({ locale: validLocale, namespace: 'metadata' });

  return generatePrivacyMetadata(validLocale, {
    title: t('privacy.title'),
    description: t('privacy.description'),
  });
}

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const localeValue = locale as Locale;

  return (
    <>
      <JsonLd
        data={generateBasicWebPageSchema({
          locale: localeValue,
          path: '/privacy',
          name: 'Privacy Policy',
          description: 'Privacy policy for browser-side file handling and OpenToolsKit service disclosures.',
          aboutName: 'Privacy policy',
        })}
      />
      <JsonLd
        data={generateBreadcrumbSchema(
          [
            { name: 'Home', path: '' },
            { name: 'Privacy', path: '/privacy' },
          ],
          localeValue
        )}
      />
      <PrivacyPageClient locale={localeValue} />
    </>
  );
}
