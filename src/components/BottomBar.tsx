import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolio';

export const BottomBar: React.FC = () => {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="fixed bottom-4 md:bottom-7 left-0 right-0 z-30 flex flex-col items-center pointer-events-none select-none [&>*]:pointer-events-auto">
      {/* Links separated by slashes (Oklama signature style) */}
      <div className="text-black/50 dark:text-white/50 font-mono text-xs md:text-sm flex flex-wrap justify-center items-center gap-x-2 px-4">
        <a
          className="hover:text-[#cd3f25] transition-colors"
          href={portfolioData.contacts.github}
          target="_blank"
          rel="noreferrer"
        >
          github
        </a>
        <span>/</span>
        <a
          className="hover:text-[#cd3f25] transition-colors"
          href={portfolioData.contacts.twitter}
          target="_blank"
          rel="noreferrer"
        >
          x
        </a>
        <span>/</span>
        <a
          className="hover:text-[#cd3f25] transition-colors"
          href={portfolioData.contacts.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          linkedin
        </a>
        <span>/</span>
        <a
          className="hover:text-[#cd3f25] transition-colors"
          href={`mailto:${portfolioData.contacts.email}`}
        >
          email
        </a>
      </div>

      {/* Minimal timestamp & status line */}
      <div className="text-[10px] font-mono text-black/35 dark:text-white/35 mt-1 tracking-wider">
        <span>{portfolioData.location.toLowerCase()}</span>
        <span className="mx-1.5">•</span>
        <span>{timeStr}</span>
        <span className="mx-1.5">•</span>
        <span className="text-emerald-600 dark:text-emerald-400 font-bold">sys:ok</span>
      </div>
    </footer>
  );
};
