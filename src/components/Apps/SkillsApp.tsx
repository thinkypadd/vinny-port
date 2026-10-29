import React from 'react';
import { OsTheme } from '../../types';
import { portfolioData } from '../../data/portfolio';
import { Cpu, CheckCircle2 } from 'lucide-react';

interface SkillsAppProps {
  theme: OsTheme;
}

export const SkillsApp: React.FC<SkillsAppProps> = ({ theme }) => {
  const is98 = theme === 'win98';

  return (
    <div className={`p-4 md:p-6 overflow-y-auto h-full ${is98 ? 'font-win98 win98-scrollbar bg-[#c0c0c0] text-black text-sm' : 'font-mac mac-scrollbar bg-slate-900/90 text-slate-100 text-sm'}`}>
      <div className="pb-3 mb-4 border-b border-black/10 dark:border-white/10 flex items-center gap-2">
        <Cpu size={18} className={is98 ? 'text-[#000080]' : 'text-cyan-400'} />
        <div>
          <h1 className={`font-bold text-base ${is98 ? 'text-black' : 'text-white'}`}>
            System Capabilities & Tech Stack
          </h1>
          <p className={`text-xs ${is98 ? 'text-[#555]' : 'text-slate-400'}`}>
            Core engineering competencies, languages, and platforms.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {portfolioData.skills.map((category) => (
          <div
            key={category.title}
            className={`p-3.5 ${is98 ? 'win98-field bg-white' : 'bg-white/[0.03] border border-white/10 rounded-xl'}`}
          >
            <h2 className={`font-bold text-sm mb-3 pb-1 border-b ${is98 ? 'text-[#000080] border-[#808080]' : 'text-blue-400 border-white/10'}`}>
              {category.title}
            </h2>

            <div className="flex flex-wrap gap-1.5">
              {category.skills.map((skill) => (
                <div
                  key={skill}
                  className={`flex items-center gap-1.5 px-2 py-1 text-xs ${
                    is98
                      ? 'bg-[#efefef] border border-[#a0a0a0] text-black font-sans'
                      : 'bg-white/5 border border-white/10 rounded-lg text-slate-200 hover:border-cyan-400/40 transition-colors'
                  }`}
                >
                  <CheckCircle2 size={12} className={is98 ? 'text-emerald-700' : 'text-emerald-400'} />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
