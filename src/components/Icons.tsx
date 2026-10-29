import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Retro Manila / Tan Pixel Folder (like oklama's default folder)
export const ManilaFolderIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`rendering-pixelated select-none ${className}`}
    style={{ shapeRendering: 'crispEdges' }}
  >
    {/* Tab */}
    <rect x="8" y="14" width="22" height="6" fill="#D99B26" />
    <rect x="10" y="12" width="18" height="4" fill="#F4CF74" />
    {/* Back body */}
    <rect x="8" y="18" width="48" height="34" fill="#C88B18" />
    {/* Front leaf */}
    <rect x="6" y="24" width="52" height="28" fill="#F7DC8B" />
    <rect x="8" y="26" width="48" height="2" fill="#FFF2BF" />
    {/* Folder shadow / bottom border */}
    <rect x="6" y="52" width="52" height="2" fill="#8C5C08" />
    <rect x="58" y="24" width="2" height="28" fill="#B27814" />
    <rect x="4" y="24" width="2" height="28" fill="#D99B26" />
  </svg>
);

// Deep Black Pixel Folder (like oklama's black folder)
export const BlackFolderIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`rendering-pixelated select-none ${className}`}
    style={{ shapeRendering: 'crispEdges' }}
  >
    {/* Tab */}
    <rect x="8" y="14" width="22" height="6" fill="#222222" />
    <rect x="10" y="12" width="18" height="4" fill="#383838" />
    {/* Back body */}
    <rect x="8" y="18" width="48" height="34" fill="#111111" />
    {/* Front leaf */}
    <rect x="6" y="24" width="52" height="28" fill="#171717" />
    <rect x="8" y="26" width="48" height="2" fill="#444444" />
    {/* Shadow / borders */}
    <rect x="6" y="52" width="52" height="2" fill="#000000" />
    <rect x="58" y="24" width="2" height="28" fill="#0A0A0A" />
    <rect x="4" y="24" width="2" height="28" fill="#2B2B2B" />
  </svg>
);

// Neutral Gray Pixel Folder (like oklama's gray folder)
export const GrayFolderIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`rendering-pixelated select-none ${className}`}
    style={{ shapeRendering: 'crispEdges' }}
  >
    {/* Tab */}
    <rect x="8" y="14" width="22" height="6" fill="#71717A" />
    <rect x="10" y="12" width="18" height="4" fill="#A1A1AA" />
    {/* Back body */}
    <rect x="8" y="18" width="48" height="34" fill="#52525B" />
    {/* Front leaf */}
    <rect x="6" y="24" width="52" height="28" fill="#8A8A93" />
    <rect x="8" y="26" width="48" height="2" fill="#D4D4D8" />
    {/* Shadow / borders */}
    <rect x="6" y="52" width="52" height="2" fill="#3F3F46" />
    <rect x="58" y="24" width="2" height="28" fill="#52525B" />
    <rect x="4" y="24" width="2" height="28" fill="#71717A" />
  </svg>
);

// Polaroid Photo Sticker (like oklama's mm.jpg desktop photo)
export const PolaroidIcon: React.FC<IconProps> = ({ className = '', size = 68 }) => (
  <div
    className={`relative select-none p-1.5 bg-white border border-neutral-300 dark:border-neutral-700 shadow-[2px_2px_0_rgba(0,0,0,0.2)] hover:shadow-[3px_3px_0_rgba(205,63,37,0.4)] transition-all ${className}`}
    style={{ width: size, height: size }}
  >
    {/* Inner photo image thumbnail */}
    <div className="w-full h-3/4 bg-neutral-900 overflow-hidden relative flex items-center justify-center border border-neutral-800">
      <div className="absolute inset-0 bg-gradient-to-tr from-stone-900 via-neutral-800 to-amber-950/40 opacity-90" />
      <span className="text-[9px] font-mono text-neutral-300 tracking-wider z-10">35MM</span>
      <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-pulse" />
    </div>
    <div className="h-1/4 flex items-center justify-center">
      <span className="text-[7px] font-mono text-neutral-600 truncate font-bold">2026.RAW</span>
    </div>
  </div>
);

// Text Document Icon
export const TextDocumentIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`rendering-pixelated select-none ${className}`}
    style={{ shapeRendering: 'crispEdges' }}
  >
    {/* Page outline */}
    <rect x="14" y="10" width="36" height="46" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
    {/* Fold corner */}
    <path d="M40 10V20H50" fill="#E4E4E7" stroke="#000000" strokeWidth="2" />
    {/* Text lines */}
    <rect x="20" y="24" width="24" height="2" fill="#52525B" />
    <rect x="20" y="30" width="24" height="2" fill="#52525B" />
    <rect x="20" y="36" width="18" height="2" fill="#52525B" />
    <rect x="20" y="42" width="20" height="2" fill="#CD3F25" />
  </svg>
);

// Audio Cassette / Waveform Icon
export const AudioCassetteIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`rendering-pixelated select-none ${className}`}
    style={{ shapeRendering: 'crispEdges' }}
  >
    {/* Cassette body */}
    <rect x="8" y="16" width="48" height="34" rx="2" fill="#1C1917" stroke="#44403C" strokeWidth="2" />
    {/* Label */}
    <rect x="14" y="22" width="36" height="18" fill="#F5F5F4" stroke="#78716C" strokeWidth="1" />
    {/* Spools window */}
    <rect x="22" y="26" width="20" height="10" fill="#292524" />
    <circle cx="26" cy="31" r="3" fill="#D6D3D1" />
    <circle cx="38" cy="31" r="3" fill="#D6D3D1" />
    {/* Bottom screws / tape trapezoid */}
    <rect x="16" y="44" width="32" height="4" fill="#292524" />
  </svg>
);

// Terminal Shell Icon
export const TerminalIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`rendering-pixelated select-none ${className}`}
    style={{ shapeRendering: 'crispEdges' }}
  >
    {/* Shell window */}
    <rect x="10" y="12" width="44" height="40" fill="#0A0A0A" stroke="#262626" strokeWidth="2" />
    <rect x="10" y="12" width="44" height="8" fill="#171717" />
    {/* Dots */}
    <circle cx="15" cy="16" r="1.5" fill="#EF4444" />
    <circle cx="20" cy="16" r="1.5" fill="#F59E0B" />
    <circle cx="25" cy="16" r="1.5" fill="#10B981" />
    {/* Prompt */}
    <text x="16" y="32" fill="#22C55E" fontFamily="monospace" fontSize="11" fontWeight="bold">&gt;_</text>
    <rect x="30" y="25" width="6" height="8" fill="#22C55E" />
  </svg>
);
