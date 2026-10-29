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
  const windowRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ startX: 0, startY: 0, initX: 0, initY: 0 });
  const currentPosRef = useRef(pos);
  const rafIdRef = useRef<number | null>(null);

  // Sync internal position when state resets or windowState updates externally
  useEffect(() => {
    setPos(windowState.position);
    currentPosRef.current = windowState.position;
    if (windowRef.current && !windowState.isMaximized) {
      windowRef.current.style.left = `${windowState.position.x}px`;
      windowRef.current.style.top = `${windowState.position.y}px`;
    }
  }, [windowState.position, windowState.isMaximized]);

  // Dragging by header bar with direct DOM updates (Zero React re-render lag)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    if ((e.target as HTMLElement).closest('button')) return;

    onFocus();
    if (windowState.isMaximized) return;

    isDraggingRef.current = true;
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: currentPosRef.current.x,
      initY: currentPosRef.current.y
    };

    // Capture pointer to track movements smoothly even outside window bounds
    const titleBar = e.currentTarget;
    try {
      titleBar.setPointerCapture(e.pointerId);
    } catch {
      // fallback if not supported
    }

    const handlePointerMove = (moveEvent: PointerEvent) => {
      if (!isDraggingRef.current) return;

      const dx = moveEvent.clientX - dragStartRef.current.startX;
      const dy = moveEvent.clientY - dragStartRef.current.startY;

      const newX = Math.max(0, Math.min(window.innerWidth - 120, dragStartRef.current.initX + dx));
      const newY = Math.max(0, Math.min(window.innerHeight - 80, dragStartRef.current.initY + dy));

      currentPosRef.current = { x: newX, y: newY };

      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(() => {
          if (windowRef.current) {
            windowRef.current.style.left = `${currentPosRef.current.x}px`;
            windowRef.current.style.top = `${currentPosRef.current.y}px`;
          }
          rafIdRef.current = null;
        });
      }
    };

    const handlePointerUp = (upEvent: PointerEvent) => {
      isDraggingRef.current = false;
      try {
        titleBar.releasePointerCapture(upEvent.pointerId);
      } catch {
        // fallback
      }

      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      setPos(currentPosRef.current);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp);
  };

  if (!windowState.isOpen || windowState.isMinimized) {
    return null;
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  return (
    <div
      ref={windowRef}
      onPointerDown={onFocus}
      className={`fixed flex flex-col font-mono select-text bg-white dark:bg-[#0c0c0c] border-2 border-black dark:border-white ${
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
              zIndex: windowState.zIndex,
              willChange: 'left, top'
            }
      }
    >
      {/* Title Bar (Oklama brutalist style) */}
      <div
        onPointerDown={handlePointerDown}
        className={`px-3 py-2 border-b-2 border-black dark:border-white flex items-center justify-between cursor-move select-none touch-none ${
          isActive
            ? 'bg-black text-white dark:bg-white dark:text-black'
            : 'bg-neutral-200 text-black dark:bg-neutral-800 dark:text-white'
        }`}
      >
        {/* Title */}
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

      {/* Window Body Content (high contrast in light mode) */}
      <div className="flex-1 overflow-auto p-4 md:p-6 bg-white dark:bg-[#0c0c0c] text-black dark:text-white">
        {children}
      </div>
    </div>
  );
};
