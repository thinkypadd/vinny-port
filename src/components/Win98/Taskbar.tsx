import React, { useState, useEffect } from 'react';
import { AppId, OsTheme, WindowState } from '../../types';
import { Volume2, Monitor } from 'lucide-react';

interface TaskbarProps {
  windows: WindowState[];
  activeWindowId: AppId | null;
  startMenuOpen: boolean;
  onToggleStartMenu: () => void;
  onWindowClick: (id: AppId) => void;
  onSetTheme: (theme: OsTheme) => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  activeWindowId,
  startMenuOpen,
  onToggleStartMenu,
  onWindowClick,
  onSetTheme,
}) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: '2-digit',
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
    <div className="fixed bottom-0 left-0 right-0 h-[30px] bg-[#c0c0c0] border-t-2 border-white select-none z-50 flex items-center justify-between px-1 font-win98 text-xs">
      {/* Left: Start button & window tabs */}
      <div className="flex items-center gap-1.5 flex-1 min-w-0 mr-2">
        {/* Start Button */}
        <button
          onClick={onToggleStartMenu}
          className={`h-[24px] px-2 flex items-center gap-1.5 font-bold ${
            startMenuOpen ? 'win98-btn-pressed' : 'win98-btn'
          }`}
        >
          {/* Windows 4-color flag */}
          <div className="grid grid-cols-2 gap-[1.5px] w-3.5 h-3.5 shrink-0">
            <div className="bg-[#ff0000]" />
            <div className="bg-[#00aa00]" />
            <div className="bg-[#0000ff]" />
            <div className="bg-[#ffaa00]" />
          </div>
          <span className="text-black text-xs font-bold tracking-wide">Start</span>
        </button>

        {/* Separator */}
        <div className="w-[2px] h-[20px] border-l border-[#808080] border-r border-white mx-0.5 shrink-0" />

        {/* Open Windows tabs */}
        <div className="flex items-center gap-1 overflow-x-auto win98-scrollbar min-w-0">
          {windows
            .filter((w) => w.isOpen)
            .map((win) => {
              const isActive = activeWindowId === win.id && !win.isMinimized;

              return (
                <button
                  key={win.id}
                  onClick={() => onWindowClick(win.id)}
                  className={`h-[24px] px-2 flex items-center gap-1.5 max-w-[150px] truncate shrink-0 ${
                    isActive ? 'win98-btn-pressed font-bold bg-[#dfdfdf]' : 'win98-btn'
                  }`}
                  title={win.title}
                >
                  <div className="w-3 h-3 flex items-center justify-center font-mono text-[8px] bg-[#000080] text-white shrink-0">
                    {win.id[0].toUpperCase()}
                  </div>
                  <span className="truncate text-xs">{win.title}</span>
                </button>
              );
            })}
        </div>
      </div>

      {/* Right: System Tray */}
      <div className="flex items-center gap-2 px-2 py-0.5 border-t border-l border-[#808080] border-b border-r border-white bg-[#c0c0c0] shrink-0">
        <button
          onClick={() => onSetTheme('macos')}
          className="flex items-center gap-1 text-[11px] text-black hover:underline"
          title="Switch Operating System to macOS"
        >
          <Monitor size={12} className="text-[#000080]" />
          <span className="hidden sm:inline">Mac Mode</span>
        </button>

        <Volume2 size={13} className="text-black" />

        <span className="text-black text-xs font-mono">{time}</span>
      </div>
    </div>
  );
};
