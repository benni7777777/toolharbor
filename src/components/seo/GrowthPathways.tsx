'use client';

import Link from 'next/link';
import { ArrowRight, Layers, Route, Wrench } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import type { Tool } from '@/types/tool';
import { buildToolGrowthPathways, getGrowthClusterForTool } from '@/lib/growth/clusters';

interface GrowthPathwaysProps {
  tool: Tool;
  locale: string;
  relatedTools: Tool[];
  localizedRelatedTools: Record<string, { title: string; description: string }>;
}

export function GrowthPathways({ tool, locale, relatedTools, localizedRelatedTools }: GrowthPathwaysProps) {
  const cluster = getGrowthClusterForTool(tool);
  const pathways = buildToolGrowthPathways(tool, locale);
  const adjacentTools = relatedTools.slice(0, 4);

  return (
    <section className="mt-10" aria-labelledby="growth-pathways-heading" data-testid="tool-growth-pathways">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--color-accent-strong))]">
            Task pathways
          </p>
          <h2 id="growth-pathways-heading" className="mt-2 text-2xl font-bold text-[hsl(var(--color-foreground))]">
            Where this fits in {cluster.name.toLowerCase()}
          </h2>
        </div>
        <span className="text-sm text-[hsl(var(--color-muted-foreground))]">
          Choose the next useful PDF task
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {pathways.map((pathway) => (
          <Card key={pathway.href} variant="outlined" size="lg" className="glass-card">
            <div className="flex h-full flex-col">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))]" aria-hidden="true">
                {pathway.role === 'hub' && <Layers className="h-5 w-5" />}
                {pathway.role === 'workflow' && <Route className="h-5 w-5" />}
                {pathway.role === 'directory' && <Wrench className="h-5 w-5" />}
              </div>
              <h3 className="text-base font-semibold text-[hsl(var(--color-foreground))]">
                {pathway.label}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-[hsl(var(--color-muted-foreground))]">
                {pathway.description}
              </p>
              <Link
                href={pathway.href}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--color-primary))] hover:underline"
              >
                Go to {pathway.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {adjacentTools.length > 0 && (
        <nav className="mt-5 rounded-[1.5rem] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-5" aria-label="Adjacent PDF tools">
          <p className="text-sm font-semibold text-[hsl(var(--color-foreground))]">
            Adjacent tools for the next step
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {adjacentTools.map((relatedTool) => {
              const localized = localizedRelatedTools[relatedTool.id];
              const name = localized?.title || relatedTool.id
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

              return (
                <Link
                  key={relatedTool.id}
                  href={`/${locale}/tools/${relatedTool.slug}`}
                  className="inline-flex min-h-10 items-center rounded-full border border-[hsl(var(--color-border))] px-4 text-sm font-medium text-[hsl(var(--color-foreground))] transition-colors hover:border-[hsl(var(--color-primary)/0.55)] hover:text-[hsl(var(--color-primary))]"
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </section>
  );
}
