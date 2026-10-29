import React, { useState, useRef, useEffect } from 'react';
import { DesktopItem, ItemId } from '../types';
import {
  ManilaFolderIcon,
  BlackFolderIcon,
  GrayFolderIcon,
  PolaroidIcon,
  TextDocumentIcon,
  AudioCassetteIcon,
  TerminalIcon
} from './Icons';

interface DesktopIconProps {
  item: DesktopItem;
  isSelected: boolean;
  onSelect: (id: ItemId) => void;
  onOpen: (id: ItemId) => void;
  onDragEnd?: (id: ItemId, pos: { x: number; y: number }) => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  item,
  isSelected,
  onSelect,
  onOpen,
  onDragEnd
}) => {
  const [pos, setPos] = useState(item.position);
  const [isDragging, setIsDragging] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ startX: 0, startY: 0, initPosX: 0, initPosY: 0 });
  const currentPosRef = useRef(pos);
  const hasMovedRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  // Sync if external item position updates (e.g. Tidy layout)
  useEffect(() => {
    setPos(item.position);
    currentPosRef.current = item.position;
    if (iconRef.current) {
      iconRef.current.style.left = `${item.position.x}px`;
      iconRef.current.style.top = `${item.position.y}px`;
    }
  }, [item.position]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    e.stopPropagation();

    onSelect(item.id);
    hasMovedRef.current = false;
    setIsDragging(true);

    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initPosX: currentPosRef.current.x,
      initPosY: currentPosRef.current.y
    };

    const targetEl = e.currentTarget;
    try {
      targetEl.setPointerCapture(e.pointerId);
    } catch {
      // fallback
    }

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const dx = moveEvent.clientX - dragStartRef.current.startX;
      const dy = moveEvent.clientY - dragStartRef.current.startY;

      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        hasMovedRef.current = true;
      }

      const newX = Math.max(10, Math.min(window.innerWidth - 100, dragStartRef.current.initPosX + dx));
      const newY = Math.max(45, Math.min(window.innerHeight - 110, dragStartRef.current.initPosY + dy));

      currentPosRef.current = { x: newX, y: newY };

      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(() => {
          if (iconRef.current) {
            iconRef.current.style.left = `${currentPosRef.current.x}px`;
            iconRef.current.style.top = `${currentPosRef.current.y}px`;
          }
          rafIdRef.current = null;
        });
      }
    };

    const handlePointerUp = (upEvent: PointerEvent) => {
      setIsDragging(false);
      try {
        targetEl.releasePointerCapture(upEvent.pointerId);
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
      if (hasMovedRef.current && onDragEnd) {
        onDragEnd(item.id, currentPosRef.current);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasMovedRef.current) {
      if (window.innerWidth < 768 || isSelected) {
        onOpen(item.id);
      } else {
        onSelect(item.id);
      }
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasMovedRef.current) {
      onOpen(item.id);
    }
  };

  const renderIconGraphic = () => {
    switch (item.iconType) {
      case 'folder-manila':
        return <ManilaFolderIcon size={60} />;
      case 'folder-black':
        return <BlackFolderIcon size={60} />;
      case 'folder-gray':
        return <GrayFolderIcon size={60} />;
      case 'polaroid':
        return <PolaroidIcon size={66} />;
      case 'text':
        return <TextDocumentIcon size={56} />;
      case 'audio':
        return <AudioCassetteIcon size={58} />;
      case 'terminal':
      default:
        return <TerminalIcon size={56} />;
    }
  };

  return (
    <div
      ref={iconRef}
      data-drag="true"
      data-index={item.id}
      className={`absolute flex flex-col items-center justify-center cursor-pointer select-none touch-none ${
        isDragging ? 'z-40 opacity-80 cursor-grabbing' : 'z-20'
      }`}
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: '94px',
        willChange: 'left, top',
        WebkitTouchCallout: 'none'
      }}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {/* Icon visual */}
      <div
        className={`flex items-center justify-center p-1 rounded-sm ${
          isSelected
            ? 'ring-1 ring-black dark:ring-white bg-black/10 dark:bg-white/15 scale-105'
            : 'hover:scale-105'
        }`}
      >
        {renderIconGraphic()}
      </div>

      {/* Label Badge (matches oklama's bg-white text badge with high contrast) */}
      <div className="mt-1 flex flex-col items-center">
        <span
          className={`text-center font-mono text-[11px] font-semibold leading-tight px-1.5 py-0.5 border ${
            isSelected
              ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-[2px_2px_0_rgba(0,0,0,0.3)]'
              : 'bg-white text-black border-neutral-400 dark:bg-black dark:text-white dark:border-neutral-700 shadow-[1px_1px_0_rgba(0,0,0,0.15)]'
          }`}
        >
          {item.label}
        </span>
      </div>
    </div>
  );
};
