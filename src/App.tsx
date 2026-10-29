import React, { useState, useEffect } from 'react';
import { AppId, OsTheme, WindowState } from './types';
import { MenuBar } from './components/MacOS/MenuBar';
import { Dock } from './components/MacOS/Dock';
import { Taskbar } from './components/Win98/Taskbar';
import { StartMenu } from './components/Win98/StartMenu';
import { DesktopIcons } from './components/DesktopIcons';
import { Window } from './components/Window';
import { AboutApp } from './components/Apps/AboutApp';
import { ProjectsApp } from './components/Apps/ProjectsApp';
import { SkillsApp } from './components/Apps/SkillsApp';
import { TerminalApp } from './components/Apps/TerminalApp';
import { ContactApp } from './components/Apps/ContactApp';
import { SettingsApp } from './components/Apps/SettingsApp';
import { CrtOverlay } from './components/CrtOverlay';
import { playSound } from './utils/sound';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<OsTheme>('macos');
  const [crtEffect, setCrtEffect] = useState(false);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [activeWindowId, setActiveWindowId] = useState<AppId | null>('about');
  const [highestZ, setHighestZ] = useState(20);

  // Initial Window Layouts
  const [windows, setWindows] = useState<WindowState[]>([
    {
      id: 'about',
      title: 'About Me - Alex Rivera',
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: 40, y: 55 },
      size: { width: 560, height: 460 },
    },
    {
      id: 'projects',
      title: 'Projects & Repositories',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 9,
      position: { x: 120, y: 80 },
      size: { width: 640, height: 480 },
    },
    {
      id: 'skills',
      title: 'Capabilities & Stack',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 8,
      position: { x: 180, y: 110 },
      size: { width: 540, height: 420 },
    },
    {
      id: 'terminal',
      title: 'Terminal - Developer Shell',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 11,
      position: { x: 220, y: 140 },
      size: { width: 560, height: 380 },
    },
    {
      id: 'contact',
      title: 'Contact & Communication',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 7,
      position: { x: 260, y: 170 },
      size: { width: 560, height: 440 },
    },
    {
      id: 'settings',
      title: 'System Preferences & Theme',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 12,
      position: { x: 300, y: 190 },
      size: { width: 520, height: 360 },
    },
  ]);

  // Adjust default positions for mobile screens on load
  useEffect(() => {
    if (window.innerWidth < 640) {
      setWindows((prev) =>
        prev.map((w) => ({
          ...w,
          position: { x: 10, y: theme === 'win98' ? 10 : 40 },
          size: { width: window.innerWidth - 20, height: window.innerHeight - 100 },
        }))
      );
    }
  }, []);

  const bringToFront = (id: AppId) => {
    const nextZ = highestZ + 1;
    setHighestZ(nextZ);
    setActiveWindowId(id);
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: nextZ, isMinimized: false } : w))
    );
  };

  const handleSetTheme = (newTheme: OsTheme) => {
    setTheme(newTheme);
    playSound('switch');
  };

  const handleOpenApp = (id: AppId) => {
    playSound('open');
    const nextZ = highestZ + 1;
    setHighestZ(nextZ);
    setActiveWindowId(id);
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              isOpen: true,
              isMinimized: false,
              zIndex: nextZ,
            }
          : w
      )
    );
  };

  const handleCloseApp = (id: AppId) => {
    playSound(theme === 'win98' ? 'click98' : 'clickMac');
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w))
    );
    if (activeWindowId === id) {
      const remaining = windows.filter((w) => w.isOpen && w.id !== id && !w.isMinimized);
      if (remaining.length > 0) {
        const top = remaining.sort((a, b) => b.zIndex - a.zIndex)[0];
        setActiveWindowId(top.id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  const handleMinimizeApp = (id: AppId) => {
    playSound(theme === 'win98' ? 'click98' : 'clickMac');
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
    if (activeWindowId === id) {
      const remaining = windows.filter((w) => w.isOpen && w.id !== id && !w.isMinimized);
      if (remaining.length > 0) {
        const top = remaining.sort((a, b) => b.zIndex - a.zIndex)[0];
        setActiveWindowId(top.id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  const handleToggleMaximize = (id: AppId) => {
    playSound(theme === 'win98' ? 'click98' : 'clickMac');
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
    bringToFront(id);
  };

  const handleUpdatePosition = (id: AppId, x: number, y: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, position: { x, y } } : w))
    );
  };

  const handleTaskbarWindowClick = (id: AppId) => {
    const win = windows.find((w) => w.id === id);
    if (!win) return;

    if (activeWindowId === id && !win.isMinimized) {
      // Toggle minimize
      handleMinimizeApp(id);
    } else {
      bringToFront(id);
    }
  };

  const activeWindow = windows.find((w) => w.id === activeWindowId);
  const activeTitle = activeWindow ? activeWindow.title : 'Finder';

  return (
    <div
      className={`fixed inset-0 overflow-hidden w-screen h-screen select-none ${
        theme === 'win98' ? 'bg-[#008080]' : 'bg-[#0d1117]'
      }`}
      onClick={() => {
        if (startMenuOpen) setStartMenuOpen(false);
      }}
    >
      {/* Background Wallpaper */}
      {theme === 'macos' && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Subtle Sonoma Dark Abstract Wallpaper */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#121624] via-[#1a1c2e] to-[#0c0e18]" />
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
        </div>
      )}

      {/* Win98 Desktop Brand watermark */}
      {theme === 'win98' && (
        <div className="absolute bottom-12 right-6 pointer-events-none text-right font-win98 select-none opacity-20">
          <div className="text-3xl font-bold text-white tracking-widest">Windows 98</div>
          <div className="text-xs text-white">Second Edition</div>
        </div>
      )}

      {/* Top MenuBar (macOS) */}
      {theme === 'macos' && (
        <MenuBar
          activeAppTitle={activeTitle}
          onOpenApp={handleOpenApp}
          onSetTheme={handleSetTheme}
        />
      )}

      {/* Desktop Icons */}
      <DesktopIcons theme={theme} onOpenApp={handleOpenApp} />

      {/* Windows Layer */}
      {windows.map((win) => (
        <Window
          key={win.id}
          window={win}
          theme={theme}
          isActive={activeWindowId === win.id && !win.isMinimized}
          onFocus={() => bringToFront(win.id)}
          onClose={() => handleCloseApp(win.id)}
          onMinimize={() => handleMinimizeApp(win.id)}
          onToggleMaximize={() => handleToggleMaximize(win.id)}
          onUpdatePosition={(x, y) => handleUpdatePosition(win.id, x, y)}
        >
          {win.id === 'about' && <AboutApp theme={theme} />}
          {win.id === 'projects' && <ProjectsApp theme={theme} />}
          {win.id === 'skills' && <SkillsApp theme={theme} />}
          {win.id === 'terminal' && (
            <TerminalApp
              theme={theme}
              onSetTheme={handleSetTheme}
              onOpenApp={handleOpenApp}
            />
          )}
          {win.id === 'contact' && <ContactApp theme={theme} />}
          {win.id === 'settings' && (
            <SettingsApp
              theme={theme}
              onSetTheme={handleSetTheme}
              crtEffect={crtEffect}
              onToggleCrt={() => setCrtEffect(!crtEffect)}
            />
          )}
        </Window>
      ))}

      {/* Bottom Dock (macOS) */}
      {theme === 'macos' && (
        <Dock
          windows={windows}
          onOpenApp={handleOpenApp}
          onSetTheme={handleSetTheme}
        />
      )}

      {/* Bottom Taskbar & Start Menu (Windows 98) */}
      {theme === 'win98' && (
        <>
          <StartMenu
            isOpen={startMenuOpen}
            onClose={() => setStartMenuOpen(false)}
            onOpenApp={handleOpenApp}
            onSetTheme={handleSetTheme}
          />
          <Taskbar
            windows={windows}
            activeWindowId={activeWindowId}
            startMenuOpen={startMenuOpen}
            onToggleStartMenu={() => setStartMenuOpen(!startMenuOpen)}
            onWindowClick={handleTaskbarWindowClick}
            onSetTheme={handleSetTheme}
          />
        </>
      )}

      {/* Retro CRT Overlay filter if enabled */}
      <CrtOverlay active={crtEffect} />
    </div>
  );
};
