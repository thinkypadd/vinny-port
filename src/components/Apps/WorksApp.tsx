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
    <div className="font-mono text-xs md:text-sm space-y-6 text-black dark:text-white">
      {/* Directory Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b-2 border-black dark:border-white gap-2">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-black dark:text-white text-sm">DIR: /works</span>
          <span className="text-neutral-600 dark:text-neutral-400 font-medium">({filteredProjects.length} items)</span>
        </div>

        {/* Filter tags */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-neutral-600 dark:text-neutral-400 text-xs mr-1 font-medium">filter:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-2 py-0.5 border text-xs cursor-pointer font-medium transition-colors ${
                activeFilter === cat
                  ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                  : 'bg-neutral-100 text-black border-neutral-400 hover:border-black dark:bg-transparent dark:text-neutral-300 dark:border-neutral-700'
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
            className="p-4 border-2 border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 hover:border-black dark:hover:border-white transition-all space-y-2.5 text-black dark:text-white"
          >
            {/* Top row: Year & Category & Links */}
            <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-black dark:text-neutral-200">
                  [{project.year}]
                </span>
                <span className="text-neutral-400">•</span>
                <span className="text-[11px] tracking-wide uppercase font-semibold text-neutral-700 dark:text-neutral-300">
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
                    className="text-black dark:text-white hover:text-[#cd3f25] text-xs font-bold underline transition-colors"
                  >
                    repo ↗
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-black dark:text-white hover:text-[#cd3f25] text-xs font-bold underline transition-colors"
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
            <p className="text-neutral-800 dark:text-neutral-200 leading-relaxed text-xs md:text-sm font-normal">
              {project.description}
            </p>

            {/* Metrics highlight */}
            {project.metrics && (
              <div className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/50 px-2 py-1 border border-emerald-300 dark:border-emerald-800/80 inline-block font-mono">
                ⚡ {project.metrics}
              </div>
            )}

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-800 text-black dark:text-neutral-200 text-[10px] font-mono font-medium border border-neutral-300 dark:border-neutral-700"
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
