import React from 'react';
import { AppId, OsTheme } from '../../types';
import { User, FolderGit2, Cpu, Terminal, Mail, Settings, Apple, HelpCircle, Power } from 'lucide-react';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (id: AppId) => void;
  onSetTheme: (theme: OsTheme) => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({
  isOpen,
  onClose,
  onOpenApp,
  onSetTheme,
}) => {
  if (!isOpen) return null;

  const handleSelect = (id: AppId) => {
    onOpenApp(id);
    onClose();
  };

  return (
    <div
      className="fixed bottom-[30px] left-0 z-50 flex win98-frame bg-[#c0c0c0] font-win98 select-none shadow-2xl"
      style={{ width: '240px' }}
    >
      {/* Blue Left Banner */}
      <div className="w-8 bg-gradient-to-t from-[#000080] to-[#1084d0] flex items-end justify-center pb-2 text-white font-bold tracking-widest">
        <span
          className="text-sm font-bold tracking-widest select-none"
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
          }}
        >
          Windows<span className="font-normal text-xs text-[#dfdfdf]"> 98</span>
        </span>
      </div>

      {/* Menu items */}
      <div className="flex-1 py-1 text-xs">
        <button
          onClick={() => handleSelect('about')}
          className="w-full px-3 py-1.5 flex items-center gap-2.5 hover:bg-[#000080] hover:text-white text-left group"
        >
          <User size={16} className="text-[#000080] group-hover:text-white" />
          <span>About Alex (Resume)</span>
        </button>

        <button
          onClick={() => handleSelect('projects')}
          className="w-full px-3 py-1.5 flex items-center gap-2.5 hover:bg-[#000080] hover:text-white text-left group"
        >
          <FolderGit2 size={16} className="text-[#000080] group-hover:text-white" />
          <span>Projects & Code</span>
        </button>

        <button
          onClick={() => handleSelect('skills')}
          className="w-full px-3 py-1.5 flex items-center gap-2.5 hover:bg-[#000080] hover:text-white text-left group"
        >
          <Cpu size={16} className="text-[#000080] group-hover:text-white" />
          <span>System Capabilities</span>
        </button>

        <button
          onClick={() => handleSelect('terminal')}
          className="w-full px-3 py-1.5 flex items-center gap-2.5 hover:bg-[#000080] hover:text-white text-left group"
        >
          <Terminal size={16} className="text-[#000080] group-hover:text-white" />
          <span>MS-DOS Prompt</span>
        </button>

        <button
          onClick={() => handleSelect('contact')}
          className="w-full px-3 py-1.5 flex items-center gap-2.5 hover:bg-[#000080] hover:text-white text-left group"
        >
          <Mail size={16} className="text-[#000080] group-hover:text-white" />
          <span>Outlook Express (Contact)</span>
        </button>

        <div className="h-[2px] border-t border-[#808080] border-b border-white my-1 mx-1" />

        <button
          onClick={() => handleSelect('settings')}
          className="w-full px-3 py-1.5 flex items-center gap-2.5 hover:bg-[#000080] hover:text-white text-left group"
        >
          <Settings size={16} className="text-[#000080] group-hover:text-white" />
          <span>Control Panel...</span>
        </button>

        <button
          onClick={() => {
            onSetTheme('macos');
            onClose();
          }}
          className="w-full px-3 py-1.5 flex items-center gap-2.5 hover:bg-[#000080] hover:text-white text-left font-bold text-[#000080] group"
        >
          <Apple size={16} className="text-black group-hover:text-white" />
          <span className="group-hover:text-white">Switch to macOS...</span>
        </button>

        <div className="h-[2px] border-t border-[#808080] border-b border-white my-1 mx-1" />

        <button
          onClick={() => {
            alert('Shutting down... Feel free to restart or switch to macOS!');
            onClose();
          }}
          className="w-full px-3 py-1.5 flex items-center gap-2.5 hover:bg-[#000080] hover:text-white text-left group"
        >
          <Power size={16} className="text-red-700 group-hover:text-white" />
          <span>Shut Down...</span>
        </button>
      </div>
    </div>
  );
};
