import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import { TOOL_CATEGORIES, type ToolCategory } from '@/types/tool';
import CategoryPageClient from './CategoryPageClient';
import { notFound } from 'next/navigation';
import { generateCategoryMetadata } from '@/lib/seo';
import { getCategorySeo } from '@/config/seo';
import { getToolsByCategory } from '@/config/tools';
import { getToolContent } from '@/config/tool-content';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBasicWebPageSchema, generateBreadcrumbSchema, generateItemListSchema } from '@/lib/seo';
import type { Metadata } from 'next';

export function generateStaticParams() {
    return locales.flatMap((locale) =>
        TOOL_CATEGORIES.map((category) => ({
            locale,
            category,
        }))
    );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; category: string }> }): Promise<Metadata> {
    const { locale, category } = await params;

    if (!TOOL_CATEGORIES.includes(category as ToolCategory)) {
        return {
            title: 'Category Not Found | OpenToolsKit',
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    return generateCategoryMetadata(locale as Locale, category as ToolCategory);
}

export default async function CategoryPage({ params }: { params: Promise<{ locale: string; category: string }> }) {
    const { locale, category } = await params;

    // Validate category
    if (!TOOL_CATEGORIES.includes(category as ToolCategory)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    const categoryTools = getToolsByCategory(category as ToolCategory);
    const localizedToolContent = categoryTools.reduce((acc, tool) => {
        const content = getToolContent(locale as Locale, tool.id);
        if (content) {
            acc[tool.id] = {
                title: content.title,
                description: content.metaDescription
            };
        }
        return acc;
    }, {} as Record<string, { title: string; description: string }>);

    const categorySeo = getCategorySeo(category as ToolCategory);
    const localeValue = locale as Locale;

    const webPage = generateBasicWebPageSchema({
        locale: localeValue,
        path: `/tools/category/${category}`,
        name: categorySeo.h1,
        description: categorySeo.description,
        type: 'CollectionPage',
        aboutName: categorySeo.primaryQuery,
    });

    const itemList = generateItemListSchema({
        locale: localeValue,
        path: `/tools/category/${category}`,
        name: categorySeo.h1,
        items: categoryTools.map((tool) => ({
            name: localizedToolContent[tool.id]?.title || tool.slug,
            path: `/tools/${tool.slug}`,
        })),
    });

    const breadcrumb = generateBreadcrumbSchema(
        [
            { name: 'Home', path: '' },
            { name: 'Tools', path: '/tools' },
            { name: categorySeo.h1, path: `/tools/category/${category}` },
        ],
        localeValue
    );

    return (
        <>
            <JsonLd data={webPage} />
            <JsonLd data={itemList} />
            <JsonLd data={breadcrumb} />
            <CategoryPageClient
                locale={localeValue}
                category={category as ToolCategory}
                localizedToolContent={localizedToolContent}
            />
        </>
    );
}
