import React, { useState } from 'react';
import { AppId, OsTheme, WindowState } from '../../types';
import { User, FolderGit2, Cpu, Terminal, Mail, Settings, Monitor } from 'lucide-react';

interface DockProps {
  windows: WindowState[];
  onOpenApp: (id: AppId) => void;
  onSetTheme: (theme: OsTheme) => void;
}

interface DockItem {
  id: AppId | 'win98-switch';
  name: string;
  icon: React.ReactNode;
  bgGradient: string;
}

export const Dock: React.FC<DockProps> = ({ windows, onOpenApp, onSetTheme }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const dockItems: DockItem[] = [
    {
      id: 'about',
      name: 'About Me',
      icon: <User className="w-6 h-6 text-white" />,
      bgGradient: 'from-blue-500 to-indigo-600',
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: <FolderGit2 className="w-6 h-6 text-white" />,
      bgGradient: 'from-cyan-500 to-blue-500',
    },
    {
      id: 'skills',
      name: 'Capabilities',
      icon: <Cpu className="w-6 h-6 text-white" />,
      bgGradient: 'from-purple-500 to-pink-600',
    },
    {
      id: 'terminal',
      name: 'Terminal',
      icon: <Terminal className="w-6 h-6 text-white" />,
      bgGradient: 'from-slate-700 to-slate-900',
    },
    {
      id: 'contact',
      name: 'Contact',
      icon: <Mail className="w-6 h-6 text-white" />,
      bgGradient: 'from-emerald-500 to-teal-600',
    },
    {
      id: 'settings',
      name: 'System Preferences',
      icon: <Settings className="w-6 h-6 text-white" />,
      bgGradient: 'from-zinc-500 to-slate-700',
    },
  ];

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 select-none">
      <div className="flex items-end gap-2 px-3 py-2 rounded-2xl bg-white/[0.08] backdrop-blur-2xl border border-white/20 shadow-mac-dock">
        {dockItems.map((item) => {
          const isOpen = windows.find((w) => w.id === item.id)?.isOpen;

          return (
            <div
              key={item.id}
              className="relative flex flex-col items-center group"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Tooltip */}
              {hoveredItem === item.id && (
                <div className="absolute -top-10 px-2.5 py-1 text-xs font-mac font-medium text-white bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-md shadow-lg pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95 duration-150">
                  {item.name}
                </div>
              )}

              {/* Icon Button */}
              <button
                onClick={() => onOpenApp(item.id as AppId)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-tr ${item.bgGradient} shadow-md transition-all duration-200 transform group-hover:-translate-y-2 group-hover:scale-110 active:scale-95`}
              >
                {item.icon}
              </button>

              {/* Open Indicator Dot */}
              <div
                className={`w-1 h-1 rounded-full mt-1 transition-all ${
                  isOpen ? 'bg-white/80' : 'bg-transparent'
                }`}
              />
            </div>
          );
        })}

        {/* Separator */}
        <div className="w-[1px] h-8 bg-white/20 self-center mx-1" />

        {/* OS Switcher Icon */}
        <div
          className="relative flex flex-col items-center group"
          onMouseEnter={() => setHoveredItem('switch')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {hoveredItem === 'switch' && (
            <div className="absolute -top-10 px-2.5 py-1 text-xs font-mac font-medium text-white bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-md shadow-lg pointer-events-none whitespace-nowrap">
              Switch to Windows 98
            </div>
          )}
          <button
            onClick={() => onSetTheme('win98')}
            className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-tr from-teal-700 to-teal-500 shadow-md transition-all duration-200 transform group-hover:-translate-y-2 group-hover:scale-110 active:scale-95 text-white"
          >
            <Monitor className="w-6 h-6" />
          </button>
          <div className="w-1 h-1 rounded-full mt-1 bg-transparent" />
        </div>
      </div>
    </div>
  );
};
