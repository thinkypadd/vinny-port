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
  const dragStartRef = useRef<{ startX: number; startY: number; initPosX: number; initPosY: number }>({
    startX: 0,
    startY: 0,
    initPosX: 0,
    initPosY: 0
  });
  const hasMovedRef = useRef(false);

  // Sync if external item position updates (e.g. Tidy layout)
  useEffect(() => {
    setPos(item.position);
  }, [item.position]);

  const handlePointerDown = (e: React.PointerEvent) => {
    // Only primary button
    if (e.button !== 0) return;
    e.stopPropagation();

    onSelect(item.id);
    hasMovedRef.current = false;
    setIsDragging(true);

    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initPosX: pos.x,
      initPosY: pos.y
    };

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const dx = moveEvent.clientX - dragStartRef.current.startX;
      const dy = moveEvent.clientY - dragStartRef.current.startY;

      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        hasMovedRef.current = true;
      }

      // Constrain within desktop boundaries
      const newX = Math.max(10, Math.min(window.innerWidth - 100, dragStartRef.current.initPosX + dx));
      const newY = Math.max(45, Math.min(window.innerHeight - 110, dragStartRef.current.initPosY + dy));

      setPos({ x: newX, y: newY });
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);

      if (hasMovedRef.current && onDragEnd) {
        onDragEnd(item.id, pos);
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasMovedRef.current) {
      // Single tap/click opens immediately on mobile or if already selected
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
      data-drag="true"
      data-index={item.id}
      className={`absolute flex flex-col items-center justify-center cursor-pointer select-none touch-none transition-shadow ${
        isDragging ? 'z-40 opacity-80 cursor-grabbing' : 'z-20'
      }`}
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: '94px',
        WebkitTouchCallout: 'none'
      }}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {/* Icon visual */}
      <div
        className={`flex items-center justify-center p-1 rounded-sm transition-transform ${
          isSelected
            ? 'ring-1 ring-black/40 dark:ring-white/50 bg-black/5 dark:bg-white/10 scale-105'
            : 'hover:scale-105'
        }`}
      >
        {renderIconGraphic()}
      </div>

      {/* Label Badge (matches oklama's bg-white text badge) */}
      <div className="mt-1 flex flex-col items-center">
        <span
          className={`text-center font-mono text-[11px] leading-tight px-1 py-0.5 border ${
            isSelected
              ? 'bg-[#111111] text-white border-black dark:bg-white dark:text-black dark:border-white shadow-[2px_2px_0_rgba(0,0,0,0.3)]'
              : 'bg-white text-black/90 border-neutral-300 dark:bg-black dark:text-neutral-200 dark:border-neutral-700 shadow-[1px_1px_0_rgba(0,0,0,0.15)]'
          }`}
        >
          {item.label}
        </span>
        {item.subtext && (
          <span className="text-[9px] font-mono text-neutral-500 dark:text-neutral-400 mt-0.5">
            {item.subtext}
          </span>
        )}
      </div>
    </div>
  );
};
