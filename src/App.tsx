import React, { useState, useEffect, useCallback } from 'react';
import { ItemId, WindowState, DesktopItem } from './types';
import { DesktopIcon } from './components/DesktopIcon';
import { TopNav } from './components/TopNav';
import { BottomBar } from './components/BottomBar';
import { Window } from './components/Window';
import { NuThoughtsApp } from './components/Apps/NuThoughtsApp';
import { WorksApp } from './components/Apps/WorksApp';
import { ArchiveApp } from './components/Apps/ArchiveApp';
import { PolaroidApp } from './components/Apps/PolaroidApp';
import { ResumeApp } from './components/Apps/ResumeApp';
import { AudioMemoApp } from './components/Apps/AudioMemoApp';
import { TerminalApp } from './components/Apps/TerminalApp';
import { playSound, setSoundEnabled } from './utils/sound';

// Initial Desktop Positions (inspired by oklama.com's organic scatter)
const getDefaultItems = (width: number, height: number): DesktopItem[] => {
  const isMobile = width < 768;

  if (isMobile) {
    const col1 = 30;
    const col2 = Math.min(width - 120, 160);
    return [
      { id: 'nuthoughts', label: 'nu thoughts', iconType: 'folder-manila', position: { x: col1, y: 80 } },
      { id: 'works', label: 'selected works', iconType: 'folder-black', position: { x: col2, y: 80 } },
      { id: 'archive', label: 'archive', iconType: 'folder-gray', position: { x: col1, y: 200 } },
      { id: 'polaroid', label: 'polaroid.raw', iconType: 'polaroid', position: { x: col2, y: 200 } },
      { id: 'resume', label: 'resume.txt', iconType: 'text', position: { x: col1, y: 320 } },
      { id: 'audio', label: 'memo_01.wav', iconType: 'audio', position: { x: col2, y: 320 } },
      { id: 'terminal', label: 'terminal.sh', iconType: 'terminal', position: { x: col1, y: 440 } }
    ];
  }

  // Desktop viewport coordinates
  return [
    {
      id: 'nuthoughts',
      label: 'nu thoughts',
      iconType: 'folder-manila',
      position: { x: Math.floor(width * 0.64), y: Math.floor(height * 0.68) }
    },
    {
      id: 'works',
      label: 'selected works',
      iconType: 'folder-black',
      position: { x: Math.floor(width * 0.54), y: Math.floor(height * 0.16) }
    },
    {
      id: 'archive',
      label: 'archive',
      iconType: 'folder-gray',
      position: { x: Math.floor(width * 0.16), y: Math.floor(height * 0.44) }
    },
    {
      id: 'polaroid',
      label: 'polaroid.raw',
      iconType: 'polaroid',
      position: { x: Math.floor(width * 0.46), y: Math.floor(height * 0.46) }
    },
    {
      id: 'resume',
      label: 'resume.txt',
      iconType: 'text',
      position: { x: Math.floor(width * 0.22), y: Math.floor(height * 0.18) }
    },
    {
      id: 'audio',
      label: 'memo_01.wav',
      iconType: 'audio',
      position: { x: Math.floor(width * 0.26), y: Math.floor(height * 0.68) }
    },
    {
      id: 'terminal',
      label: 'terminal.sh',
      iconType: 'terminal',
      position: { x: Math.floor(width * 0.74), y: Math.floor(height * 0.32) }
    }
  ];
};

export const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [selectedItemId, setSelectedItemId] = useState<ItemId | null>(null);
  const [highestZ, setHighestZ] = useState(20);

  // Desktop Icons
  const [items, setItems] = useState<DesktopItem[]>(() => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const h = typeof window !== 'undefined' ? window.innerHeight : 768;
    return getDefaultItems(w, h);
  });

  // Windows State
  const [windows, setWindows] = useState<Record<ItemId, WindowState>>({
    nuthoughts: {
      id: 'nuthoughts',
      title: 'nu thoughts // statement.txt',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: 80, y: 70 },
      size: { width: 560, height: 580 }
    },
    works: {
      id: 'works',
      title: 'Directory: /selected-works',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 11,
      position: { x: 140, y: 90 },
      size: { width: 660, height: 520 }
    },
    archive: {
      id: 'archive',
      title: 'Directory: /archive',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 12,
      position: { x: 180, y: 110 },
      size: { width: 620, height: 460 }
    },
    polaroid: {
      id: 'polaroid',
      title: '35mm_raw // contact_sheet',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 13,
      position: { x: 200, y: 80 },
      size: { width: 520, height: 540 }
    },
    resume: {
      id: 'resume',
      title: 'resume.txt (UTF-8)',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 14,
      position: { x: 220, y: 100 },
      size: { width: 640, height: 520 }
    },
    audio: {
      id: 'audio',
      title: 'audio_tape // memo_01.wav',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 15,
      position: { x: 250, y: 120 },
      size: { width: 480, height: 380 }
    },
    terminal: {
      id: 'terminal',
      title: 'vinny@shell: ~ (zsh)',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 16,
      position: { x: 160, y: 130 },
      size: { width: 580, height: 400 }
    },
    contact: {
      id: 'contact',
      title: 'Connect & Dispatch',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 17,
      position: { x: 200, y: 140 },
      size: { width: 500, height: 360 }
    }
  });

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Bring window to front
  const focusWindow = useCallback((id: ItemId) => {
    setHighestZ((prev) => {
      const nextZ = prev + 1;
      setWindows((w) => ({
        ...w,
        [id]: { ...w[id], zIndex: nextZ, isMinimized: false }
      }));
      return nextZ;
    });
  }, []);

  // Open window
  const openApp = useCallback((id: ItemId) => {
    playSound('open');
    setHighestZ((prev) => {
      const nextZ = prev + 1;
      setWindows((w) => {
        // If on small screen, ensure window is centered or full
        const isMobile = window.innerWidth < 640;
        const posX = isMobile ? 10 : Math.min(Math.max(20, w[id].position.x), window.innerWidth - 300);
        const posY = isMobile ? 20 : Math.min(Math.max(50, w[id].position.y), window.innerHeight - 200);

        return {
          ...w,
          [id]: {
            ...w[id],
            isOpen: true,
            isMinimized: false,
            zIndex: nextZ,
            position: { x: posX, y: posY }
          }
        };
      });
      return nextZ;
    });
  }, []);

  // Close window
  const closeWindow = useCallback((id: ItemId) => {
    playSound('close');
    setWindows((w) => ({
      ...w,
      [id]: { ...w[id], isOpen: false }
    }));
  }, []);

  // Minimize window
  const minimizeWindow = useCallback((id: ItemId) => {
    playSound('switch');
    setWindows((w) => ({
      ...w,
      [id]: { ...w[id], isMinimized: true }
    }));
  }, []);

  // Toggle maximize
  const toggleMaximize = useCallback((id: ItemId) => {
    playSound('switch');
    setWindows((w) => ({
      ...w,
      [id]: { ...w[id], isMaximized: !w[id].isMaximized }
    }));
  }, []);

  // Keyboard navigation & shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Close topmost window
        const openWins = Object.values(windows).filter((win) => win.isOpen && !win.isMinimized);
        if (openWins.length > 0) {
          const topWin = openWins.reduce((max, curr) => (curr.zIndex > max.zIndex ? curr : max));
          closeWindow(topWin.id);
        } else {
          setSelectedItemId(null);
        }
      } else if (e.key === 'Enter' && selectedItemId) {
        openApp(selectedItemId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [windows, selectedItemId, closeWindow, openApp]);

  // Handle icon drag update
  const handleDragEnd = (id: ItemId, newPos: { x: number; y: number }) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, position: newPos } : item))
    );
  };

  // Tidy desktop icon positions
  const handleTidy = () => {
    playSound('switch');
    setItems(getDefaultItems(window.innerWidth, window.innerHeight));
  };

  // Toggle theme
  const handleToggleTheme = () => {
    playSound('switch');
    setIsDark((prev) => !prev);
  };

  // Toggle audio
  const handleToggleSound = () => {
    const nextVal = !soundOn;
    setSoundOn(nextVal);
    setSoundEnabled(nextVal);
    if (nextVal) playSound('click');
  };

  // Active top window for styling
  const activeWindowId = Object.values(windows)
    .filter((w) => w.isOpen && !w.isMinimized)
    .reduce<WindowState | null>((top, curr) => (!top || curr.zIndex > top.zIndex ? curr : top), null)?.id;

  return (
    <div
      className={`min-h-screen w-full font-mono relative overflow-hidden transition-colors duration-150 ${
        isDark ? 'bg-black text-white' : 'bg-[#fafafa] text-black'
      }`}
      onClick={() => setSelectedItemId(null)}
    >
      {/* Subtle retro dot grid canvas */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10"
        style={{
          backgroundImage: isDark
            ? 'radial-gradient(#ffffff 1px, transparent 1px)'
            : 'radial-gradient(#000000 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Fixed Minimalist Top Header */}
      <TopNav
        onTidyIcons={handleTidy}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        soundEnabled={soundOn}
        onToggleSound={handleToggleSound}
      />

      {/* Desktop Canvas for Draggable Icons */}
      <main className="absolute inset-0 overflow-hidden select-none z-10 pointer-events-none">
        <div className="absolute inset-0 pointer-events-auto">
          {items.map((item) => (
            <DesktopIcon
              key={item.id}
              item={item}
              isSelected={selectedItemId === item.id}
              onSelect={(id) => {
                playSound('click');
                setSelectedItemId(id);
              }}
              onOpen={(id) => openApp(id)}
              onDragEnd={handleDragEnd}
            />
          ))}
        </div>
      </main>

      {/* Floating Brutalist Windows */}
      {/* 1. Nu Thoughts App */}
      <Window
        windowState={windows.nuthoughts}
        isActive={activeWindowId === 'nuthoughts'}
        onFocus={() => focusWindow('nuthoughts')}
        onClose={() => closeWindow('nuthoughts')}
        onMinimize={() => minimizeWindow('nuthoughts')}
        onToggleMaximize={() => toggleMaximize('nuthoughts')}
      >
        <NuThoughtsApp onBack={() => closeWindow('nuthoughts')} />
      </Window>

      {/* 2. Selected Works App */}
      <Window
        windowState={windows.works}
        isActive={activeWindowId === 'works'}
        onFocus={() => focusWindow('works')}
        onClose={() => closeWindow('works')}
        onMinimize={() => minimizeWindow('works')}
        onToggleMaximize={() => toggleMaximize('works')}
      >
        <WorksApp />
      </Window>

      {/* 3. Archive App */}
      <Window
        windowState={windows.archive}
        isActive={activeWindowId === 'archive'}
        onFocus={() => focusWindow('archive')}
        onClose={() => closeWindow('archive')}
        onMinimize={() => minimizeWindow('archive')}
        onToggleMaximize={() => toggleMaximize('archive')}
      >
        <ArchiveApp />
      </Window>

      {/* 4. Polaroid Photo Sheet */}
      <Window
        windowState={windows.polaroid}
        isActive={activeWindowId === 'polaroid'}
        onFocus={() => focusWindow('polaroid')}
        onClose={() => closeWindow('polaroid')}
        onMinimize={() => minimizeWindow('polaroid')}
        onToggleMaximize={() => toggleMaximize('polaroid')}
      >
        <PolaroidApp />
      </Window>

      {/* 5. Resume / CV */}
      <Window
        windowState={windows.resume}
        isActive={activeWindowId === 'resume'}
        onFocus={() => focusWindow('resume')}
        onClose={() => closeWindow('resume')}
        onMinimize={() => minimizeWindow('resume')}
        onToggleMaximize={() => toggleMaximize('resume')}
      >
        <ResumeApp />
      </Window>

      {/* 6. Audio Memo App */}
      <Window
        windowState={windows.audio}
        isActive={activeWindowId === 'audio'}
        onFocus={() => focusWindow('audio')}
        onClose={() => closeWindow('audio')}
        onMinimize={() => minimizeWindow('audio')}
        onToggleMaximize={() => toggleMaximize('audio')}
      >
        <AudioMemoApp />
      </Window>

      {/* 7. Interactive Terminal */}
      <Window
        windowState={windows.terminal}
        isActive={activeWindowId === 'terminal'}
        onFocus={() => focusWindow('terminal')}
        onClose={() => closeWindow('terminal')}
        onMinimize={() => minimizeWindow('terminal')}
        onToggleMaximize={() => toggleMaximize('terminal')}
      >
        <TerminalApp onClose={() => closeWindow('terminal')} onOpenApp={(app) => openApp(app as ItemId)} />
      </Window>

      {/* Fixed Bottom Status & Socials */}
      <BottomBar />
    </div>
  );
};
