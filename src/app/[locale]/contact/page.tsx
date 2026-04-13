import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import { generateContactMetadata, generateBasicWebPageSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import ContactPageClient from './ContactPageClient';

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

  return generateContactMetadata(validLocale, {
    title: t('contact.title'),
    description: t('contact.description'),
  });
}

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const localeValue = locale as Locale;

  return (
    <>
      <JsonLd
        data={generateBasicWebPageSchema({
          locale: localeValue,
          path: '/contact',
          name: 'Support, Source Code, and AGPL Notice',
          description: 'GitHub support, source code links, and AGPL notice for OpenToolsKit.',
          aboutName: 'Support and source code',
        })}
      />
      <JsonLd
        data={generateBreadcrumbSchema(
          [
            { name: 'Home', path: '' },
            { name: 'Support', path: '/contact' },
          ],
          localeValue
        )}
      />
      <ContactPageClient locale={localeValue} />
    </>
  );
}
