import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import { generateAboutMetadata, generateBasicWebPageSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import AboutPageClient from './AboutPageClient';

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

  return generateAboutMetadata(validLocale, {
    title: t('about.title'),
    description: t('about.description'),
  });
}

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const localeValue = locale as Locale;

  return (
    <>
      <JsonLd
        data={generateBasicWebPageSchema({
          locale: localeValue,
          path: '/about',
          name: 'About OpenToolsKit',
          description: 'About the OpenToolsKit browser-side PDF tool platform.',
          aboutName: 'OpenToolsKit',
        })}
      />
      <JsonLd
        data={generateBreadcrumbSchema(
          [
            { name: 'Home', path: '' },
            { name: 'About', path: '/about' },
          ],
          localeValue
        )}
      />
      <AboutPageClient locale={localeValue} />
    </>
  );
}
