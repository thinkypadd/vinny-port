import React, { useState, useRef, useEffect } from 'react';
import { AppId, OsTheme, WindowState } from '../types';
import { Minus, Square, X, Copy } from 'lucide-react';
import { playSound } from '../utils/sound';

interface WindowProps {
  window: WindowState;
  theme: OsTheme;
  isActive: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onUpdatePosition: (x: number, y: number) => void;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({
  window: win,
  theme,
  isActive,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onUpdatePosition,
  children,
}) => {
  const is98 = theme === 'win98';
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; startX: number; startY: number }>({
    mouseX: 0,
    mouseY: 0,
    startX: 0,
    startY: 0,
  });

  // Handle Dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (win.isMaximized) return;
    if ((e.target as HTMLElement).closest('button')) return;

    playSound(is98 ? 'click98' : 'clickMac');
    onFocus();
    setIsDragging(true);
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: win.position.x,
      startY: win.position.y,
    };
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (win.isMaximized) return;
    if ((e.target as HTMLElement).closest('button')) return;
    const touch = e.touches[0];
    if (!touch) return;

    playSound(is98 ? 'click98' : 'clickMac');
    onFocus();
    setIsDragging(true);
    dragStartRef.current = {
      mouseX: touch.clientX,
      mouseY: touch.clientY,
      startX: win.position.x,
      startY: win.position.y,
    };
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStartRef.current.mouseX;
      const deltaY = e.clientY - dragStartRef.current.mouseY;
      const newX = Math.max(0, Math.min(window.innerWidth - 100, dragStartRef.current.startX + deltaX));
      const newY = Math.max(is98 ? 0 : 32, Math.min(window.innerHeight - 80, dragStartRef.current.startY + deltaY));
      onUpdatePosition(newX, newY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const deltaX = touch.clientX - dragStartRef.current.mouseX;
      const deltaY = touch.clientY - dragStartRef.current.mouseY;
      const newX = Math.max(0, Math.min(window.innerWidth - 100, dragStartRef.current.startX + deltaX));
      const newY = Math.max(is98 ? 0 : 32, Math.min(window.innerHeight - 80, dragStartRef.current.startY + deltaY));
      onUpdatePosition(newX, newY);
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, is98, onUpdatePosition]);

  if (!win.isOpen || win.isMinimized) {
    return null;
  }

  // Position and Size styling
  const style: React.CSSProperties = win.isMaximized
    ? {
        position: 'fixed',
        left: 0,
        right: 0,
        top: is98 ? 0 : 32,
        bottom: is98 ? 38 : 0,
        width: '100%',
        height: is98 ? 'calc(100vh - 38px)' : 'calc(100vh - 32px)',
        zIndex: win.zIndex,
      }
    : {
        position: 'fixed',
        left: `${win.position.x}px`,
        top: `${win.position.y}px`,
        width: `${win.size.width}px`,
        height: `${win.size.height}px`,
        maxWidth: 'calc(100vw - 16px)',
        maxHeight: is98 ? 'calc(100vh - 54px)' : 'calc(100vh - 120px)',
        zIndex: win.zIndex,
      };

  return (
    <div
      style={style}
      onMouseDown={onFocus}
      className={`flex flex-col transition-shadow select-none ${
        isDragging ? 'no-select cursor-move' : ''
      } ${
        is98
          ? 'win98-frame shadow-2xl p-[3px]'
          : 'rounded-xl overflow-hidden backdrop-blur-2xl border bg-slate-900/80 border-white/15 shadow-mac-window'
      }`}
    >
      {/* Titlebar */}
      <div
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onDoubleClick={onToggleMaximize}
        className={`flex items-center justify-between px-2 py-1 select-none shrink-0 ${
          is98
            ? isActive
              ? 'win98-titlebar-active font-win98 font-bold text-xs h-[22px]'
              : 'win98-titlebar-inactive font-win98 font-bold text-xs h-[22px]'
            : 'h-9 px-3 bg-white/[0.04] border-b border-white/10 font-mac'
        }`}
      >
        {/* MacOS traffic lights OR Win98 Icon & Title */}
        {is98 ? (
          <div className="flex items-center gap-1.5 truncate">
            <div className="w-3.5 h-3.5 flex items-center justify-center font-mono text-[9px] bg-[#dfdfdf] text-black border border-black shrink-0">
              {win.id[0].toUpperCase()}
            </div>
            <span className="truncate tracking-wide">{win.title}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 group">
            <button
              onClick={onClose}
              title="Close"
              className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-90 flex items-center justify-center text-black/60 opacity-90 transition-transform active:scale-90"
            >
              <X size={8} className="opacity-0 group-hover:opacity-100" />
            </button>
            <button
              onClick={onMinimize}
              title="Minimize"
              className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-90 flex items-center justify-center text-black/60 opacity-90 transition-transform active:scale-90"
            >
              <Minus size={8} className="opacity-0 group-hover:opacity-100" />
            </button>
            <button
              onClick={onToggleMaximize}
              title="Zoom"
              className="w-3 h-3 rounded-full bg-[#27c93f] hover:brightness-90 flex items-center justify-center text-black/60 opacity-90 transition-transform active:scale-90"
            >
              <Square size={7} className="opacity-0 group-hover:opacity-100" />
            </button>
          </div>
        )}

        {/* Mac Title in center */}
        {!is98 && (
          <span className="text-xs font-medium text-slate-300 truncate max-w-[200px] text-center select-none">
            {win.title}
          </span>
        )}

        {/* Win98 controls (_ □ X) */}
        {is98 ? (
          <div className="flex items-center gap-[2px]">
            <button
              type="button"
              onClick={onMinimize}
              className="win98-btn w-4 h-3.5 flex items-center justify-center text-[10px] leading-none font-bold"
              title="Minimize"
            >
              <span className="-mt-1 font-mono font-bold">_</span>
            </button>
            <button
              type="button"
              onClick={onToggleMaximize}
              className="win98-btn w-4 h-3.5 flex items-center justify-center text-[10px] leading-none"
              title="Maximize"
            >
              {win.isMaximized ? <Copy size={8} /> : <span className="w-2 h-2 border border-black inline-block" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="win98-btn w-4 h-3.5 flex items-center justify-center text-[11px] leading-none font-bold text-black"
              title="Close"
            >
              <X size={10} strokeWidth={3} />
            </button>
          </div>
        ) : (
          <div className="w-12" /> /* spacer to balance traffic lights */
        )}
      </div>

      {/* Window Body */}
      <div className="flex-1 overflow-hidden relative">
        {children}
      </div>
    </div>
  );
};
