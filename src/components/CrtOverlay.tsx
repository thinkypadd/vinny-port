import React from 'react';

interface CrtOverlayProps {
  active: boolean;
}

export const CrtOverlay: React.FC<CrtOverlayProps> = ({ active }) => {
  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {/* Scanline pattern */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.75) 50%)',
          backgroundSize: '100% 4px',
        }}
      />
      {/* Subtle vignette */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(circle at center, transparent 65%, rgba(0,0,0,0.85) 100%)',
        }}
      />
    </div>
  );
};
