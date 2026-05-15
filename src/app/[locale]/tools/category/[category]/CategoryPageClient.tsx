'use client';

import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  AdsterraInlineBanner,
  AdsterraNativeBanner,
  AdsterraSessionScripts,
} from '@/components/ads/DynamicAdsterraComponents';
import MonetizationDisclosureCard from '@/components/ads/MonetizationDisclosureCard';
import { ToolGrid } from '@/components/tools/ToolGrid';
import { getCategorySeo } from '@/config/seo';
import { type Locale } from '@/lib/i18n/config';
import { type ToolCategory } from '@/types/tool';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { useMonetizationProfile } from '@/hooks/useMonetizationProfile';
import { getGuidesBySlugs } from '@/content/guides';
import { getPublisherReviewedToolsByCategory } from '@/lib/seo/publisher-review';

interface CategoryPageClientProps {
    locale: Locale;
    category: ToolCategory;
    localizedToolContent?: Record<string, { title: string; description: string }>;
}

export default function CategoryPageClient({ locale, category, localizedToolContent }: CategoryPageClientProps) {
    const t = useTranslations();
    const monetizationProfile = useMonetizationProfile();
    const tools = getPublisherReviewedToolsByCategory(category);
    const categorySeo = getCategorySeo(category);
    const showCategoryNativeAd = monetizationProfile.allowNativeUnits && siteConfig.ads.placements.categoryHub.nativeBanner;
    const showInlineAd = monetizationProfile.allowAggressiveUnits;
    const showMonetizationDisclosure = siteConfig.ads.enabled || siteConfig.sponsorship.enabled;
    const guideLinks = locale === 'en' ? getGuidesBySlugs(categorySeo.relatedGuideSlugs) : [];

    // Map categories to translation keys (matching ToolsPage structure)
    const categoryTranslationKeys: Record<ToolCategory, string> = {
        'edit-annotate': 'editAnnotate',
        'convert-to-pdf': 'convertToPdf',
        'convert-from-pdf': 'convertFromPdf',
        'organize-manage': 'organizeManage',
        'optimize-repair': 'optimizeRepair',
        'secure-pdf': 'securePdf',
    };

    const categoryName = t(`home.categories.${categoryTranslationKeys[category]}`);

    return (
        <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))]">
            <Header locale={locale} />

            <main className="mx-auto w-full max-w-screen-xl flex-1 xl:max-w-[calc(100vw-32rem)] min-[1800px]:max-w-screen-xl">
                <AdsterraSessionScripts
                    popunder={monetizationProfile.allowAggressiveUnits && siteConfig.ads.placements.categoryHub.popunder}
                    socialBar={monetizationProfile.allowAggressiveUnits && siteConfig.ads.placements.categoryHub.socialBar}
                    placement="category-hub"
                    reason="category-load"
                />
                <div className="container mx-auto px-4 pt-24 pb-8">
                    {/* Breadcrumb Navigation */}
                    <nav aria-label="Breadcrumb" className="mb-4 flex items-center text-sm text-[hsl(var(--color-muted-foreground))] animate-in fade-in slide-in-from-top-4 duration-500 delay-100">
                        <Link
                            href={`/${locale}/`}
                            className="flex items-center hover:text-[hsl(var(--color-primary))] transition-colors"
                            title={t('common.navigation.home')}
                        >
                            <Home className="w-4 h-4" />
                        </Link>
                        <ChevronRight className="w-4 h-4 mx-2 text-[hsl(var(--color-border))]" />
                        <Link
                            href={`/${locale}/tools/`}
                            className="hover:text-[hsl(var(--color-primary))] transition-colors"
                        >
                            {t('common.navigation.tools')}
                        </Link>
                        <ChevronRight className="w-4 h-4 mx-2 text-[hsl(var(--color-border))]" />
                        <span className="font-medium text-[hsl(var(--color-foreground))] truncate max-w-[200px] sm:max-w-md" aria-current="page">
                            {categoryName}
                        </span>
                    </nav>

                    {/* Page Header */}
                    <section className="relative mb-8">
                        <h1 className="text-3xl font-bold text-[hsl(var(--color-foreground))] mb-2">
                            {categoryName}
                        </h1>
                        <p className="text-base text-[hsl(var(--color-muted-foreground))]">
                            {t(`home.categoriesDescription.${categoryTranslationKeys[category]}`)}
                        </p>
                        <p className="mt-4 max-w-3xl text-sm leading-6 text-[hsl(var(--color-muted-foreground))]">
                            {categorySeo.intro}
                        </p>
                    </section>

                    <section className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
                        <div className="rounded-[1.75rem] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-6 shadow-[var(--shadow-sm)]">
                            <h2 className="text-xl font-semibold text-[hsl(var(--color-foreground))]">
                                Best for
                            </h2>
                            <ul className="mt-4 space-y-3 text-sm text-[hsl(var(--color-muted-foreground))]">
                                {categorySeo.bestFor.map((item) => (
                                    <li key={item} className="flex gap-3">
                                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[hsl(var(--color-primary))]" aria-hidden="true" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <aside className="rounded-[1.75rem] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-6 shadow-[var(--shadow-sm)]">
                            <h2 className="text-xl font-semibold text-[hsl(var(--color-foreground))]">
                                Related paths
                            </h2>
                            <div className="mt-4 space-y-3 text-sm">
                                <Link href={`/${locale}/tools/`} className="block text-[hsl(var(--color-primary))] hover:underline">
                                    Browse the full PDF tool directory
                                </Link>
                                <Link href={`/${locale}/workflow/`} className="block text-[hsl(var(--color-primary))] hover:underline">
                                    Open the PDF workflow builder
                                </Link>
                                {categorySeo.adjacentCategories.map((adjacentCategory) => (
                                    <Link
                                        key={adjacentCategory}
                                        href={`/${locale}/tools/category/${adjacentCategory}/`}
                                        className="block text-[hsl(var(--color-primary))] hover:underline"
                                    >
                                        {t(`home.categories.${categoryTranslationKeys[adjacentCategory]}`)} tools
                                    </Link>
                                ))}
                            </div>
                        </aside>
                    </section>

                    <section className="mb-8 grid gap-4 lg:grid-cols-3" aria-labelledby="category-guidance-heading">
                        <div className="rounded-[1.75rem] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-6 shadow-[var(--shadow-sm)]">
                            <h2 id="category-guidance-heading" className="text-xl font-semibold text-[hsl(var(--color-foreground))]">
                                How to choose
                            </h2>
                            <ul className="mt-4 space-y-3 text-sm leading-6 text-[hsl(var(--color-muted-foreground))]">
                                {categorySeo.howToChoose.map((item) => (
                                    <li key={item} className="flex gap-3">
                                        <span className="mt-2 h-2 w-2 rounded-full bg-[hsl(var(--color-primary))]" aria-hidden="true" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-[1.75rem] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-6 shadow-[var(--shadow-sm)]">
                            <h2 className="text-xl font-semibold text-[hsl(var(--color-foreground))]">
                                Quality checks
                            </h2>
                            <ul className="mt-4 space-y-3 text-sm leading-6 text-[hsl(var(--color-muted-foreground))]">
                                {categorySeo.qualityChecks.map((item) => (
                                    <li key={item} className="flex gap-3">
                                        <span className="mt-2 h-2 w-2 rounded-full bg-[hsl(var(--color-accent-strong))]" aria-hidden="true" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-[1.75rem] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-6 shadow-[var(--shadow-sm)]">
                            <h2 className="text-xl font-semibold text-[hsl(var(--color-foreground))]">
                                Privacy notes
                            </h2>
                            <ul className="mt-4 space-y-3 text-sm leading-6 text-[hsl(var(--color-muted-foreground))]">
                                {categorySeo.privacyNotes.map((item) => (
                                    <li key={item} className="flex gap-3">
                                        <span className="mt-2 h-2 w-2 rounded-full bg-[hsl(var(--color-highlight))]" aria-hidden="true" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {guideLinks.length > 0 && (
                        <section className="mb-8 rounded-[1.75rem] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-6 shadow-[var(--shadow-sm)]" aria-labelledby="category-guides-heading">
                            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                                <div>
                                    <h2 id="category-guides-heading" className="text-xl font-semibold text-[hsl(var(--color-foreground))]">
                                        Related guides
                                    </h2>
                                    <p className="mt-2 text-sm leading-6 text-[hsl(var(--color-muted-foreground))]">
                                        Read these guides before choosing a workflow for documents that need extra review.
                                    </p>
                                </div>
                                <Link href={`/${locale}/guides/`} className="text-sm font-medium text-[hsl(var(--color-primary))] hover:underline">
                                    View all guides
                                </Link>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                {guideLinks.map((guide) => (
                                    <Link
                                        key={guide.slug}
                                        href={`/${locale}/guides/${guide.slug}/`}
                                        className="rounded-[1.25rem] border border-[hsl(var(--color-border))] p-4 transition-colors hover:bg-[hsl(var(--color-surface-subtle))]"
                                    >
                                        <span className="text-sm font-semibold text-[hsl(var(--color-foreground))]">
                                            {guide.title}
                                        </span>
                                        <span className="mt-2 block text-sm leading-6 text-[hsl(var(--color-muted-foreground))]">
                                            {guide.summary}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {showCategoryNativeAd && (
                        <div className="mb-8">
                            <AdsterraNativeBanner
                                slotName="category-native"
                                description="This category page may contain a labeled native ad placement from a third-party network. It does not appear inside the core tool action row."
                                collapseOnNoFill
                            />
                        </div>
                    )}

                    {showInlineAd && (
                        <AdsterraInlineBanner className="mb-8" />
                    )}

                    {/* Tools Grid */}
                    <ToolGrid
                        tools={tools}
                        locale={locale}
                        localizedToolContent={localizedToolContent}
                        enableDiscoveryMonetization
                        allowAggressiveUnits={monetizationProfile.allowAggressiveUnits}
                    />

                    {showMonetizationDisclosure && (
                        <div className="mt-8">
                            <MonetizationDisclosureCard locale={locale} />
                        </div>
                    )}
                </div>
            </main>

            <Footer locale={locale} />
        </div>
    );
}
