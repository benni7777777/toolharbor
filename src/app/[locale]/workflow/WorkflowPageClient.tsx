'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowRight, FileText, GitBranch, HelpCircle, Home, Lock, Wrench } from 'lucide-react';
import { type Locale } from '@/lib/i18n/config';

const WorkflowEditor = dynamic(
    () => import('@/components/workflow/WorkflowEditor').then((mod) => mod.WorkflowEditor),
    {
        ssr: false,
        loading: () => (
            <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-3 border-[hsl(var(--color-primary))] border-t-transparent rounded-full animate-spin" />
                    <p className="text-[hsl(var(--color-muted-foreground))]">Loading workflow editor...</p>
                </div>
            </div>
        ),
    }
);

interface WorkflowPageClientProps {
    locale: Locale;
}

export default function WorkflowPageClient({ locale }: WorkflowPageClientProps) {
    const t = useTranslations('common');
    const tWorkflow = useTranslations('workflow');
    const workflowUseCases = [
        'Chain merge, split, organize, and compress steps without reopening separate tools.',
        'Build repeatable browser-side PDF flows for intake packs, upload prep, and review handoffs.',
        'Save time on recurring PDF cleanup jobs where the same sequence happens every week.',
    ];
    const workflowSteps = [
        'Add PDF tools to the canvas in the order your job actually happens.',
        'Run the flow in the browser and confirm each step before you export the final file.',
        'Reuse the workflow when the same merge, cleanup, or security sequence comes back again.',
    ];
    const featuredRoutes = [
        {
            href: `/${locale}/tools/category/organize-manage`,
            title: 'Organize and combine PDF files',
            description: 'Best for merge, split, delete, extract, and reorder flows that often start the workflow chain.',
        },
        {
            href: `/${locale}/tools/category/optimize-repair`,
            title: 'Compress and repair before delivery',
            description: 'Useful when the workflow needs a smaller, cleaner, or more reliable PDF output at the end.',
        },
        {
            href: `/${locale}/tools/category/secure-pdf`,
            title: 'Add security as the final step',
            description: 'Use encryption, metadata cleanup, or redaction after the structural work is finished.',
        },
        {
            href: `/${locale}/tools/merge-pdf`,
            title: 'Start with Merge PDF',
            description: 'High-intent route for combining several source files before the rest of the workflow runs.',
        },
        {
            href: `/${locale}/tools/compress-pdf`,
            title: 'Finish with Compress PDF',
            description: 'A common final step when the result needs to pass upload limits or email constraints.',
        },
        {
            href: `/${locale}/tools/sign-pdf`,
            title: 'Route into Sign PDF',
            description: 'Useful when the finished file still needs a visible signature before export.',
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))]">
            <header className="h-12 flex-shrink-0 border-b border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] px-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link
                        href={`/${locale}`}
                        className="flex items-center gap-2 text-[hsl(var(--color-foreground))] hover:text-[hsl(var(--color-primary))] transition-colors"
                    >
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[hsl(var(--color-primary))] to-[hsl(var(--color-accent))] shadow-sm">
                            <svg
                                className="h-4 w-4 text-white"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                <polyline points="14 2 14 8 20 8" />
                            </svg>
                        </div>
                        <span className="font-semibold text-sm hidden sm:inline">{t('brand')}</span>
                    </Link>

                    <span className="text-[hsl(var(--color-border))]">|</span>

                    <div className="flex items-center gap-1.5">
                        <GitBranch className="w-4 h-4 text-[hsl(var(--color-primary))]" />
                        <span className="text-sm font-medium text-[hsl(var(--color-foreground))]">
                            {tWorkflow('title') || 'PDF Workflow Builder'}
                        </span>
                    </div>
                </div>

                <nav className="flex items-center gap-1">
                    <Link
                        href={`/${locale}`}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))] hover:bg-[hsl(var(--color-muted))] rounded-md transition-colors"
                    >
                        <Home className="w-3.5 h-3.5" />
                        <span className="hidden md:inline">{t('navigation.home')}</span>
                    </Link>
                    <Link
                        href={`/${locale}/tools`}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))] hover:bg-[hsl(var(--color-muted))] rounded-md transition-colors"
                    >
                        <Wrench className="w-3.5 h-3.5" />
                        <span className="hidden md:inline">{t('navigation.tools')}</span>
                    </Link>
                    <Link
                        href={`/${locale}/about`}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))] hover:bg-[hsl(var(--color-muted))] rounded-md transition-colors"
                    >
                        <FileText className="w-3.5 h-3.5" />
                        <span className="hidden md:inline">{t('navigation.about')}</span>
                    </Link>
                    <Link
                        href={`/${locale}/faq`}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))] hover:bg-[hsl(var(--color-muted))] rounded-md transition-colors"
                    >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span className="hidden md:inline">{t('navigation.faq')}</span>
                    </Link>
                </nav>
            </header>

            <main id="main-content" className="mx-auto w-full max-w-screen-xl flex-1 xl:max-w-[calc(100vw-32rem)] 2xl:max-w-screen-xl" tabIndex={-1}>
                <section className="border-b border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))/0.86]">
                    <div className="mx-auto max-w-7xl px-4 py-8 lg:py-10">
                        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface-subtle))] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--color-accent-strong))]">
                                    <GitBranch className="h-3.5 w-3.5" aria-hidden="true" />
                                    <span>{tWorkflow('title') || 'PDF Workflow Builder'}</span>
                                </div>
                                <h1 className="mt-4 text-3xl font-bold tracking-tight text-[hsl(var(--color-foreground))] md:text-4xl">
                                    Build a repeatable PDF workflow in your browser
                                </h1>
                                <p className="mt-4 max-w-3xl text-base leading-7 text-[hsl(var(--color-muted-foreground))]">
                                    Use the workflow builder when one PDF job naturally turns into another, such as merge then compress,
                                    extract then sign, or organize then encrypt. The editor keeps the sequence visible so you can repeat
                                    it without rebuilding the same tool chain every time.
                                </p>

                                <div className="mt-6 grid gap-4 md:grid-cols-2">
                                    <div className="rounded-[1.5rem] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] p-5 shadow-[var(--shadow-sm)]">
                                        <h3 className="text-lg font-semibold text-[hsl(var(--color-foreground))]">
                                            Best for
                                        </h3>
                                        <ul className="mt-4 space-y-3 text-sm leading-6 text-[hsl(var(--color-muted-foreground))]">
                                            {workflowUseCases.map((item) => (
                                                <li key={item} className="flex gap-3">
                                                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[hsl(var(--color-primary))]" aria-hidden="true" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="rounded-[1.5rem] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] p-5 shadow-[var(--shadow-sm)]">
                                        <h3 className="text-lg font-semibold text-[hsl(var(--color-foreground))]">
                                            How it works
                                        </h3>
                                        <ol className="mt-4 space-y-3 text-sm leading-6 text-[hsl(var(--color-muted-foreground))]">
                                            {workflowSteps.map((item, index) => (
                                                <li key={item} className="flex gap-3">
                                                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[hsl(var(--color-primary)/0.12)] text-xs font-semibold text-[hsl(var(--color-primary))]">
                                                        {index + 1}
                                                    </span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                </div>
                            </div>

                            <aside className="space-y-4">
                                <div className="rounded-[1.5rem] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] p-5 shadow-[var(--shadow-sm)]">
                                    <h3 className="text-lg font-semibold text-[hsl(var(--color-foreground))]">
                                        Related next actions
                                    </h3>
                                    <div className="mt-4 space-y-3">
                                        {featuredRoutes.map((route) => (
                                            <Link
                                                key={route.href}
                                                href={route.href}
                                                className="block rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] px-4 py-3 transition-colors hover:border-[hsl(var(--color-primary)/0.35)] hover:bg-[hsl(var(--color-primary)/0.04)]"
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <div>
                                                        <p className="text-sm font-semibold text-[hsl(var(--color-foreground))]">
                                                            {route.title}
                                                        </p>
                                                        <p className="mt-1 text-sm leading-6 text-[hsl(var(--color-muted-foreground))]">
                                                            {route.description}
                                                        </p>
                                                    </div>
                                                    <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-[hsl(var(--color-primary))]" aria-hidden="true" />
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-[1.5rem] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface-subtle))] p-5 shadow-[var(--shadow-sm)]">
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[hsl(var(--color-accent-soft))] text-[hsl(var(--color-accent-strong))]">
                                            <Lock className="h-5 w-5" aria-hidden="true" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-[hsl(var(--color-foreground))]">
                                                Browser-side workflow context
                                            </h3>
                                            <p className="mt-2 text-sm leading-6 text-[hsl(var(--color-muted-foreground))]">
                                                The workflow editor is meant for real production jobs on the live PDF surface. It helps users
                                                sequence existing tools without forcing sign-up or a server-first handoff.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>

                <section className="min-h-[680px] overflow-hidden">
                    <WorkflowEditor />
                </section>
            </main>
        </div>
    );
}
