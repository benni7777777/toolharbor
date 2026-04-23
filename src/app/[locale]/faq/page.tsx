import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import { generateFAQSchema, generateFaqMetadata, generateBasicWebPageSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import FAQPageClient from './FAQPageClient';
import { getFAQPageItems } from './faq-items';

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

  return generateFaqMetadata(validLocale, {
    title: t('faq.title'),
    description: t('faq.description'),
  });
}

interface FAQPageProps {
  params: Promise<{ locale: string }>;
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const localeValue = locale as Locale;
  const tFaq = await getTranslations({ locale: localeValue, namespace: 'faqPage' });
  const faqStructuredData = generateFAQSchema(getFAQPageItems(tFaq));

  return (
    <>
      <JsonLd
        data={generateBasicWebPageSchema({
          locale: localeValue,
          path: '/faq',
          name: 'OpenToolsKit FAQ',
          description: 'Frequently asked questions about browser-side PDF tools, privacy, and support.',
          aboutName: 'OpenToolsKit FAQ',
        })}
      />
      <JsonLd
        data={generateBreadcrumbSchema(
          [
            { name: 'Home', path: '' },
            { name: 'FAQ', path: '/faq' },
          ],
          localeValue
        )}
      />
      {faqStructuredData && <JsonLd data={faqStructuredData} />}
      <FAQPageClient locale={localeValue} />
    </>
  );
}
