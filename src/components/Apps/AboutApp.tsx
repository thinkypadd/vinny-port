import React from 'react';
import { OsTheme } from '../../types';
import { portfolioData } from '../../data/portfolio';
import { User, Briefcase, MapPin, Award, Terminal } from 'lucide-react';

interface AboutAppProps {
  theme: OsTheme;
}

export const AboutApp: React.FC<AboutAppProps> = ({ theme }) => {
  const is98 = theme === 'win98';

  return (
    <div className={`p-4 md:p-6 overflow-y-auto h-full ${is98 ? 'font-win98 win98-scrollbar bg-[#c0c0c0] text-black text-sm' : 'font-mac mac-scrollbar bg-slate-900/90 text-slate-100 text-sm'}`}>
      {/* Header Profile Section */}
      <div className={`flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-4 mb-4 border-b ${is98 ? 'border-[#808080]' : 'border-white/10'}`}>
        <div className={`w-20 h-20 shrink-0 flex items-center justify-center font-bold text-2xl ${is98 ? 'bg-[#000080] text-white border-2 border-t-white border-l-white border-b-black border-r-black' : 'bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl shadow-lg text-white'}`}>
          {portfolioData.name.split(' ').map(n => n[0]).join('')}
        </div>
        
        <div className="flex-1 text-center sm:text-left">
          <h1 className={`text-xl font-bold tracking-tight ${is98 ? 'text-black' : 'text-white'}`}>
            {portfolioData.name}
          </h1>
          <p className={`font-medium mt-0.5 ${is98 ? 'text-[#000080]' : 'text-blue-400'}`}>
            {portfolioData.title}
          </p>
          <div className={`flex items-center justify-center sm:justify-start gap-2 text-xs mt-2 ${is98 ? 'text-[#505050]' : 'text-slate-400'}`}>
            <MapPin size={13} />
            <span>{portfolioData.location}</span>
          </div>
        </div>
      </div>

      {/* Bio Paragraphs */}
      <div className={`space-y-3 mb-6 p-3 ${is98 ? 'win98-field leading-relaxed' : 'bg-white/[0.03] border border-white/10 rounded-xl leading-relaxed text-slate-300'}`}>
        {portfolioData.bio.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      {/* Experience Section */}
      <div className="mb-4">
        <h2 className={`font-bold text-base flex items-center gap-2 mb-3 ${is98 ? 'text-black' : 'text-white'}`}>
          <Briefcase size={16} className={is98 ? 'text-[#000080]' : 'text-blue-400'} />
          Experience & History
        </h2>

        <div className="space-y-3">
          {portfolioData.experience.map((exp, idx) => (
            <div 
              key={idx}
              className={`p-3 ${is98 ? 'win98-field' : 'bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors rounded-xl'}`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                <span className={`font-semibold ${is98 ? 'text-black' : 'text-white'}`}>
                  {exp.role}
                </span>
                <span className={`text-xs ${is98 ? 'text-[#555]' : 'text-slate-400'}`}>
                  {exp.period}
                </span>
              </div>
              <div className={`text-xs mb-2 font-medium ${is98 ? 'text-[#000080]' : 'text-blue-400'}`}>
                {exp.company}
              </div>
              <ul className={`list-disc list-inside space-y-1 text-xs ${is98 ? 'text-slate-800' : 'text-slate-300'}`}>
                {exp.bullets.map((b, bIdx) => (
                  <li key={bIdx} className="leading-snug">{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
