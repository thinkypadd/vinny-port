import React, { useRef, useState, useEffect } from 'react';
import { WindowState } from '../types';

interface WindowProps {
  windowState: WindowState;
  isActive: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({
  windowState,
  isActive,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  children
}) => {
  const [pos, setPos] = useState(windowState.position);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ startX: 0, startY: 0, initX: 0, initY: 0 });

  // Sync internal position when state resets
  useEffect(() => {
    setPos(windowState.position);
  }, [windowState.position]);

  // Dragging by header bar
  const handlePointerDown = (e: React.PointerEvent) => {
    // Primary mouse or touch only, ignore buttons
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    if ((e.target as HTMLElement).closest('button')) return;

    onFocus();
    isDraggingRef.current = true;
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: pos.x,
      initY: pos.y
    };

    const handlePointerMove = (moveEvent: PointerEvent) => {
      if (!isDraggingRef.current || windowState.isMaximized) return;

      const dx = moveEvent.clientX - dragStartRef.current.startX;
      const dy = moveEvent.clientY - dragStartRef.current.startY;

      // Keep inside screen
      const newX = Math.max(0, Math.min(window.innerWidth - 120, dragStartRef.current.initX + dx));
      const newY = Math.max(0, Math.min(window.innerHeight - 80, dragStartRef.current.initY + dy));

      setPos({ x: newX, y: newY });
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  if (!windowState.isOpen || windowState.isMinimized) {
    return null;
  }

  const isMobile = window.innerWidth < 640;

  return (
    <div
      onPointerDown={onFocus}
      className={`fixed flex flex-col font-mono select-text bg-white dark:bg-[#0c0c0c] border-2 border-black dark:border-white transition-all ${
        windowState.isMaximized || isMobile
          ? 'inset-2 md:inset-8 z-50 shadow-[8px_8px_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_rgba(255,255,255,0.7)]'
          : 'shadow-[6px_6px_0_rgba(0,0,0,1)] dark:shadow-[6px_6px_0_rgba(255,255,255,0.6)]'
      }`}
      style={
        windowState.isMaximized || isMobile
          ? { zIndex: windowState.zIndex }
          : {
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              width: `${Math.min(window.innerWidth - 30, windowState.size.width)}px`,
              height: `${Math.min(window.innerHeight - 60, windowState.size.height)}px`,
              zIndex: windowState.zIndex
            }
      }
    >
      {/* Title Bar (Oklama brutalist style) */}
      <div
        onPointerDown={handlePointerDown}
        className={`px-3 py-2 border-b-2 border-black dark:border-white flex items-center justify-between cursor-move select-none ${
          isActive
            ? 'bg-black text-white dark:bg-white dark:text-black'
            : 'bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300'
        }`}
      >
        {/* Title & Path */}
        <div className="flex items-center space-x-2 truncate pr-2">
          <span className="text-xs font-bold truncate tracking-tight">
            {windowState.title}
          </span>
        </div>

        {/* Window controls */}
        <div className="flex items-center space-x-2 font-mono text-xs">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="hover:text-[#cd3f25] px-1 font-bold cursor-pointer transition-colors"
            title="Minimize"
          >
            _
          </button>
          {!isMobile && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleMaximize();
              }}
              className="hover:text-[#cd3f25] px-1 font-bold cursor-pointer transition-colors"
              title={windowState.isMaximized ? 'Restore' : 'Maximize'}
            >
              {windowState.isMaximized ? '❐' : '□'}
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="hover:text-[#cd3f25] px-1.5 font-bold cursor-pointer transition-colors"
            title="Close (Esc)"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Window Body Content */}
      <div className="flex-1 overflow-auto p-4 md:p-6 bg-white dark:bg-[#0c0c0c] text-black dark:text-neutral-200">
        {children}
      </div>
    </div>
  );
};
