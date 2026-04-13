'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, Zap, Wrench, Lock, Sparkles, Edit, FileImage, FolderOpen, Settings, ShieldCheck, Star, Workflow, Boxes } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BrandMark } from '@/components/layout/BrandMark';
import AdsterraNativeBanner from '@/components/ads/AdsterraNativeBanner';
import AdsterraSessionScripts from '@/components/ads/AdsterraSessionScripts';
import AdsterraDisplayBanner from '@/components/ads/AdsterraDisplayBanner';
import MonetizationDisclosureCard from '@/components/ads/MonetizationDisclosureCard';
import { ToolGrid } from '@/components/tools/ToolGrid';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { getAllTools, getToolsByCategory, getPopularTools } from '@/config/tools';
import { type Locale } from '@/lib/i18n/config';
import { CATEGORY_INFO, type ToolCategory } from '@/types/tool';
import { siteConfig } from '@/config/site';
import { useMonetizationProfile } from '@/hooks/useMonetizationProfile';

interface HomePageClientProps {
  locale: Locale;
  localizedToolContent?: Record<string, { title: string; description: string }>;
}

// ... (previous imports)

// ... (props interface)

// ... (previous imports)

// ... (props interface)

export default function HomePageClient({ locale, localizedToolContent }: HomePageClientProps) {
  const t = useTranslations();
  const monetizationProfile = useMonetizationProfile();
  const allTools = getAllTools();
  const popularTools = getPopularTools();

  // Feature highlights (same as before)
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

      <main id="main-content" className="flex-1 relative" tabIndex={-1}>
        <AdsterraSessionScripts
          popunder={monetizationProfile.allowAggressiveUnits && siteConfig.ads.placements.homepage.popunder}
          socialBar={monetizationProfile.allowAggressiveUnits && siteConfig.ads.placements.homepage.socialBar}
        />

        {/* Hero Section */}
        <section
          className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28"
          aria-labelledby="hero-title"
        >
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-[8%] top-[8%] h-64 w-64 rounded-full bg-[hsl(var(--color-accent)/0.14)] blur-3xl" />
            <div className="absolute right-[4%] top-[14%] h-72 w-72 rounded-full bg-[hsl(var(--color-highlight)/0.15)] blur-3xl" />
            <div className="absolute bottom-[-8rem] left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[hsl(var(--color-primary)/0.12)] blur-3xl" />
          </div>

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
                <Link href={`/${locale}/tools`}>
                  <Button variant="primary" size="lg" className="h-12 rounded-full px-8 text-base shadow-[var(--shadow-md)] transition-all hover:-translate-y-0.5">
                    {t('home.hero.cta')}
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Button>
                </Link>
                <Link href={`/${locale}/workflow`}>
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
                  <span>Phase 1: PDF suite, workflow editor, extension</span>
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

        <section className="py-4">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              {monetizationProfile.allowNativeUnits && (
                <AdsterraNativeBanner
                  slotName="homepage-native"
                  description="OpenToolsKit may show a native sponsor placement on discovery surfaces like the homepage. Tool actions and downloads remain separate."
                />
              )}
            </div>
          </div>
        </section>

        {monetizationProfile.allowAggressiveUnits && (
          <section className="py-4">
            <div className="container mx-auto px-4">
              <AdsterraDisplayBanner slot="leaderboard" className="mx-auto max-w-5xl" />
            </div>
          </section>
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
              <Link href={`/${locale}/tools`}>
                <Button variant="outline" size="sm" className="group">
                  {t('common.navigation.tools')}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Button>
              </Link>
            </div>
            <ToolGrid
              tools={getToolsByCategory('organize-manage').slice(0, 8)}
              locale={locale}
              localizedToolContent={localizedToolContent}
              enableDiscoveryMonetization
              allowAggressiveUnits={monetizationProfile.allowAggressiveUnits}
            />
          </div>
        </section>

        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <MonetizationDisclosureCard locale={locale} />
            </div>
          </div>
        </section>

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
                const categoryTools = getToolsByCategory(category);
                const Icon = categoryIcons[category];
                const categoryName = t(`home.categories.${categoryTranslationKeys[category]}`);
                const categoryDescription = t(`home.categoriesDescription.${categoryTranslationKeys[category]}`);

                return (
                  <Link
                    key={category}
                    href={`/${locale}/tools/category/${category}`}
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
                  9
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
