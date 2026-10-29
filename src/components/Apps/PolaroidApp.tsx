import React, { useState } from 'react';

interface PhotoItem {
  id: string;
  title: string;
  location: string;
  date: string;
  note: string;
  colorScheme: string;
}

const photos: PhotoItem[] = [
  {
    id: 'p1',
    title: 'STUDIO // EARLY LIGHT',
    location: 'San Francisco, CA',
    date: '2026.10',
    note: 'Desk at 05:40 AM. Cathode ray terminal, coffee, notebook.',
    colorScheme: 'from-neutral-900 to-stone-900'
  },
  {
    id: 'p2',
    title: 'ANALOG HARDWARE RACK',
    location: 'Oakland, CA',
    date: '2026.04',
    note: 'Custom 19" patch bay and 16-bit discrete synth oscillator.',
    colorScheme: 'from-zinc-950 to-neutral-900'
  },
  {
    id: 'p3',
    title: 'THE DISCONNECTED DESK',
    location: 'Mendocino Coast',
    date: '2025.08',
    note: 'Two weeks without wireless signal. 4,000 lines of clean Go.',
    colorScheme: 'from-stone-900 to-neutral-950'
  }
];

export const PolaroidApp: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activePhoto = photos[selectedIdx];

  return (
    <div className="font-mono text-xs md:text-sm space-y-6 text-black dark:text-white">
      <div className="flex items-center justify-between pb-3 border-b-2 border-black dark:border-white">
        <span className="font-bold text-black dark:text-white text-sm">GALLERY: 35MM_RAW</span>
        <span className="text-neutral-600 dark:text-neutral-400 font-semibold">
          [{selectedIdx + 1} / {photos.length}]
        </span>
      </div>

      {/* Main Polaroid Frame */}
      <div className="max-w-[420px] mx-auto p-4 bg-white dark:bg-neutral-900 border-2 border-black dark:border-white shadow-[6px_6px_0_rgba(0,0,0,0.2)] dark:shadow-[6px_6px_0_rgba(255,255,255,0.15)] space-y-4">
        {/* Film frame */}
        <div
          className={`w-full h-64 bg-gradient-to-br ${activePhoto.colorScheme} relative flex flex-col items-center justify-center p-6 border border-neutral-700 overflow-hidden`}
        >
          {/* Film Grain & Authentic Reticle */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:10px_10px]" />
          <div className="absolute top-2 left-2 text-[9px] text-neutral-400 font-mono font-medium">
            KODAK_TX_400 // {activePhoto.date}
          </div>
          <div className="absolute bottom-2 right-2 text-[9px] text-neutral-400 font-mono font-medium">
            EXP_{activePhoto.id}
          </div>

          {/* Focal graphic */}
          <div className="border border-neutral-600/70 p-4 text-center z-10 backdrop-blur-xs">
            <span className="text-xs font-bold text-neutral-200 tracking-widest block">
              {activePhoto.title}
            </span>
            <span className="text-[10px] text-neutral-300 mt-1 block font-medium">
              {activePhoto.location}
            </span>
          </div>
        </div>

        {/* Polaroid notes */}
        <div className="pt-2 border-t border-neutral-300 dark:border-neutral-800 space-y-1.5">
          <p className="text-xs text-black dark:text-neutral-100 leading-relaxed font-mono font-medium">
            "{activePhoto.note}"
          </p>
          <div className="flex justify-between items-center text-[10px] text-neutral-600 dark:text-neutral-400 pt-1 font-semibold">
            <span>LOC: {activePhoto.location}</span>
            <span>DATE: {activePhoto.date}</span>
          </div>
        </div>
      </div>

      {/* Film Strip Selectors */}
      <div className="flex justify-center items-center space-x-2 pt-2">
        {photos.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setSelectedIdx(index)}
            className={`px-3 py-1 border text-xs font-mono font-medium transition-colors cursor-pointer ${
              selectedIdx === index
                ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-[2px_2px_0_rgba(0,0,0,0.3)]'
                : 'bg-neutral-100 text-black border-neutral-400 dark:bg-transparent dark:text-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white'
            }`}
          >
            FRAME_{index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
