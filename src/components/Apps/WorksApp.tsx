import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolio';

export const WorksApp: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const { projects } = portfolioData;

  const categories = ['all', ...Array.from(new Set(projects.map((p) => p.category.split('/')[0].trim())))];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category.includes(activeFilter));

  return (
    <div className="font-mono text-xs md:text-sm space-y-6">
      {/* Directory Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b-2 border-black dark:border-white gap-2">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-black dark:text-white">DIR: /works</span>
          <span className="text-neutral-500">({filteredProjects.length} items)</span>
        </div>

        {/* Filter tags */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-neutral-400 text-xs mr-1">filter:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-1.5 py-0.5 border text-xs cursor-pointer transition-colors ${
                activeFilter === cat
                  ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                  : 'bg-transparent text-neutral-600 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Project Items List */}
      <div className="space-y-6">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="p-4 border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 hover:border-black dark:hover:border-white transition-all space-y-2.5"
          >
            {/* Top row: Year & Category & Links */}
            <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-neutral-700 dark:text-neutral-300">
                  [{project.year}]
                </span>
                <span className="text-neutral-400">•</span>
                <span className="text-[11px] tracking-wide uppercase">
                  {project.category}
                </span>
              </div>

              {/* Action Links */}
              <div className="flex items-center space-x-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#cd3f25] text-xs font-bold underline transition-colors"
                  >
                    repo ↗
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#cd3f25] text-xs font-bold underline transition-colors"
                  >
                    preview ↗
                  </a>
                )}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-base font-bold text-black dark:text-white tracking-tight">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-xs md:text-sm">
              {project.description}
            </p>

            {/* Metrics highlight if available */}
            {project.metrics && (
              <div className="text-[11px] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 border border-emerald-200 dark:border-emerald-800/60 inline-block font-mono">
                ⚡ {project.metrics}
              </div>
            )}

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-300 text-[10px] font-mono"
                >
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
