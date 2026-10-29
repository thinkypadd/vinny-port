import React, { useState, useEffect, useRef } from 'react';

export const AudioMemoApp: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode } | null>(null);
  const timerRef = useRef<number | null>(null);

  // Setup / Clean WebAudio
  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  const startAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = audioCtxRef.current || new AudioCtx();
      audioCtxRef.current = ctx;

      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Generate a warm, gentle ambient lo-fi chord (C minor 9: C, Eb, G, Bb, D)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(130.81, ctx.currentTime); // C3

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(196.0, ctx.currentTime); // G3

      // Low pass filter for warm tape lo-fi sound
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 1.2);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      synthNodesRef.current = { osc1, osc2, gain };
      setIsPlaying(true);

      // Playback counter
      timerRef.current = window.setInterval(() => {
        setPlaybackTime((prev) => (prev >= 60 ? 0 : prev + 1));
      }, 1000);
    } catch {
      // Audio fallback
    }
  };

  const stopAudio = () => {
    if (synthNodesRef.current && audioCtxRef.current) {
      const { osc1, osc2, gain } = synthNodesRef.current;
      const ctx = audioCtxRef.current;
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      setTimeout(() => {
        try {
          osc1.stop();
          osc2.stop();
          osc1.disconnect();
          osc2.disconnect();
        } catch {
          // already stopped
        }
      }, 300);
      synthNodesRef.current = null;
    }
    setIsPlaying(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="font-mono text-xs md:text-sm space-y-6 max-w-md mx-auto">
      <div className="flex items-center justify-between pb-3 border-b-2 border-black dark:border-white">
        <span className="font-bold text-black dark:text-white">AUDIO: voice_memo_01.wav</span>
        <span className="text-neutral-500">[WEB AUDIO SYNTH]</span>
      </div>

      {/* Cassette Graphic with spinning spools */}
      <div className="p-4 bg-neutral-900 border-2 border-black dark:border-white shadow-[4px_4px_0_rgba(0,0,0,0.3)] text-neutral-200 space-y-4">
        {/* Cassette window */}
        <div className="h-28 bg-neutral-950 border border-neutral-800 rounded relative flex items-center justify-around px-8">
          {/* Left Reel */}
          <div
            className={`w-12 h-12 rounded-full border-2 border-dashed border-neutral-400 flex items-center justify-center ${
              isPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '3s' }}
          >
            <div className="w-4 h-4 rounded-full bg-neutral-600" />
          </div>

          {/* Tape window */}
          <div className="h-6 w-16 bg-neutral-900 border border-neutral-700 flex items-center justify-center">
            <div className="w-12 h-1 bg-amber-700/80 rounded" />
          </div>

          {/* Right Reel */}
          <div
            className={`w-12 h-12 rounded-full border-2 border-dashed border-neutral-400 flex items-center justify-center ${
              isPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '3s' }}
          >
            <div className="w-4 h-4 rounded-full bg-neutral-600" />
          </div>
        </div>

        {/* Audio Meta */}
        <div className="flex justify-between items-center text-xs">
          <div>
            <span className="block font-bold text-neutral-200">FIELD_RECORDING // TAPE</span>
            <span className="text-[10px] text-neutral-400">44.1kHz • 16-bit • Stereo Lo-fi Drone</span>
          </div>
          <span className="text-sm font-bold text-amber-400 font-mono">
            {formatTime(playbackTime)} / 01:00
          </span>
        </div>
      </div>

      {/* Play / Stop Button */}
      <div className="flex justify-center items-center space-x-3 pt-2">
        <button
          onClick={togglePlay}
          className={`px-6 py-2.5 border-2 font-bold text-xs uppercase tracking-wider cursor-pointer transition-all ${
            isPlaying
              ? 'bg-[#cd3f25] text-white border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)]'
              : 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,0.7)] hover:bg-[#cd3f25] dark:hover:bg-[#cd3f25] hover:text-white dark:hover:text-white'
          }`}
        >
          {isPlaying ? '■ STOP TAPE' : '▶ PLAY AUDIO MEMO'}
        </button>
      </div>

      <p className="text-[11px] text-neutral-500 text-center">
        Zero external audio files. Real-time synthesized ambient drone generated in-browser.
      </p>
    </div>
  );
};
