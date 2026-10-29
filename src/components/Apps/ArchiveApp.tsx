import React from 'react';
import { portfolioData } from '../../data/portfolio';

export const ArchiveApp: React.FC = () => {
  const { archive } = portfolioData;

  return (
    <div className="font-mono text-xs md:text-sm space-y-5 text-black dark:text-white">
      <div className="pb-3 border-b-2 border-black dark:border-white flex items-center justify-between">
        <span className="font-bold text-black dark:text-white text-sm">DIR: /archive</span>
        <span className="text-neutral-600 dark:text-neutral-400 font-medium">({archive.length} entries)</span>
      </div>

      <p className="text-neutral-700 dark:text-neutral-300 text-xs">
        Past experiments, discarded prototypes, and minimal tools that did their job.
      </p>

      {/* Directory Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 text-[11px] font-bold">
              <th className="py-2 pr-3 font-semibold">YEAR</th>
              <th className="py-2 pr-3 font-semibold">NAME</th>
              <th className="py-2 pr-3 font-semibold">TYPE</th>
              <th className="py-2 pr-3 font-semibold hidden sm:table-cell">SUMMARY</th>
              <th className="py-2 text-right font-semibold">REF</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {archive.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-neutral-100 dark:hover:bg-neutral-900/60 transition-colors"
              >
                <td className="py-2.5 pr-3 text-neutral-700 dark:text-neutral-300 font-medium whitespace-nowrap">
                  {item.year}
                </td>
                <td className="py-2.5 pr-3 font-bold text-black dark:text-white whitespace-nowrap">
                  {item.title}
                </td>
                <td className="py-2.5 pr-3 text-neutral-700 dark:text-neutral-300 text-[11px] font-medium whitespace-nowrap">
                  [{item.type}]
                </td>
                <td className="py-2.5 pr-3 text-neutral-800 dark:text-neutral-200 hidden sm:table-cell text-xs">
                  {item.description}
                </td>
                <td className="py-2.5 text-right whitespace-nowrap">
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-black dark:text-white hover:text-[#cd3f25] font-bold text-xs underline"
                    >
                      src ↗
                    </a>
                  ) : (
                    <span className="text-neutral-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
