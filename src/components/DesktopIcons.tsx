import React, { useState } from 'react';
import { AppId, OsTheme } from '../types';
import { User, FolderGit2, Cpu, Terminal, Mail, Settings, HardDrive, Trash2 } from 'lucide-react';

interface DesktopIconsProps {
  theme: OsTheme;
  onOpenApp: (id: AppId) => void;
}

interface IconDefinition {
  id: AppId;
  label98: string;
  labelMac: string;
  icon98: React.ReactNode;
  iconMac: React.ReactNode;
}

export const DesktopIcons: React.FC<DesktopIconsProps> = ({ theme, onOpenApp }) => {
  const is98 = theme === 'win98';
  const [selectedId, setSelectedId] = useState<AppId | null>(null);

  const icons: IconDefinition[] = [
    {
      id: 'about',
      label98: 'Resume.doc',
      labelMac: 'About Me',
      icon98: (
        <div className="w-8 h-8 flex items-center justify-center bg-[#ffffff] border border-black shadow-[2px_2px_0_#000]">
          <User className="w-5 h-5 text-[#000080]" />
        </div>
      ),
      iconMac: (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg border border-white/20">
          <User className="w-6 h-6 text-white" />
        </div>
      ),
    },
    {
      id: 'projects',
      label98: 'My Projects',
      labelMac: 'Projects',
      icon98: (
        <div className="w-8 h-8 flex items-center justify-center bg-[#ffffc0] border border-[#808000] shadow-[2px_2px_0_#000]">
          <FolderGit2 className="w-5 h-5 text-[#808000]" />
        </div>
      ),
      iconMac: (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg border border-white/20">
          <FolderGit2 className="w-6 h-6 text-white" />
        </div>
      ),
    },
    {
      id: 'skills',
      label98: 'System Info',
      labelMac: 'Capabilities',
      icon98: (
        <div className="w-8 h-8 flex items-center justify-center bg-[#c0c0c0] border border-black shadow-[2px_2px_0_#000]">
          <Cpu className="w-5 h-5 text-[#000080]" />
        </div>
      ),
      iconMac: (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-600 flex items-center justify-center shadow-lg border border-white/20">
          <Cpu className="w-6 h-6 text-white" />
        </div>
      ),
    },
    {
      id: 'terminal',
      label98: 'MS-DOS Prompt',
      labelMac: 'Terminal',
      icon98: (
        <div className="w-8 h-8 flex items-center justify-center bg-black border border-white text-white font-mono text-[10px] font-bold shadow-[2px_2px_0_#000]">
          C:\&gt;
        </div>
      ),
      iconMac: (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-slate-700 to-slate-900 flex items-center justify-center shadow-lg border border-white/20">
          <Terminal className="w-6 h-6 text-white" />
        </div>
      ),
    },
    {
      id: 'contact',
      label98: 'Network Inbox',
      labelMac: 'Contact.vcf',
      icon98: (
        <div className="w-8 h-8 flex items-center justify-center bg-[#dfdfdf] border border-black shadow-[2px_2px_0_#000]">
          <Mail className="w-5 h-5 text-[#800000]" />
        </div>
      ),
      iconMac: (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg border border-white/20">
          <Mail className="w-6 h-6 text-white" />
        </div>
      ),
    },
    {
      id: 'settings',
      label98: 'Control Panel',
      labelMac: 'Preferences',
      icon98: (
        <div className="w-8 h-8 flex items-center justify-center bg-[#c0c0c0] border border-black shadow-[2px_2px_0_#000]">
          <Settings className="w-5 h-5 text-black" />
        </div>
      ),
      iconMac: (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-zinc-500 to-slate-700 flex items-center justify-center shadow-lg border border-white/20">
          <Settings className="w-6 h-6 text-white" />
        </div>
      ),
    },
  ];

  const handleClick = (id: AppId) => {
    setSelectedId(id);
  };

  const handleDoubleClick = (id: AppId) => {
    onOpenApp(id);
  };

  return (
    <div
      className={`absolute z-10 flex flex-col flex-wrap gap-4 p-4 pointer-events-auto select-none ${
        is98 ? 'top-2 left-2 font-win98' : 'top-12 left-4 font-mac'
      }`}
      style={{ maxHeight: 'calc(100vh - 120px)' }}
      onClick={() => setSelectedId(null)}
    >
      {icons.map((item) => {
        const isSelected = selectedId === item.id;

        return (
          <div
            key={item.id}
            onClick={(e) => {
              e.stopPropagation();
              handleClick(item.id);
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              handleDoubleClick(item.id);
            }}
            onTouchEnd={(e) => {
              // On mobile devices, single tap opens
              if (window.innerWidth < 768) {
                onOpenApp(item.id);
              }
            }}
            className={`flex flex-col items-center justify-center cursor-pointer transition-all ${
              is98
                ? `w-20 p-1.5 text-center text-xs text-white ${
                    isSelected ? 'bg-[#000080]/80 outline outline-1 outline-dotted outline-white' : 'hover:bg-white/10'
                  }`
                : `w-24 p-2 text-center text-xs text-white rounded-xl ${
                    isSelected ? 'bg-white/20 backdrop-blur-md ring-1 ring-white/30' : 'hover:bg-white/10'
                  }`
            }`}
          >
            <div className="mb-1.5">{is98 ? item.icon98 : item.iconMac}</div>
            <span
              className={`leading-tight drop-shadow-md px-1 truncate max-w-full ${
                is98 ? 'font-win98 text-[11px]' : 'font-mac text-xs font-medium'
              }`}
            >
              {is98 ? item.label98 : item.labelMac}
            </span>
          </div>
        );
      })}
    </div>
  );
};
