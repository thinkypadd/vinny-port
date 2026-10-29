import React from 'react';
import { portfolioData } from '../../data/portfolio';

interface NuThoughtsAppProps {
  onBack?: () => void;
}

export const NuThoughtsApp: React.FC<NuThoughtsAppProps> = ({ onBack }) => {
  const { thought } = portfolioData;

  return (
    <div className="max-w-[480px] mx-auto py-2 font-mono text-sm leading-relaxed select-text">
      {/* Top Header timestamp */}
      <div className="flex items-center justify-between pb-6 border-b border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400">
        <div className="flex items-center space-x-2">
          {onBack && (
            <button
              onClick={onBack}
              className="text-black dark:text-white hover:text-[#cd3f25] font-bold pr-2 cursor-pointer transition-colors"
            >
              ←
            </button>
          )}
          <span>{thought.date}</span>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-neutral-400">
          doc // statement
        </span>
      </div>

      {/* Paragraphs */}
      <div className="space-y-4 pt-6 text-neutral-800 dark:text-neutral-200">
        {thought.paragraphs.map((p, idx) => (
          <p key={idx} className="leading-6">
            {p}
          </p>
        ))}

        {/* Signature */}
        <p className="pt-3 font-bold text-black dark:text-white tracking-wide">
          {thought.signature}
        </p>
      </div>

      {/* Inset Photo (matches oklama's photo in nuthoughts) */}
      <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col items-center">
        <div className="p-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 shadow-[3px_3px_0_rgba(0,0,0,0.15)] dark:shadow-[3px_3px_0_rgba(255,255,255,0.1)] max-w-[260px] w-full">
          <div className="w-full h-40 bg-neutral-950 overflow-hidden relative flex flex-col items-center justify-center border border-neutral-800">
            {/* Subtle retro grain / workspace art */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
            <div className="text-center z-10 px-4">
              <span className="text-[11px] text-neutral-400 tracking-widest block font-bold mb-1">
                STUDIO // SILENCE
              </span>
              <span className="text-[9px] text-neutral-600 block">
                37.7749° N, 122.4194° W
              </span>
            </div>
            <div className="absolute bottom-2 right-2 text-[8px] text-neutral-600">
              #2026-F
            </div>
          </div>
          {thought.imageCaption && (
            <p className="text-[10px] text-center text-neutral-500 dark:text-neutral-400 mt-2 font-mono">
              {thought.imageCaption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
