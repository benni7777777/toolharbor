'use client';

import { Laptop, MoonStar, SunMedium } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useTheme } from './ThemeProvider';
import type { ThemePreference } from '@/config/site';

const themeOptions: Array<{
  label: string;
  value: ThemePreference;
  icon: typeof SunMedium;
}> = [
  { label: 'Light', value: 'light', icon: SunMedium },
  { label: 'Dark', value: 'dark', icon: MoonStar },
  { label: 'System', value: 'system', icon: Laptop },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="hidden lg:flex items-center gap-1 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface-subtle))] p-1"
      aria-label="Theme preference"
      role="group"
    >
      {themeOptions.map(({ label, value, icon: Icon }) => {
        const isActive = theme === value;
        return (
          <Button
            key={value}
            variant="ghost"
            size="sm"
            onClick={() => setTheme(value)}
            aria-pressed={isActive}
            className={`rounded-full px-3 py-2 text-xs ${
              isActive
                ? 'bg-[hsl(var(--color-card))] text-[hsl(var(--color-foreground))] shadow-sm'
                : 'text-[hsl(var(--color-muted-foreground))]'
            }`}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{label}</span>
          </Button>
        );
      })}
    </div>
  );
}

export default ThemeToggle;
