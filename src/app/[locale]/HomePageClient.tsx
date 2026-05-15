'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, Zap, Wrench, Lock, Edit, FileImage, FolderOpen, Settings, ShieldCheck, Star, Workflow, Boxes } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BrandMark } from '@/components/layout/BrandMark';
import {
  AdsterraInlineBanner,
  AdsterraNativeBanner,
  AdsterraSessionScripts,
} from '@/components/ads/DynamicAdsterraComponents';
import MonetizationDisclosureCard from '@/components/ads/MonetizationDisclosureCard';
import { ToolGrid } from '@/components/tools/ToolGrid';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { getPopularTools } from '@/config/tools';
import { type Locale } from '@/lib/i18n/config';
import { indexableLocales } from '@/lib/i18n/indexing';
import { type ToolCategory } from '@/types/tool';
import { siteConfig } from '@/config/site';
import { useMonetizationProfile } from '@/hooks/useMonetizationProfile';
import { getGuideSummaries } from '@/content/guides';
import {
  getPublisherReviewedTools,
  getPublisherReviewedToolsByCategory,
  isPublisherReviewedTool,
} from '@/lib/seo/publisher-review';

interface HomePageClientProps {
  locale: Locale;
  localizedToolContent?: Record<string, { title: string; description: string }>;
}

export default function HomePageClient({ locale, localizedToolContent }: HomePageClientProps) {
  const t = useTranslations();
  const monetizationProfile = useMonetizationProfile();
  const allTools = getPublisherReviewedTools();
  const popularTools = getPopularTools().filter(isPublisherReviewedTool);
  const showHomepageNativeAd = monetizationProfile.allowNativeUnits && siteConfig.ads.placements.homepage.nativeBanner;
  const showInlineAd = monetizationProfile.allowAggressiveUnits;
  const showMonetizationDisclosure = siteConfig.ads.enabled || siteConfig.sponsorship.enabled;
  const homepageGuides = locale === 'en' ? getGuideSummaries(4) : [];

  // Feature highlights
  const features = [
    {
      icon: ShieldCheck,
      titleKey: 'home.features.privacy.title',
      descriptionKey: 'home.features.privacy.description',
      color: 'text-green-500',
    },
    {
      icon: Zap,
      titleKey: 'home.features.free.title',
      descriptionKey: 'home.features.free.description',
      color: 'text-yellow-500',
    },
    {
      icon: Wrench,
      titleKey: 'home.features.powerful.title',
      descriptionKey: 'home.features.powerful.description',
      color: 'text-blue-500',
    },
  ];

  // Category icons mapping
  const categoryIcons: Record<ToolCategory, typeof Edit> = {
    'edit-annotate': Edit,
    'convert-to-pdf': FileImage,
    'convert-from-pdf': FileImage,
    'organize-manage': FolderOpen,
    'optimize-repair': Settings,
    'secure-pdf': ShieldCheck,
  };

  const categoryTranslationKeys: Record<ToolCategory, string> = {
    'edit-annotate': 'editAnnotate',
    'convert-to-pdf': 'convertToPdf',
    'convert-from-pdf': 'convertFromPdf',
    'organize-manage': 'organizeManage',
    'optimize-repair': 'optimizeRepair',
    'secure-pdf': 'securePdf',
  };

  // Category sections to display
  const categoryOrder: ToolCategory[] = [
    'edit-annotate',
    'convert-to-pdf',
    'convert-from-pdf',
    'organize-manage',
    'optimize-repair',
    'secure-pdf',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))]">
      <Header locale={locale} />

      <main id="main-content" className="mx-auto w-full max-w-screen-xl flex-1 relative xl:max-w-[calc(100vw-32rem)] min-[1800px]:max-w-screen-xl" tabIndex={-1}>
        <AdsterraSessionScripts
          popunder={monetizationProfile.allowAggressiveUnits && siteConfig.ads.placements.homepage.popunder}
          socialBar={monetizationProfile.allowAggressiveUnits && siteConfig.ads.placements.homepage.socialBar}
          placement="homepage"
          reason="homepage-load"
        />

        {/* Hero Section */}
        <section
          className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28"
          aria-labelledby="hero-title"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))/0.86] px-4 py-2 shadow-[var(--shadow-sm)] backdrop-blur-md">
                <BrandMark className="h-8 w-8" />
                <span className="text-sm font-semibold tracking-[0.16em] text-[hsl(var(--color-accent-strong))]">
                  {siteConfig.name}
                </span>
              </div>

              <h1 id="hero-title" className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <span className="text-[hsl(var(--color-foreground))]">{t('home.hero.title')} </span>
                <span className="text-gradient block mt-1 pb-2">{t('home.hero.highlight')}</span>
              </h1>

              <p className="text-lg text-[hsl(var(--color-muted-foreground))] mb-8 max-w-2xl mx-auto leading-relaxed">
                {siteConfig.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href={`/${locale}/tools/`}>
                  <Button variant="primary" size="lg" className="h-12 rounded-full px-8 text-base shadow-[var(--shadow-md)] transition-all hover:-translate-y-0.5">
                    {t('home.hero.cta')}
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Button>
                </Link>
                <Link href={`/${locale}/workflow/`}>
                  <Button variant="outline" size="lg" className="h-12 rounded-full px-8 text-base">
                    <Workflow className="h-4 w-4" aria-hidden="true" />
                    <span>{t('common.navigation.workflow') || 'Workflow'}</span>
                  </Button>
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))/0.72] px-4 py-2 text-sm text-[hsl(var(--color-muted-foreground))]">
                  <Lock className="h-4 w-4 text-[hsl(var(--color-accent-strong))]" aria-hidden="true" />
                  <span>{t('common.footer.privacyBadge')}</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))/0.72] px-4 py-2 text-sm text-[hsl(var(--color-muted-foreground))]">
                  <Boxes className="h-4 w-4 text-[hsl(var(--color-highlight))]" aria-hidden="true" />
                  <span>PDF suite, workflow editor, and browser extension</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative z-20 py-12" aria-label="Features">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="p-6 text-center glass-card hover:-translate-y-1 transition-transform duration-300" hover={false}>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--color-accent-soft))] text-[hsl(var(--color-accent-strong))]">
                      <Icon className={`h-6 w-6 ${feature.color}`} aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-[hsl(var(--color-foreground))] mb-2">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                      {t(feature.descriptionKey)}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-14" aria-labelledby="publisher-value-heading">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 id="publisher-value-heading" className="text-3xl font-bold text-[hsl(var(--color-foreground))]">
                Practical document workflows, not just buttons
              </h2>
              <p className="mt-4 text-base leading-7 text-[hsl(var(--color-muted-foreground))]">
                OpenToolsKit pairs browser-based PDF tools with clear guidance about inputs, outputs, privacy limits,
                and what to check before sharing a finished document. The goal is to help users choose the right tool,
                avoid common file mistakes, and verify results before a document leaves their device.
              </p>
            </div>

            <div className="mx-auto mt-8 grid max-w-6xl gap-5 md:grid-cols-3">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-[hsl(var(--color-foreground))]">
                  Choose by task
                </h3>
                <p className="mt-3 text-sm leading-6 text-[hsl(var(--color-muted-foreground))]">
                  Use merge and organize tools when page order matters, conversion tools when a format needs to change,
                  and security tools when access, metadata, or visible sensitive content needs review.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-[hsl(var(--color-foreground))]">
                  Process locally where applicable
                </h3>
                <p className="mt-3 text-sm leading-6 text-[hsl(var(--color-muted-foreground))]">
                  Many workflows run in the browser using JavaScript, workers, and WebAssembly. The privacy pages
                  explain the boundaries, and tool pages call out cases where output verification matters.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-[hsl(var(--color-foreground))]">
                  Review before sending
                </h3>
                <p className="mt-3 text-sm leading-6 text-[hsl(var(--color-muted-foreground))]">
                  A successful export should still be opened and checked. Page order, readability, signatures,
                  redactions, metadata, and password settings can all affect whether a PDF is ready to share.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {homepageGuides.length > 0 && (
          <section className="py-14 bg-[hsl(var(--color-card))/0.66]" aria-labelledby="home-guides-heading">
            <div className="container mx-auto px-4">
              <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="max-w-3xl">
                  <h2 id="home-guides-heading" className="text-3xl font-bold text-[hsl(var(--color-foreground))]">
                    Learn the safest path for common PDF jobs
                  </h2>
                  <p className="mt-3 text-base leading-7 text-[hsl(var(--color-muted-foreground))]">
                    These short guides explain practical choices, limits, and verification steps for the most common
                    browser-based PDF workflows.
                  </p>
                </div>
                <Link href={`/${locale}/guides/`}>
                  <Button variant="outline" size="sm" className="group">
                    View all guides
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Button>
                </Link>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {homepageGuides.map((guide) => (
                  <Link key={guide.slug} href={`/${locale}/guides/${guide.slug}/`} className="block">
                    <Card className="h-full p-5" hover>
                      <h3 className="text-base font-semibold text-[hsl(var(--color-foreground))]">
                        {guide.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[hsl(var(--color-muted-foreground))]">
                        {guide.summary}
                      </p>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {showHomepageNativeAd && (
          <section className="py-4">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-5xl">
                <AdsterraNativeBanner
                  slotName="homepage-native"
                  description="OpenToolsKit may show a native sponsor placement on discovery surfaces like the homepage. Tool actions and downloads remain separate."
                  collapseOnNoFill
                />
              </div>
            </div>
          </section>
        )}

        {showInlineAd && (
          <AdsterraInlineBanner className="container mx-auto max-w-5xl px-4 py-4" />
        )}

        {/* Popular Tools Section */}
        <section className="py-16" aria-labelledby="popular-tools-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] px-3 py-1 shadow-[var(--shadow-sm)]">
                <Star className="h-4 w-4 text-[hsl(var(--color-highlight))]" aria-hidden="true" />
                <span className="text-sm font-medium text-[hsl(var(--color-foreground))]">
                  {t('home.popularTools.badge')}
                </span>
              </div>
              <h2 id="popular-tools-heading" className="text-3xl font-bold text-[hsl(var(--color-foreground))] mb-3">
                {t('home.popularTools.title')}
              </h2>
              <p className="text-[hsl(var(--color-muted-foreground))] max-w-2xl mx-auto text-base">
                {t('home.popularTools.description')}
              </p>
            </div>
            <ToolGrid
              tools={popularTools}
              locale={locale}
              localizedToolContent={localizedToolContent}
              enableDiscoveryMonetization
              allowAggressiveUnits={monetizationProfile.allowAggressiveUnits}
            />
          </div>
        </section>

        <section className="py-16" aria-labelledby="featured-tools-heading">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div className="max-w-2xl">
                <h2 id="featured-tools-heading" className="text-2xl font-bold text-[hsl(var(--color-foreground))] mb-2">
                  {t(`home.categories.${categoryTranslationKeys['organize-manage']}`)}
                </h2>
                <p className="text-[hsl(var(--color-muted-foreground))] text-base">
                  {t(`home.categoriesDescription.${categoryTranslationKeys['organize-manage']}`)}
                </p>
              </div>
              <Link href={`/${locale}/tools/`}>
                <Button variant="outline" size="sm" className="group">
                  {t('common.navigation.tools')}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Button>
              </Link>
            </div>
            <ToolGrid
              tools={getPublisherReviewedToolsByCategory('organize-manage').slice(0, 8)}
              locale={locale}
              localizedToolContent={localizedToolContent}
              enableDiscoveryMonetization
              allowAggressiveUnits={monetizationProfile.allowAggressiveUnits}
            />
          </div>
        </section>

        {showMonetizationDisclosure && (
          <section className="py-6">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-5xl">
                <MonetizationDisclosureCard locale={locale} />
              </div>
            </div>
          </section>
        )}

        {/* Tool Categories Section */}
        <section className="py-16 bg-[hsl(var(--color-card))/0.66]" aria-labelledby="categories-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 id="categories-heading" className="text-3xl font-bold text-[hsl(var(--color-foreground))] mb-3">
                {t('home.categoriesSection.title')}
              </h2>
              <p className="text-[hsl(var(--color-muted-foreground))] max-w-2xl mx-auto text-base">
                {t('home.categoriesSection.description', { count: allTools.length })}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {categoryOrder.map((category) => {
                const categoryTools = getPublisherReviewedToolsByCategory(category);
                const Icon = categoryIcons[category];
                const categoryName = t(`home.categories.${categoryTranslationKeys[category]}`);
                const categoryDescription = t(`home.categoriesDescription.${categoryTranslationKeys[category]}`);

                return (
                  <Link
                    key={category}
                    href={`/${locale}/tools/category/${category}/`}
                    className="group"
                  >
                    <Card className="p-5 h-full glass-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] border-[hsl(var(--color-border)/0.6)]">
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-[hsl(var(--color-accent-soft))] transition-transform duration-300 group-hover:scale-110">
                          <Icon className="h-5 w-5 text-[hsl(var(--color-accent-strong))]" aria-hidden="true" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base text-[hsl(var(--color-foreground))] mb-1 group-hover:text-[hsl(var(--color-primary))] transition-colors">
                            {categoryName}
                          </h3>
                          <p className="text-xs text-[hsl(var(--color-muted-foreground))] line-clamp-2 mb-2">
                            {categoryDescription}
                          </p>
                          <div className="flex items-center text-xs font-medium text-[hsl(var(--color-primary))]">
                            <span className="bg-[hsl(var(--color-primary)/0.1)] px-2 py-0.5 rounded-md">
                              {t('home.categoriesSection.toolsCount', { count: categoryTools.length })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16" aria-label="Statistics">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[hsl(var(--color-border))]">
              <div className="p-4">
                <div className="text-3xl lg:text-4xl font-bold text-gradient mb-1">
                  {allTools.length}+
                </div>
                <div className="text-xs font-medium text-[hsl(var(--color-muted-foreground))] uppercase tracking-wider">
                  {t('home.stats.pdfTools')}
                </div>
              </div>
              <div className="p-4">
                <div className="text-3xl lg:text-4xl font-bold text-gradient mb-1">
                  100%
                </div>
                <div className="text-xs font-medium text-[hsl(var(--color-muted-foreground))] uppercase tracking-wider">
                  {t('home.stats.freeToUse')}
                </div>
              </div>
              <div className="p-4">
                <div className="text-3xl lg:text-4xl font-bold text-gradient mb-1">
                  {indexableLocales.length}
                </div>
                <div className="text-xs font-medium text-[hsl(var(--color-muted-foreground))] uppercase tracking-wider">
                  {t('home.stats.languages')}
                </div>
              </div>
              <div className="p-4">
                <div className="text-3xl lg:text-4xl font-bold text-gradient mb-1">
                  0
                </div>
                <div className="text-xs font-medium text-[hsl(var(--color-muted-foreground))] uppercase tracking-wider">
                  {t('home.stats.filesUploaded')}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
