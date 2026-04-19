'use client';

import { useTranslations } from 'next-intl';
import { Shield, Lock, Eye, Server, Trash2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import {
  AdsterraNativeBanner,
  AdsterraSessionScripts,
} from '@/components/ads/DynamicAdsterraComponents';
import MonetizationDisclosureCard from '@/components/ads/MonetizationDisclosureCard';
import { type Locale } from '@/lib/i18n/config';
import { siteConfig } from '@/config/site';
import { useMonetizationProfile } from '@/hooks/useMonetizationProfile';

interface PrivacyPageClientProps {
  locale: Locale;
}

export default function PrivacyPageClient({ locale }: PrivacyPageClientProps) {
  const t = useTranslations();
  const monetizationProfile = useMonetizationProfile();

  const privacyHighlights = [
    {
      icon: Server,
      title: 'No Server Uploads',
      description: 'Your files are never uploaded to our processing servers. Browser-based tools run locally where applicable.',
    },
    {
      icon: Lock,
      title: 'Local Processing',
      description: 'Document operations are performed with JavaScript, WebAssembly, and workers directly on your device.',
    },
    {
      icon: Trash2,
      title: 'Automatic Cleanup',
      description: 'Working data is cleared when the tab closes or when you reset the tool flow.',
    },
    {
      icon: Eye,
      title: 'Clear Boundaries',
      description: 'Ads and partner offers are labeled and controlled by frequency, geo, and disclosure rules that stay separate from file processing.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={locale} />

      <main className="mx-auto w-full max-w-screen-xl flex-1 xl:max-w-[calc(100vw-32rem)] min-[1800px]:max-w-screen-xl">
        <AdsterraSessionScripts
          popunder={monetizationProfile.allowAggressiveUnits && siteConfig.ads.placements.infoPages.popunder}
          socialBar={monetizationProfile.allowAggressiveUnits && siteConfig.ads.placements.infoPages.socialBar}
          placement="privacy-page"
          reason="info-page-load"
        />

        <section className="bg-gradient-to-br from-[hsl(var(--color-primary)/0.1)] via-[hsl(var(--color-background))] to-[hsl(var(--color-secondary)/0.1)] py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[hsl(var(--color-foreground))] mb-6">
                Privacy Policy
              </h1>
              <p className="text-lg text-[hsl(var(--color-muted-foreground))]">
                Your privacy is a product constraint, not a marketing line. {t('common.brand')} is built to keep
                document processing local while making source, attribution, and sponsor boundaries explicit.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-[hsl(var(--color-muted)/0.3)]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {privacyHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title} className="p-6 text-center" hover>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                      <Icon className="h-6 w-6 text-green-600" />
                    </div>
                    <h2 className="font-semibold text-[hsl(var(--color-foreground))] mb-2">
                      {item.title}
                    </h2>
                    <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                      {item.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-8">
                Last updated: April 12, 2026
              </p>

              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mt-8 mb-4">1. Introduction</h2>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-4">
                {t('common.brand')} (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
                This policy explains the data boundaries for our browser-first tools, public source links, and
                clearly labeled third-party sponsor placements.
              </p>

              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mt-8 mb-4">2. How the service works</h2>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-4">
                {t('common.brand')} is designed around local processing where applicable. That means:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[hsl(var(--color-muted-foreground))] mb-4">
                <li>Most document processing happens directly in your browser</li>
                <li>Your working files are not sent to OpenToolsKit processing servers</li>
                <li>We cannot inspect the content of files that stay on your device</li>
                <li>Your downloads stay available without sponsor interaction</li>
              </ul>

              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mt-8 mb-4">3. Information we collect</h2>
              <h3 className="text-xl font-semibold text-[hsl(var(--color-foreground))] mt-6 mb-3">3.1 Your files</h3>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-4">
                <strong>We do not collect your uploaded working files for processing.</strong> They remain in your browser
                unless you explicitly open an outbound third-party link or use a feature that states otherwise.
              </p>

              <h3 className="text-xl font-semibold text-[hsl(var(--color-foreground))] mt-6 mb-3">3.2 Usage signals</h3>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-4">
                We may rely on limited browser-side state to support language preference, theme choice, recent history,
                and ad frequency caps such as “show once per session.”
              </p>

              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mt-8 mb-4">4. Local storage and session state</h2>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-4">
                {t('common.brand')} may use your browser&apos;s local storage or session storage to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[hsl(var(--color-muted-foreground))] mb-4">
                <li>Remember language and theme preferences</li>
                <li>Store recent tool history and saved in-browser workflows</li>
                <li>Limit repeat exposure for non-core ad formats during the same session</li>
              </ul>

              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mt-8 mb-4">5. Ads and partner offers</h2>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-4">
                OpenToolsKit may show labeled ad placements or partner suggestions on non-tool-action pages and after a
                successful result. These surfaces help fund the open-source service.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[hsl(var(--color-muted-foreground))] mb-4">
                <li>Some eligible downloads may show a clearly labeled timed sponsor gate before the file unlocks</li>
                <li>Partner links are labeled and open away from the current tool flow</li>
                <li>Third-party networks may deliver creatives, links, and landing pages</li>
              </ul>

              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mt-8 mb-4">6. Third-party services</h2>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-4">
                We may rely on third-party providers for static hosting, outbound sponsor routing, ad inventory, and
                public source distribution. OpenToolsKit does not individually author every advertisement or every
                third-party destination page shown by those networks.
              </p>

              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mt-8 mb-4">7. Source availability and attribution</h2>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-4">
                OpenToolsKit is based on PDFCraft under AGPL-3.0. The live site links to the public repository and keeps
                attribution visible through the footer, support page, and NOTICE file.
              </p>

              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mt-8 mb-4">8. Contact and support</h2>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-4">
                OpenToolsKit does not provide direct email support. For privacy questions, bug reports, and source review,
                use the public support page and GitHub issue tracker.
              </p>
            </div>
          </div>
        </section>

        <section className="py-4">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              {monetizationProfile.allowNativeUnits && (
                <AdsterraNativeBanner
                  slotName="info-native"
                  description="This privacy page may carry a labeled native ad placement on behalf of a third-party network. It does not affect file processing or downloads."
                />
              )}
            </div>
          </div>
        </section>

        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <MonetizationDisclosureCard locale={locale} />
            </div>
          </div>
        </section>

        <section className="py-12 bg-[hsl(var(--color-muted)/0.3)]">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-3 px-6 py-4 bg-green-50 border border-green-200 rounded-lg">
                <Shield className="h-8 w-8 text-green-600" />
                <div className="text-left">
                  <p className="font-semibold text-green-800">
                    {t('common.footer.privacyBadge')}
                  </p>
                  <p className="text-sm text-green-600">
                    Your documents are processed securely in your browser
                  </p>
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
