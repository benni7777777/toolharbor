import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import { generateWorkflowMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBasicWebPageSchema, generateBreadcrumbSchema } from '@/lib/seo';
import type { Metadata } from 'next';
import WorkflowPageClient from './WorkflowPageClient';

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

interface WorkflowPageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    return generateWorkflowMetadata(locale as Locale);
}

export default async function WorkflowPage({ params }: WorkflowPageProps) {
    const { locale } = await params;

    // Enable static rendering
    setRequestLocale(locale);

    const localeValue = locale as Locale;

    return (
        <>
            <JsonLd
                data={generateBasicWebPageSchema({
                    locale: localeValue,
                    path: '/workflow',
                    name: 'PDF Workflow Builder',
                    description: 'Browser-side workflow builder for multi-step PDF jobs such as merge, split, compress, and secure sequences.',
                    aboutName: 'PDF workflow builder',
                })}
            />
            <JsonLd
                data={generateBreadcrumbSchema(
                    [
                        { name: 'Home', path: '' },
                        { name: 'Workflow', path: '/workflow' },
                    ],
                    localeValue
                )}
            />
            <WorkflowPageClient locale={localeValue} />
        </>
    );
}
