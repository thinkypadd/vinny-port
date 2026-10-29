import React, { useState } from 'react';
import { OsTheme } from '../../types';
import { Sliders, Monitor, Palette, Sparkles, Check, Volume2, VolumeX } from 'lucide-react';
import { isSoundEnabled, setSoundEnabled, playSound } from '../../utils/sound';

interface SettingsAppProps {
  theme: OsTheme;
  onSetTheme: (theme: OsTheme) => void;
  crtEffect: boolean;
  onToggleCrt: () => void;
}

export const SettingsApp: React.FC<SettingsAppProps> = ({
  theme,
  onSetTheme,
  crtEffect,
  onToggleCrt,
}) => {
  const is98 = theme === 'win98';
  const [audioOn, setAudioOn] = useState(isSoundEnabled());

  const handleToggleAudio = () => {
    const next = !audioOn;
    setAudioOn(next);
    setSoundEnabled(next);
    if (next) playSound(is98 ? 'click98' : 'clickMac');
  };

  const handleSelectTheme = (newTheme: OsTheme) => {
    onSetTheme(newTheme);
    playSound('switch');
  };

  return (
    <div className={`p-4 md:p-6 overflow-y-auto h-full ${is98 ? 'font-win98 win98-scrollbar bg-[#c0c0c0] text-black text-sm' : 'font-mac mac-scrollbar bg-slate-900/90 text-slate-100 text-sm'}`}>
      <div className="pb-3 mb-4 border-b border-black/10 dark:border-white/10 flex items-center gap-2">
        <Sliders size={18} className={is98 ? 'text-[#000080]' : 'text-blue-400'} />
        <div>
          <h1 className={`font-bold text-base ${is98 ? 'text-black' : 'text-white'}`}>
            System Preferences & Appearance
          </h1>
          <p className={`text-xs ${is98 ? 'text-[#555]' : 'text-slate-400'}`}>
            Select operating system UI theme and visual settings.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Theme Selector */}
        <div className={`p-4 ${is98 ? 'win98-field bg-white' : 'bg-white/[0.03] border border-white/10 rounded-xl'}`}>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-3 text-slate-400">
            Choose Operating Environment
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* macOS Card */}
            <button
              type="button"
              onClick={() => handleSelectTheme('macos')}
              className={`p-3 text-left transition-all border ${
                theme === 'macos'
                  ? is98
                    ? 'border-2 border-black bg-[#dfdfdf] font-bold'
                    : 'border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/20 rounded-xl'
                  : is98
                  ? 'border-[#808080] hover:bg-slate-100'
                  : 'border-white/10 hover:border-white/20 rounded-xl'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-sm">macOS Sonoma / Ventura</span>
                {theme === 'macos' && <Check size={16} className="text-blue-500" />}
              </div>
              <p className="text-xs text-slate-400">
                Modern frosted glass, dynamic dock, traffic light controls, smooth typography.
              </p>
            </button>

            {/* Windows 98 Card */}
            <button
              type="button"
              onClick={() => handleSelectTheme('win98')}
              className={`p-3 text-left transition-all border ${
                theme === 'win98'
                  ? is98
                    ? 'border-2 border-black bg-[#000080] text-white font-bold'
                    : 'border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/20 rounded-xl'
                  : is98
                  ? 'border-[#808080] hover:bg-slate-100'
                  : 'border-white/10 hover:border-white/20 rounded-xl'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-sm">Windows 98 Second Edition</span>
                {theme === 'win98' && <Check size={16} className={is98 ? 'text-white' : 'text-blue-500'} />}
              </div>
              <p className={`text-xs ${theme === 'win98' && is98 ? 'text-slate-200' : 'text-slate-400'}`}>
                Teal desktop, Start menu, 3D beveled borders, classic MS Sans Serif UI.
              </p>
            </button>
          </div>
        </div>

        {/* Tactile Audio Effects Option */}
        <div className={`p-4 flex items-center justify-between ${is98 ? 'win98-field bg-white' : 'bg-white/[0.03] border border-white/10 rounded-xl'}`}>
          <div className="space-y-0.5">
            <div className="text-sm font-semibold flex items-center gap-1.5">
              {audioOn ? <Volume2 size={15} className={is98 ? 'text-[#000080]' : 'text-blue-400'} /> : <VolumeX size={15} className="text-slate-400" />}
              <span>Tactile Synthesized Audio</span>
            </div>
            <p className="text-xs text-slate-400">
              Synthesized clicks, window swooshes, and OS transitions via Web Audio API.
            </p>
          </div>

          <button
            type="button"
            onClick={handleToggleAudio}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
              is98
                ? audioOn
                  ? 'win98-btn win98-btn-pressed'
                  : 'win98-btn'
                : audioOn
                ? 'bg-blue-600 text-white rounded-lg'
                : 'bg-white/10 text-slate-300 rounded-lg hover:bg-white/20'
            }`}
          >
            {audioOn ? 'Enabled' : 'Muted'}
          </button>
        </div>

        {/* Display Filter Option */}
        <div className={`p-4 flex items-center justify-between ${is98 ? 'win98-field bg-white' : 'bg-white/[0.03] border border-white/10 rounded-xl'}`}>
          <div className="space-y-0.5">
            <div className="text-sm font-semibold flex items-center gap-1.5">
              <Sparkles size={15} className={is98 ? 'text-[#000080]' : 'text-amber-400'} />
              <span>CRT Scanline & Phosphor Filter</span>
            </div>
            <p className="text-xs text-slate-400">
              Adds subtle scanline raster lines and retro CRT phosphor curvature effect.
            </p>
          </div>

          <button
            type="button"
            onClick={onToggleCrt}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
              is98
                ? crtEffect
                  ? 'win98-btn win98-btn-pressed'
                  : 'win98-btn'
                : crtEffect
                ? 'bg-blue-600 text-white rounded-lg'
                : 'bg-white/10 text-slate-300 rounded-lg hover:bg-white/20'
            }`}
          >
            {crtEffect ? 'Active' : 'Off'}
          </button>
        </div>

        {/* System Specs Footer */}
        <div className={`p-3 text-xs font-mono ${is98 ? 'text-[#505050]' : 'text-slate-500'}`}>
          Portfolio Environment 1.0.0 &bull; Running on Vercel Edge &bull; React 19 + Tailwind
        </div>
      </div>
    </div>
  );
};
