import Link from 'next/link';
import { defaultLocale } from '@/lib/i18n/config';

export default function RootNotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="text-3xl font-bold text-[hsl(var(--color-foreground))]">
        Page not found
      </h1>
      <p className="mt-4 text-base leading-7 text-[hsl(var(--color-muted-foreground))]">
        This URL is not a current OpenToolsKit route. Continue to the canonical English site or browse the tool directory.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href={`/${defaultLocale}/`}
          className="rounded-lg bg-[hsl(var(--color-primary))] px-5 py-3 text-sm font-semibold text-[hsl(var(--color-primary-foreground))]"
        >
          Open English homepage
        </Link>
        <Link
          href={`/${defaultLocale}/tools/`}
          className="rounded-lg border border-[hsl(var(--color-border))] px-5 py-3 text-sm font-semibold text-[hsl(var(--color-foreground))]"
        >
          Browse tools
        </Link>
      </div>
    </main>
  );
}
