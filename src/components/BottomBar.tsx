import React from 'react';
import { portfolioData } from '../data/portfolio';

export const BottomBar: React.FC = () => {
  return (
    <footer className="fixed bottom-6 md:bottom-8 left-0 right-0 z-30 flex justify-center items-center pointer-events-none select-none [&>*]:pointer-events-auto">
      {/* Links separated by slashes (Oklama reference style) */}
      <div className="text-black dark:text-white font-mono text-xs md:text-sm font-medium flex flex-wrap justify-center items-center gap-x-2 px-4">
        <a
          className="hover:text-[#cd3f25] text-black dark:text-white transition-colors"
          href={portfolioData.contacts.github}
          target="_blank"
          rel="noreferrer"
        >
          github
        </a>
        <span className="text-neutral-400">/</span>
        <a
          className="hover:text-[#cd3f25] text-black dark:text-white transition-colors"
          href={portfolioData.contacts.twitter}
          target="_blank"
          rel="noreferrer"
        >
          x
        </a>
        <span className="text-neutral-400">/</span>
        <a
          className="hover:text-[#cd3f25] text-black dark:text-white transition-colors"
          href={portfolioData.contacts.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          linkedin
        </a>
        <span className="text-neutral-400">/</span>
        <a
          className="hover:text-[#cd3f25] text-black dark:text-white transition-colors"
          href={`mailto:${portfolioData.contacts.email}`}
        >
          email
        </a>
      </div>
    </footer>
  );
};
