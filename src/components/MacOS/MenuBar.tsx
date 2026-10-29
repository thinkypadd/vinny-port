import React, { useState, useEffect } from 'react';
import { AppId, OsTheme } from '../../types';
import { Wifi, Battery, Moon, Monitor, Apple, Volume2 } from 'lucide-react';

interface MenuBarProps {
  activeAppTitle: string;
  onOpenApp: (id: AppId) => void;
  onSetTheme: (theme: OsTheme) => void;
}

export const MenuBar: React.FC<MenuBarProps> = ({
  activeAppTitle,
  onOpenApp,
  onSetTheme,
}) => {
  const [appleMenuOpen, setAppleMenuOpen] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-8 bg-black/40 backdrop-blur-xl border-b border-white/10 text-white text-xs font-mac flex items-center justify-between px-3 z-50 select-none">
      {/* Left Menu Items */}
      <div className="flex items-center gap-3">
        {/* Apple Menu */}
        <div className="relative">
          <button
            onClick={() => setAppleMenuOpen(!appleMenuOpen)}
            className="p-1 hover:bg-white/15 rounded transition-colors text-white"
            title="Apple Menu"
          >
            {/* Apple Silhouette SVG */}
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.07-7.74-7.92-12.1-14.54-6.3-9.61-11.28-20.91-14.94-33.91-3.66-12.99-5.49-24.87-5.49-35.63 0-14.34 3.49-26.06 10.46-35.17 6.97-9.11 15.6-13.78 25.88-14.02 4.9 0 10.36 1.45 16.38 4.36 6.02 2.91 9.92 4.41 11.71 4.5 1.57 0 5.66-1.57 12.28-4.71 6.62-3.14 12.44-4.54 17.47-4.2 13.55.77 24.34 5.92 32.36 15.45-11.83 7.15-17.63 17.15-17.4 30 0 9.87 3.73 18.23 11.2 25.07 7.47 6.84 16.29 10.74 26.47 11.71-2.13 6.63-4.94 13.91-8.43 21.84zM119.22 31.84c0-7.39 2.66-14.35 7.98-20.88 5.32-6.53 11.84-10.51 19.56-11.96.22 1.12.33 2.12.33 3.02 0 7.39-2.78 14.47-8.34 21.24-5.56 6.77-12.19 10.66-19.89 11.69-.11-1.01-.16-2.04-.16-3.11z"/>
            </svg>
          </button>

          {appleMenuOpen && (
            <div
              className="absolute left-0 mt-1 w-52 bg-slate-900/90 backdrop-blur-2xl border border-white/15 rounded-lg shadow-2xl py-1 text-slate-200 z-50"
              onMouseLeave={() => setAppleMenuOpen(false)}
            >
              <button
                onClick={() => {
                  onOpenApp('about');
                  setAppleMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white flex items-center justify-between"
              >
                <span>About This Developer</span>
              </button>
              <button
                onClick={() => {
                  onOpenApp('settings');
                  setAppleMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white"
              >
                <span>System Preferences...</span>
              </button>
              <div className="h-px bg-white/10 my-1" />
              <button
                onClick={() => {
                  onSetTheme('win98');
                  setAppleMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white flex items-center justify-between"
              >
                <span>Switch to Windows 98</span>
                <span className="text-[10px] text-slate-400">98 SE</span>
              </button>
              <div className="h-px bg-white/10 my-1" />
              <button
                onClick={() => window.location.reload()}
                className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white"
              >
                <span>Restart Session...</span>
              </button>
            </div>
          )}
        </div>

        {/* Active Application Title */}
        <span className="font-semibold text-white tracking-tight">{activeAppTitle}</span>

        {/* Submenu items */}
        <div className="hidden md:flex items-center gap-3 text-slate-300">
          <button onClick={() => onOpenApp('about')} className="hover:text-white transition-colors">About</button>
          <button onClick={() => onOpenApp('projects')} className="hover:text-white transition-colors">Projects</button>
          <button onClick={() => onOpenApp('terminal')} className="hover:text-white transition-colors">Terminal</button>
          <button onClick={() => onOpenApp('contact')} className="hover:text-white transition-colors">Contact</button>
        </div>
      </div>

      {/* Right Status Controls */}
      <div className="flex items-center gap-3">
        {/* Instant Theme Toggle Button */}
        <button
          onClick={() => onSetTheme('win98')}
          className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-all text-[11px]"
          title="Switch to Windows 98 Mode"
        >
          <Monitor size={12} />
          <span>Switch to Win98</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 text-slate-300">
          <Wifi size={13} />
          <Battery size={14} />
        </div>

        <span className="text-[11px] text-slate-200 font-medium pl-1">{time}</span>
      </div>
    </header>
  );
};
