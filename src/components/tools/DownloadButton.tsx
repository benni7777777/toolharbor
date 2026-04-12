'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button, type ButtonProps } from '../ui/Button';
import { addRecentFile } from '@/lib/storage/recent-files';
import { useToolContext } from '@/lib/contexts/ToolContext';
import { sanitizeFilename } from '@/lib/utils/sanitize';
import { siteConfig } from '@/config/site';
import { ExternalLink, X } from 'lucide-react';

export interface DownloadButtonProps extends Omit<ButtonProps, 'onClick' | 'children'> {
  /** Blob data to download */
  file: Blob | null;
  /** Filename for the download */
  filename: string;
  /** Custom button text */
  label?: string;
  /** Callback after download starts */
  onDownloadStart?: () => void;
  /** Callback after download completes */
  onDownloadComplete?: () => void;
  /** Auto-revoke blob URL after download (default: true) */
  autoRevoke?: boolean;
  /** Show file size in button */
  showFileSize?: boolean;
  /** Tool slug for recent files tracking (optional, uses context if not provided) */
  toolSlug?: string;
  /** Tool display name for recent files tracking (optional, uses context if not provided) */
  toolName?: string;
}

/**
 * Format file size for display
 */
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * DownloadButton Component
 * Requirements: 5.4
 * 
 * Generates download link from Blob with custom filename.
 * Uses blob URLs that are revoked after download for security.
 */
export const DownloadButton: React.FC<DownloadButtonProps> = ({
  file,
  filename,
  label,
  onDownloadStart,
  onDownloadComplete,
  autoRevoke = true,
  showFileSize = true,
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = '',
  toolSlug: propToolSlug,
  toolName: propToolName,
  ...buttonProps
}) => {
  const t = useTranslations('common');
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showSponsorToast, setShowSponsorToast] = useState(false);
  
  // Get tool info from context if not provided via props
  const toolContext = useToolContext();
  const toolSlug = propToolSlug || toolContext?.toolSlug;
  const toolName = propToolName || toolContext?.toolName;
  const sponsorHref = `${siteConfig.sponsorship.redirectPathPrefix}/${siteConfig.ads.providers.zeydoo.placementId}?tool=${toolSlug ?? 'unknown'}&placement=${siteConfig.ads.providers.zeydoo.placementId}&provider=${siteConfig.ads.providers.zeydoo.providerQueryValue}`;
  const isSponsorEligible = size === 'lg' && variant !== 'ghost';

  // Create blob URL when file changes
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setBlobUrl(url);
      
      // Cleanup function to revoke URL when component unmounts or file changes
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setBlobUrl(null);
    }
  }, [file]);

  /**
   * Handle download click
   */
  const handleDownload = useCallback(() => {
    if (!file || !blobUrl || isDownloading) return;

    setIsDownloading(true);
    onDownloadStart?.();

    // Sanitize filename to prevent path traversal
    const safeFilename = sanitizeFilename(filename, 'download.pdf');

    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = safeFilename;
    link.style.display = 'none';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Revoke the blob URL after a short delay to ensure download starts
    if (autoRevoke) {
      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
        setBlobUrl(null);
        
        // Recreate URL for potential re-download
        if (file) {
          const newUrl = URL.createObjectURL(file);
          setBlobUrl(newUrl);
        }
      }, 100);
    }

    // Mark download as complete
    setTimeout(() => {
      setIsDownloading(false);
      onDownloadComplete?.();
      
      // Record to recent files if tool info is provided
      if (toolSlug && file) {
        addRecentFile(filename, file.size, toolSlug, toolName);
      }

      if (isSponsorEligible) {
        setShowSponsorToast(true);
      }
    }, 500);
  }, [file, blobUrl, filename, isDownloading, autoRevoke, onDownloadStart, onDownloadComplete, toolSlug, toolName, isSponsorEligible]);

  // Determine if button should be disabled
  const isDisabled = disabled || !file || !blobUrl;

  // Build button text
  const buttonText = label || t('buttons.download');
  const fileSizeText = showFileSize && file ? ` (${formatFileSize(file.size)})` : '';

  return (
    <>
      <Button
        variant={variant}
        size={size}
        disabled={isDisabled}
        loading={isDownloading}
        onClick={handleDownload}
        className={className}
        aria-label={`${buttonText}${fileSizeText}`}
        {...buttonProps}
      >
        {!isDownloading && (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        )}

        <span>
          {buttonText}
          {fileSizeText}
        </span>
      </Button>

      {showSponsorToast && (
        <div className="fixed bottom-4 right-4 z-[80] w-[min(24rem,calc(100vw-2rem))] rounded-[1.75rem] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-4 shadow-[var(--shadow-lg)]">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="inline-flex rounded-full bg-[hsl(var(--color-accent-soft))] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[hsl(var(--color-accent-strong))]">
                {siteConfig.sponsorship.label}
              </div>
              <p className="text-sm font-semibold text-[hsl(var(--color-foreground))]">{siteConfig.sponsorship.title}</p>
              <p className="text-xs leading-5 text-[hsl(var(--color-muted-foreground))]">
                {siteConfig.sponsorship.disclosure}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowSponsorToast(false)}
              className="rounded-full p-1 text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-foreground))]"
              aria-label="Dismiss sponsor suggestion"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-xs text-[hsl(var(--color-muted-foreground))]">{siteConfig.sponsorship.helperText}</p>
            <a
              href={sponsorHref}
              target="_blank"
              rel="noreferrer noopener sponsored"
              className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface-subtle))] px-4 py-2 text-sm font-medium text-[hsl(var(--color-foreground))] transition-colors hover:border-[hsl(var(--color-accent-strong))] hover:text-[hsl(var(--color-accent-strong))]"
            >
              <span>Open partner site</span>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default DownloadButton;
