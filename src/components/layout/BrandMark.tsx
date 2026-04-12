import React from 'react';

interface BrandMarkProps {
  className?: string;
}

export function BrandMark({ className = 'h-10 w-10' }: BrandMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="6" y="6" width="52" height="52" rx="18" fill="url(#otk-bg)" />
      <path
        d="M18 24C18 19.5817 21.5817 16 26 16H37C42.5228 16 47 20.4772 47 26V37C47 42.5228 42.5228 47 37 47H26C21.5817 47 18 43.4183 18 39V24Z"
        fill="url(#otk-core)"
      />
      <path
        d="M22 22H31C36.5228 22 41 26.4772 41 32V42H32C26.4772 42 22 37.5228 22 32V22Z"
        fill="#071217"
        fillOpacity="0.92"
      />
      <path
        d="M31 22H41V32C41 37.5228 36.5228 42 31 42V22Z"
        fill="#F4EFE4"
      />
      <circle cx="46" cy="18" r="5" fill="#FF7A59" />
      <defs>
        <linearGradient id="otk-bg" x1="10" y1="10" x2="55" y2="55" gradientUnits="userSpaceOnUse">
          <stop stopColor="#15B8B0" />
          <stop offset="1" stopColor="#0A6D73" />
        </linearGradient>
        <linearGradient id="otk-core" x1="18" y1="16" x2="47" y2="47" gradientUnits="userSpaceOnUse">
          <stop stopColor="#DFF7F3" />
          <stop offset="1" stopColor="#A5F0EA" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default BrandMark;
