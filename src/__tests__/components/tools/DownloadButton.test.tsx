import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import { DownloadButton } from '@/components/tools/DownloadButton';
import { siteConfig } from '@/config/site';

const mockMonetizationProfile = vi.fn();

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'buttons.download': 'Download',
    };
    return translations[key] || key;
  },
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/en/tools/merge-pdf',
}));

vi.mock('@/hooks/useMonetizationProfile', () => ({
  useMonetizationProfile: () => mockMonetizationProfile(),
}));

// Store original URL methods
const originalCreateObjectURL = URL.createObjectURL;
const originalRevokeObjectURL = URL.revokeObjectURL;

// Mock URL methods
const mockCreateObjectURL = vi.fn(() => 'blob:mock-url');
const mockRevokeObjectURL = vi.fn();

beforeEach(() => {
  URL.createObjectURL = mockCreateObjectURL;
  URL.revokeObjectURL = mockRevokeObjectURL;
  vi.clearAllMocks();
  window.localStorage.clear();
  window.sessionStorage.clear();
  delete window.__OTK_MONETIZATION_DEBUG__;
  window.adsterraPopunderLoaded = false;
  window.dataLayer = [];
  mockMonetizationProfile.mockReturnValue({
    country: 'GB',
    isUkEea: true,
    isLoading: false,
    previewMode: 'auto',
    allowNativeUnits: true,
    allowAggressiveUnits: false,
    allowHardGate: false,
  });
});

afterEach(() => {
  URL.createObjectURL = originalCreateObjectURL;
  URL.revokeObjectURL = originalRevokeObjectURL;
  document.querySelectorAll('script[data-otk-adsterra]').forEach(script => script.remove());
  window.adsterraPopunderLoaded = false;
  window.localStorage.clear();
  window.sessionStorage.clear();
  vi.unstubAllEnvs();
  cleanup();
});

/**
 * Create a mock Blob
 */
function createMockBlob(content: string, type: string = 'application/pdf'): Blob {
  return new Blob([content], { type });
}

describe('DownloadButton', () => {
  describe('Rendering', () => {
    it('renders with default label', () => {
      const mockBlob = createMockBlob('test content');
      render(<DownloadButton file={mockBlob} filename="test.pdf" />);
      
      expect(screen.getByRole('button', { name: /download/i })).toBeInTheDocument();
    });

    it('renders with custom label', () => {
      const mockBlob = createMockBlob('test content');
      render(
        <DownloadButton 
          file={mockBlob} 
          filename="test.pdf"
          label="Save File"
          showFileSize={false}
        />
      );
      
      expect(screen.getByText('Save File')).toBeInTheDocument();
    });

    it('displays file size when showFileSize is true', () => {
      const mockBlob = createMockBlob('a'.repeat(1024)); // 1KB
      render(
        <DownloadButton 
          file={mockBlob} 
          filename="test.pdf"
          showFileSize={true}
        />
      );
      
      expect(screen.getByText(/1.*KB/)).toBeInTheDocument();
    });

    it('does not display file size when showFileSize is false', () => {
      const mockBlob = createMockBlob('a'.repeat(1024));
      render(
        <DownloadButton 
          file={mockBlob} 
          filename="test.pdf"
          showFileSize={false}
        />
      );
      
      expect(screen.queryByText(/KB/)).not.toBeInTheDocument();
    });

    it('renders download icon', () => {
      const mockBlob = createMockBlob('test content');
      render(<DownloadButton file={mockBlob} filename="test.pdf" />);
      
      const button = screen.getByRole('button');
      expect(button.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('is disabled when file is null', () => {
      render(<DownloadButton file={null} filename="test.pdf" />);
      
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('is disabled when disabled prop is true', () => {
      const mockBlob = createMockBlob('test content');
      render(
        <DownloadButton 
          file={mockBlob} 
          filename="test.pdf"
          disabled={true}
        />
      );
      
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('is enabled when file is provided and not disabled', () => {
      const mockBlob = createMockBlob('test content');
      render(<DownloadButton file={mockBlob} filename="test.pdf" />);
      
      expect(screen.getByRole('button')).not.toBeDisabled();
    });
  });

  describe('Download Functionality', () => {
    it('creates blob URL when file is provided', () => {
      const mockBlob = createMockBlob('test content');
      render(<DownloadButton file={mockBlob} filename="test.pdf" />);
      
      expect(mockCreateObjectURL).toHaveBeenCalledWith(mockBlob);
    });

    it('calls onDownloadStart when clicked', () => {
      const mockBlob = createMockBlob('test content');
      const mockOnDownloadStart = vi.fn();
      
      render(
        <DownloadButton 
          file={mockBlob} 
          filename="test.pdf"
          onDownloadStart={mockOnDownloadStart}
        />
      );
      
      fireEvent.click(screen.getByRole('button'));
      
      expect(mockOnDownloadStart).toHaveBeenCalled();
    });

    it('calls onDownloadComplete after download', async () => {
      vi.useFakeTimers();
      
      const mockBlob = createMockBlob('test content');
      const mockOnDownloadComplete = vi.fn();
      
      render(
        <DownloadButton 
          file={mockBlob} 
          filename="test.pdf"
          onDownloadComplete={mockOnDownloadComplete}
        />
      );
      
      fireEvent.click(screen.getByRole('button'));
      
      // Fast-forward timers
      await act(async () => {
        vi.advanceTimersByTime(600);
      });
      
      expect(mockOnDownloadComplete).toHaveBeenCalled();
      
      vi.useRealTimers();
    });

    it('shows the monetization panel for eligible downloads', async () => {
      vi.useFakeTimers();

      const mockBlob = createMockBlob('test content');
      render(
        <DownloadButton
          file={mockBlob}
          filename="test.pdf"
          variant="secondary"
          size="lg"
        />
      );

      fireEvent.click(screen.getByRole('button'));

      await act(async () => {
        vi.advanceTimersByTime(600);
      });

      expect(screen.getByTestId('download-monetization-panel')).toHaveClass('xl:right-72');

      vi.useRealTimers();
    });

    it('uses the soft post-result drawer by default even for aggressive eligible downloads', async () => {
      vi.useFakeTimers();
      mockMonetizationProfile.mockReturnValue({
        country: 'US',
        isUkEea: false,
        isLoading: false,
        previewMode: 'aggressive',
        allowNativeUnits: true,
        allowAggressiveUnits: true,
        allowHardGate: true,
      });

      const mockBlob = createMockBlob('test content');
      render(
        <DownloadButton
          file={mockBlob}
          filename="test.pdf"
          variant="secondary"
          size="lg"
        />
      );

      fireEvent.click(screen.getByRole('button'));

      await act(async () => {
        vi.advanceTimersByTime(600);
      });

      expect(screen.queryByTestId('download-gate-overlay')).not.toBeInTheDocument();
      expect(screen.getByTestId('download-monetization-panel')).toBeInTheDocument();

      vi.useRealTimers();
    });

    it('fires popunder before any synthetic download link on the trusted click path', () => {
      mockMonetizationProfile.mockReturnValue({
        country: 'US',
        isUkEea: false,
        isLoading: false,
        previewMode: 'aggressive',
        allowNativeUnits: true,
        allowAggressiveUnits: true,
        allowHardGate: true,
      });

      const appendOrder: string[] = [];
      const originalHeadAppendChild = document.head.appendChild.bind(document.head);
      const originalAppendChild = document.body.appendChild.bind(document.body);
      const headAppendSpy = vi.spyOn(document.head, 'appendChild').mockImplementation((node: Node) => {
        if (node instanceof HTMLScriptElement && node.dataset.otkAdsterra) {
          appendOrder.push(`script:${node.dataset.otkAdsterra}`);
        }

        return originalHeadAppendChild(node) as Node;
      });
      const appendSpy = vi.spyOn(document.body, 'appendChild').mockImplementation((node: Node) => {
        if (node instanceof HTMLScriptElement && node.dataset.otkAdsterra) {
          appendOrder.push(`script:${node.dataset.otkAdsterra}`);
        }

        if (node instanceof HTMLAnchorElement && node.download) {
          appendOrder.push('download-anchor');
        }

        return originalAppendChild(node) as Node;
      });

      const mockBlob = createMockBlob('test content');
      render(
        <DownloadButton
          file={mockBlob}
          filename="test.pdf"
          variant="secondary"
          size="lg"
        />,
      );

      expect(document.querySelector('script[data-otk-adsterra="popunder"]')).toBeNull();

      fireEvent.click(screen.getByRole('button'));

      expect(appendOrder[0]).toBe('script:popunder');
      expect(appendOrder.indexOf('script:popunder')).toBeLessThan(appendOrder.indexOf('download-anchor'));
      expect(document.querySelectorAll('script[data-otk-adsterra="popunder"]')).toHaveLength(1);
      expect(document.querySelector('head script[data-otk-adsterra="popunder"]')).toBeTruthy();
      expect(document.body.querySelector('script[data-otk-adsterra="popunder"]')).toBeNull();

      headAppendSpy.mockRestore();
      appendSpy.mockRestore();
    });

    it('logs why popunder is skipped when UK/EEA policy keeps aggressive units off', () => {
      const mockBlob = createMockBlob('test content');
      render(
        <DownloadButton
          file={mockBlob}
          filename="test.pdf"
          variant="secondary"
          size="lg"
        />,
      );

      fireEvent.click(screen.getByRole('button'));

      const blockedEvents = window.__OTK_MONETIZATION_DEBUG__?.events.filter(
        event => event.monetizationEvent === 'monetization_blocked_reason'
          && event.reason === 'uk-eea-native-only'
          && (event.metadata as { unit?: string } | undefined)?.unit === 'popunder',
      );

      expect(blockedEvents).toHaveLength(1);
      expect(document.querySelector('script[data-otk-adsterra="popunder"]')).toBeNull();
    });

    it('uses a partner CTA route that matches the worker allowlist', async () => {
      vi.useFakeTimers();

      const mockBlob = createMockBlob('test content');
      render(
        <DownloadButton
          file={mockBlob}
          filename="test.pdf"
          variant="secondary"
          size="lg"
        />,
      );

      fireEvent.click(screen.getByRole('button'));

      await act(async () => {
        vi.advanceTimersByTime(600);
      });

      const partnerLink = screen.getAllByRole('link', { name: /open route/i })[0];
      const href = partnerLink.getAttribute('href') ?? '';

      expect(href).toContain(`${siteConfig.sponsorship.redirectPathPrefix}/${siteConfig.ads.providers.partnerRedirect.placementId}`);
      expect(href).toContain('placement=post-result-primary');
      expect(href).toContain('provider=partner');
      expect(href).toContain('source=tool%3Aunknown%3Apost-result-primary%3Acontextual-soft%3Asoft-bordered');
      expect(href).toContain('campaign=post-result-primary');
      expect(href).toContain('subId=');

      vi.useRealTimers();
    });

    it('shows a 15-second gate only when the hard-gate feature flag is enabled', () => {
      vi.stubEnv('NEXT_PUBLIC_OTK_HARD_GATE_ENABLED', 'true');
      mockMonetizationProfile.mockReturnValue({
        country: 'US',
        isUkEea: false,
        isLoading: false,
        previewMode: 'aggressive',
        allowNativeUnits: true,
        allowAggressiveUnits: true,
        allowHardGate: true,
      });

      const mockBlob = createMockBlob('test content');
      render(
        <DownloadButton
          file={mockBlob}
          filename="test.pdf"
          variant="secondary"
          size="lg"
        />
      );

      fireEvent.click(screen.getByRole('button'));

      expect(screen.getByTestId('download-gate-overlay')).toBeInTheDocument();
      expect(screen.getByText(/download unlocks in 15 seconds/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /download unlocks in 15s/i })).toBeDisabled();
    });
  });

  describe('Button Variants', () => {
    it('renders with primary variant by default', () => {
      const mockBlob = createMockBlob('test content');
      render(<DownloadButton file={mockBlob} filename="test.pdf" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-[hsl(var(--color-primary))]');
    });

    it('renders with secondary variant', () => {
      const mockBlob = createMockBlob('test content');
      render(
        <DownloadButton 
          file={mockBlob} 
          filename="test.pdf"
          variant="secondary"
        />
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-[hsl(var(--color-secondary))]');
    });

    it('renders with different sizes', () => {
      const mockBlob = createMockBlob('test content');
      const { rerender } = render(
        <DownloadButton 
          file={mockBlob} 
          filename="test.pdf"
          size="sm"
        />
      );
      
      let button = screen.getByRole('button');
      expect(button).toHaveClass('px-3');
      
      rerender(
        <DownloadButton 
          file={mockBlob} 
          filename="test.pdf"
          size="lg"
        />
      );
      
      button = screen.getByRole('button');
      expect(button).toHaveClass('px-6');
    });
  });

  describe('Accessibility', () => {
    it('has descriptive aria-label', () => {
      const mockBlob = createMockBlob('a'.repeat(1024));
      render(
        <DownloadButton 
          file={mockBlob} 
          filename="test.pdf"
          showFileSize={true}
        />
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', expect.stringContaining('Download'));
    });

    it('is focusable when enabled', () => {
      const mockBlob = createMockBlob('test content');
      render(<DownloadButton file={mockBlob} filename="test.pdf" />);
      
      const button = screen.getByRole('button');
      button.focus();
      expect(document.activeElement).toBe(button);
    });
  });

  describe('File Size Formatting', () => {
    it('formats bytes correctly', () => {
      const mockBlob = createMockBlob('a'.repeat(500));
      render(
        <DownloadButton 
          file={mockBlob} 
          filename="test.pdf"
          showFileSize={true}
        />
      );
      
      expect(screen.getByText(/Bytes/)).toBeInTheDocument();
    });

    it('formats KB correctly', () => {
      const mockBlob = createMockBlob('a'.repeat(2048));
      render(
        <DownloadButton 
          file={mockBlob} 
          filename="test.pdf"
          showFileSize={true}
        />
      );
      
      expect(screen.getByText(/KB/)).toBeInTheDocument();
    });

    it('formats MB correctly', () => {
      const mockBlob = createMockBlob('a'.repeat(1024 * 1024 * 2));
      render(
        <DownloadButton 
          file={mockBlob} 
          filename="test.pdf"
          showFileSize={true}
        />
      );
      
      expect(screen.getByText(/MB/)).toBeInTheDocument();
    });
  });

  describe('Cleanup', () => {
    it('revokes blob URL on unmount', () => {
      const mockBlob = createMockBlob('test content');
      const { unmount } = render(
        <DownloadButton file={mockBlob} filename="test.pdf" />
      );
      
      unmount();
      
      expect(mockRevokeObjectURL).toHaveBeenCalled();
    });

    it('revokes old blob URL when file changes', () => {
      const mockBlob1 = createMockBlob('content 1');
      const mockBlob2 = createMockBlob('content 2');
      
      const { rerender } = render(
        <DownloadButton file={mockBlob1} filename="test1.pdf" />
      );
      
      // Clear the mock to track only new calls
      mockRevokeObjectURL.mockClear();
      
      rerender(<DownloadButton file={mockBlob2} filename="test2.pdf" />);
      
      // Should have revoked the first URL
      expect(mockRevokeObjectURL).toHaveBeenCalled();
    });
  });
});
