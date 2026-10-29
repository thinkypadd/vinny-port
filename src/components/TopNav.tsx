import React from 'react';
import { portfolioData } from '../data/portfolio';

interface TopNavProps {
  onTidyIcons: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  onTidyIcons,
  isDark,
  onToggleTheme,
  soundEnabled,
  onToggleSound
}) => {
  return (
    <header className="fixed top-5 left-5 right-5 md:top-7 md:left-7 md:right-7 z-30 text-black dark:text-white font-mono text-xs md:text-sm flex justify-between items-center pointer-events-none select-none [&>*]:pointer-events-auto">
      {/* Brand / Moniker */}
      <div className="font-bold tracking-wider text-black dark:text-white text-sm">
        {portfolioData.moniker}
      </div>

      {/* Desktop Controls (no duplicate links) */}
      <div className="flex items-center space-x-1.5 sm:space-x-2">
        <button
          onClick={onTidyIcons}
          className="hover:text-[#cd3f25] text-black dark:text-white p-1 text-[11px] font-semibold transition-colors cursor-pointer"
          title="Snap icons to original positions"
        >
          [tidy]
        </button>
        <button
          onClick={onToggleSound}
          className="hover:text-[#cd3f25] text-black dark:text-white p-1 text-[11px] font-semibold transition-colors cursor-pointer"
          title={soundEnabled ? 'Mute audio' : 'Enable audio clicks'}
        >
          [{soundEnabled ? 'audio:on' : 'audio:off'}]
        </button>
        <button
          onClick={onToggleTheme}
          className="hover:text-[#cd3f25] text-black dark:text-white p-1 text-[11px] font-bold transition-colors cursor-pointer"
          title="Toggle light / dark contrast"
        >
          [{isDark ? 'light' : 'invert'}]
        </button>
      </div>
    </header>
  );
};
