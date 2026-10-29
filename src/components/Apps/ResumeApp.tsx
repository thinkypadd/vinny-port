import React from 'react';
import { portfolioData } from '../../data/portfolio';

export const ResumeApp: React.FC = () => {
  const { name, title, bio, skills, contacts } = portfolioData;

  return (
    <div className="font-mono text-xs md:text-sm space-y-6 max-w-2xl mx-auto select-text text-black dark:text-white">
      {/* File status */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-black dark:border-white">
        <span className="font-bold text-black dark:text-white text-sm">FILE: resume.txt (UTF-8)</span>
        <a
          href={`mailto:${contacts.email}`}
          className="text-xs text-black dark:text-white hover:text-[#cd3f25] underline font-bold"
        >
          [request pdf]
        </a>
      </div>

      {/* ASCII Header */}
      <div className="bg-neutral-100 dark:bg-neutral-900 p-3 border-2 border-neutral-300 dark:border-neutral-800 text-xs space-y-1">
        <div className="font-bold text-black dark:text-white text-sm">{name}</div>
        <div className="text-neutral-800 dark:text-neutral-300 font-medium">{title}</div>
        <div className="text-neutral-600 dark:text-neutral-400 text-[11px] pt-1 border-t border-neutral-200 dark:border-neutral-800">
          {portfolioData.location} // {contacts.email} // {contacts.github}
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-1.5">
        <h4 className="font-bold text-xs uppercase tracking-wider text-black dark:text-white border-b-2 border-neutral-200 dark:border-neutral-800 pb-1">
          // 01. SUMMARY
        </h4>
        <p className="text-neutral-900 dark:text-neutral-200 leading-relaxed font-normal">
          {bio}
        </p>
      </div>

      {/* Technical Skills Grid */}
      <div className="space-y-3">
        <h4 className="font-bold text-xs uppercase tracking-wider text-black dark:text-white border-b-2 border-neutral-200 dark:border-neutral-800 pb-1">
          // 02. COMPETENCIES
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {skills.map((cat) => (
            <div
              key={cat.category}
              className="p-3 border border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40"
            >
              <span className="font-bold text-xs block text-black dark:text-white mb-2">
                {cat.category}:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="text-[11px] bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 text-black dark:text-neutral-200 font-medium border border-neutral-300 dark:border-neutral-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="space-y-4">
        <h4 className="font-bold text-xs uppercase tracking-wider text-black dark:text-white border-b-2 border-neutral-200 dark:border-neutral-800 pb-1">
          // 03. EXPERIENCE RECORD
        </h4>

        <div className="space-y-3">
          <div className="p-3.5 border-2 border-neutral-300 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/30 space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-black dark:text-white text-sm">
                Senior Systems & Frontend Architect
              </span>
              <span className="text-neutral-600 dark:text-neutral-400 font-semibold">2023 — PRESENT</span>
            </div>
            <div className="text-[11px] text-neutral-600 dark:text-neutral-400 font-semibold">Distributed Web Lab</div>
            <p className="text-neutral-900 dark:text-neutral-200 text-xs leading-relaxed pt-1">
              • Engineered local-first sync engines and low-latency canvas primitives for collaborative tools.
              <br />
              • Reduced client bundle payload by 65% by migrating from bloated frameworks to zero-dependency Web APIs.
              <br />
              • Mentored engineering staff on high-performance memory profiling and distributed debugging.
            </p>
          </div>

          <div className="p-3.5 border-2 border-neutral-300 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/30 space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-black dark:text-white text-sm">
                Full-Stack Systems Engineer
              </span>
              <span className="text-neutral-600 dark:text-neutral-400 font-semibold">2021 — 2023</span>
            </div>
            <div className="text-[11px] text-neutral-600 dark:text-neutral-400 font-semibold">Nexus Data Infrastructure</div>
            <p className="text-neutral-900 dark:text-neutral-200 text-xs leading-relaxed pt-1">
              • Built high-throughput stream processing pipelines in Go and Rust handling 50k+ events/sec.
              <br />
              • Created custom observability CLI and terminal dashboards used across production clusters.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
