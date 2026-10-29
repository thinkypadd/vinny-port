import React from 'react';
import { OsTheme } from '../../types';
import { portfolioData } from '../../data/portfolio';
import { ExternalLink, FolderGit2, Star } from 'lucide-react';
import { GithubIcon } from '../Icons';

interface ProjectsAppProps {
  theme: OsTheme;
}

export const ProjectsApp: React.FC<ProjectsAppProps> = ({ theme }) => {
  const is98 = theme === 'win98';

  return (
    <div className={`p-4 md:p-6 overflow-y-auto h-full ${is98 ? 'font-win98 win98-scrollbar bg-[#c0c0c0] text-black text-sm' : 'font-mac mac-scrollbar bg-slate-900/90 text-slate-100 text-sm'}`}>
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-black/10 dark:border-white/10">
        <div>
          <h1 className={`font-bold text-lg flex items-center gap-2 ${is98 ? 'text-black' : 'text-white'}`}>
            <FolderGit2 size={18} className={is98 ? 'text-[#000080]' : 'text-blue-400'} />
            Featured Software & Projects
          </h1>
          <p className={`text-xs mt-0.5 ${is98 ? 'text-[#555]' : 'text-slate-400'}`}>
            Minimalist systems, developer tools, and high-performance apps.
          </p>
        </div>
        <span className={`text-xs px-2 py-0.5 ${is98 ? 'win98-field font-mono' : 'bg-white/10 text-slate-300 rounded-full font-mono'}`}>
          {portfolioData.projects.length} repos
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {portfolioData.projects.map((project) => (
          <div
            key={project.id}
            className={`flex flex-col justify-between p-3.5 transition-all ${
              is98
                ? 'win98-field bg-white'
                : 'bg-white/[0.03] border border-white/10 hover:border-blue-500/40 rounded-xl hover:bg-white/[0.05]'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5 font-bold">
                  {project.featured && (
                    <Star size={14} className={is98 ? 'text-yellow-600 fill-yellow-600' : 'text-amber-400 fill-amber-400'} />
                  )}
                  <span className={`text-base ${is98 ? 'text-[#000080]' : 'text-white'}`}>
                    {project.title}
                  </span>
                </div>
                
                <div className="flex items-center gap-1.5 shrink-0">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-1 transition-colors ${
                        is98
                          ? 'win98-btn text-xs px-1.5 py-0.5 flex items-center gap-1'
                          : 'text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10'
                      }`}
                      title="View Source on GitHub"
                    >
                      <GithubIcon size={13} />
                      {is98 && <span>Src</span>}
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-1 transition-colors ${
                        is98
                          ? 'win98-btn text-xs px-1.5 py-0.5 flex items-center gap-1'
                          : 'text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10'
                      }`}
                      title="Open Live Deployment"
                    >
                      <ExternalLink size={13} />
                      {is98 && <span>Visit</span>}
                    </a>
                  )}
                </div>
              </div>

              <p className={`text-xs mb-3 leading-relaxed ${is98 ? 'text-[#333]' : 'text-slate-300'}`}>
                {project.description}
              </p>
            </div>

            <div className="mt-2 pt-2 border-t border-black/10 dark:border-white/5 space-y-2">
              {project.metrics && (
                <div className={`text-[11px] font-mono ${is98 ? 'text-[#000080]' : 'text-emerald-400'}`}>
                  ⚡ {project.metrics}
                </div>
              )}

              <div className="flex flex-wrap gap-1">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className={`text-[10px] px-1.5 py-0.5 ${
                      is98
                        ? 'bg-[#dfdfdf] border border-[#808080] text-black font-mono'
                        : 'bg-white/5 text-slate-300 rounded font-mono border border-white/5'
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
