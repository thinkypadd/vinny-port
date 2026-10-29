import React, { useState, useRef, useEffect } from 'react';
import { ItemId } from '../types';
import { portfolioData } from '../data/portfolio';

interface TopNavProps {
  onOpenApp: (id: ItemId) => void;
  onTidyIcons: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  onOpenApp,
  onTidyIcons,
  isDark,
  onToggleTheme,
  soundEnabled,
  onToggleSound
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-5 left-5 right-5 md:top-7 md:left-7 md:right-7 z-30 text-black/60 dark:text-white/60 font-mono text-xs md:text-sm flex justify-between pointer-events-none select-none [&>*]:pointer-events-auto">
      {/* Brand / Moniker */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onOpenApp('nuthoughts')}
          className="hover:text-[#cd3f25] block p-1 font-bold tracking-wider text-black dark:text-white transition-colors cursor-pointer"
          title="Open statement"
        >
          {portfolioData.moniker}
        </button>
        <span className="text-black/30 dark:text-white/30 hidden sm:inline">/</span>
        <span className="text-black/40 dark:text-white/40 hidden sm:inline text-xs">
          portfolio
        </span>
      </div>

      {/* Navigation & Controls */}
      <nav className="flex items-center space-x-1 sm:space-x-4">
        <button
          onClick={() => onOpenApp('works')}
          className="hover:text-[#cd3f25] block p-1 transition-colors cursor-pointer"
        >
          works
        </button>

        <button
          onClick={() => onOpenApp('nuthoughts')}
          className="hover:text-[#cd3f25] block p-1 transition-colors cursor-pointer"
        >
          thoughts
        </button>

        <button
          onClick={() => onOpenApp('archive')}
          className="hover:text-[#cd3f25] block p-1 transition-colors cursor-pointer"
        >
          archive
        </button>

        {/* Reach out / Contact dropdown (matches oklama's store -> dropdown) */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="hover:text-[#cd3f25] block p-1 transition-colors cursor-pointer"
          >
            connect {dropdownOpen ? '↓' : '→'}
          </button>

          {dropdownOpen && (
            <div className="absolute top-full right-0 mt-1 border-2 border-black dark:border-white bg-white dark:bg-black grid py-1 min-w-[170px] shadow-[4px_4px_0_rgba(0,0,0,0.25)] dark:shadow-[4px_4px_0_rgba(255,255,255,0.2)] z-50">
              <button
                onClick={() => {
                  onOpenApp('terminal');
                  setDropdownOpen(false);
                }}
                className="hover:text-[#cd3f25] text-left whitespace-nowrap py-1.5 px-3 block transition-colors text-xs"
              >
                &gt; terminal.sh
              </button>
              <button
                onClick={() => {
                  onOpenApp('resume');
                  setDropdownOpen(false);
                }}
                className="hover:text-[#cd3f25] text-left whitespace-nowrap py-1.5 px-3 block transition-colors text-xs"
              >
                resume.txt
              </button>
              <a
                href={`mailto:${portfolioData.contacts.email}`}
                className="hover:text-[#cd3f25] text-left whitespace-nowrap py-1.5 px-3 block transition-colors text-xs border-t border-neutral-200 dark:border-neutral-800"
              >
                email direct ↗
              </a>
              <a
                href={portfolioData.contacts.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#cd3f25] text-left whitespace-nowrap py-1.5 px-3 block transition-colors text-xs"
              >
                github ↗
              </a>
            </div>
          )}
        </div>

        {/* Minimalist Controls */}
        <div className="flex items-center pl-2 space-x-1 border-l border-neutral-300 dark:border-neutral-700">
          <button
            onClick={onTidyIcons}
            className="hover:text-[#cd3f25] p-1 text-[11px] transition-colors cursor-pointer"
            title="Snap icons to original positions"
          >
            [tidy]
          </button>
          <button
            onClick={onToggleSound}
            className="hover:text-[#cd3f25] p-1 text-[11px] transition-colors cursor-pointer"
            title={soundEnabled ? 'Mute audio' : 'Enable audio clicks'}
          >
            [{soundEnabled ? 'audio:on' : 'audio:off'}]
          </button>
          <button
            onClick={onToggleTheme}
            className="hover:text-[#cd3f25] p-1 text-[11px] transition-colors cursor-pointer font-bold"
            title="Toggle light / dark contrast"
          >
            [{isDark ? 'light' : 'invert'}]
          </button>
        </div>
      </nav>
    </header>
  );
};
