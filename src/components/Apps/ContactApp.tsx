import React, { useState } from 'react';
import { OsTheme } from '../../types';
import { portfolioData } from '../../data/portfolio';
import { Mail, Send, Check } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../Icons';

interface ContactAppProps {
  theme: OsTheme;
}

export const ContactApp: React.FC<ContactAppProps> = ({ theme }) => {
  const is98 = theme === 'win98';
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.contacts.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3500);
  };

  return (
    <div className={`p-4 md:p-6 overflow-y-auto h-full ${is98 ? 'font-win98 win98-scrollbar bg-[#c0c0c0] text-black text-sm' : 'font-mac mac-scrollbar bg-slate-900/90 text-slate-100 text-sm'}`}>
      <div className="pb-3 mb-4 border-b border-black/10 dark:border-white/10">
        <h1 className={`font-bold text-base flex items-center gap-2 ${is98 ? 'text-black' : 'text-white'}`}>
          <Mail size={18} className={is98 ? 'text-[#000080]' : 'text-blue-400'} />
          Get In Touch
        </h1>
        <p className={`text-xs ${is98 ? 'text-[#555]' : 'text-slate-400'}`}>
          Direct lines of communication and social networks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Direct Channels */}
        <div className="space-y-3">
          <div className={`p-3.5 ${is98 ? 'win98-field bg-white' : 'bg-white/[0.03] border border-white/10 rounded-xl'}`}>
            <div className="text-xs font-semibold mb-2 text-slate-400">Direct Email</div>
            <div className="flex items-center justify-between gap-2">
              <span className={`font-mono text-xs truncate ${is98 ? 'text-[#000080] font-bold' : 'text-white'}`}>
                {portfolioData.contacts.email}
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`text-xs px-2.5 py-1 transition-all ${
                  is98 ? 'win98-btn' : 'bg-white/10 hover:bg-white/20 text-white rounded-md'
                }`}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <div className={`p-3.5 space-y-2 ${is98 ? 'win98-field bg-white' : 'bg-white/[0.03] border border-white/10 rounded-xl'}`}>
            <div className="text-xs font-semibold text-slate-400 mb-1">Profiles</div>
            <a
              href={portfolioData.contacts.github}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2.5 p-2 transition-colors ${
                is98 ? 'hover:bg-[#000080] hover:text-white' : 'hover:bg-white/10 rounded-lg text-slate-200'
              }`}
            >
              <GithubIcon size={16} />
              <span className="text-xs font-medium">GitHub Repository & Code</span>
            </a>
            <a
              href={portfolioData.contacts.linkedin}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2.5 p-2 transition-colors ${
                is98 ? 'hover:bg-[#000080] hover:text-white' : 'hover:bg-white/10 rounded-lg text-slate-200'
              }`}
            >
              <LinkedinIcon size={16} />
              <span className="text-xs font-medium">LinkedIn Professional Network</span>
            </a>
            {portfolioData.contacts.twitter && (
              <a
                href={portfolioData.contacts.twitter}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-2.5 p-2 transition-colors ${
                  is98 ? 'hover:bg-[#000080] hover:text-white' : 'hover:bg-white/10 rounded-lg text-slate-200'
                }`}
              >
                <TwitterIcon size={16} />
                <span className="text-xs font-medium">Twitter / X Stream</span>
              </a>
            )}
          </div>
        </div>

        {/* Message Form */}
        <form
          onSubmit={handleSubmit}
          className={`p-3.5 flex flex-col justify-between ${
            is98 ? 'win98-field bg-white' : 'bg-white/[0.03] border border-white/10 rounded-xl'
          }`}
        >
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-2 py-1.5 text-xs outline-none ${
                  is98
                    ? 'border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white bg-white text-black'
                    : 'bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500'
                }`}
                placeholder="Ada Lovelace"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-2 py-1.5 text-xs outline-none ${
                  is98
                    ? 'border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white bg-white text-black'
                    : 'bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500'
                }`}
                placeholder="ada@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">Message</label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full px-2 py-1.5 text-xs outline-none resize-none ${
                  is98
                    ? 'border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white bg-white text-black'
                    : 'bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500'
                }`}
                placeholder="Let's build something neat together..."
              />
            </div>
          </div>

          <div className="mt-4 pt-2">
            {sent ? (
              <div className={`p-2 text-center text-xs flex items-center justify-center gap-1.5 font-bold ${
                is98 ? 'bg-[#008000] text-white' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg'
              }`}>
                <Check size={14} /> Message sent successfully!
              </div>
            ) : (
              <button
                type="submit"
                className={`w-full py-1.5 px-4 text-xs font-medium flex items-center justify-center gap-1.5 ${
                  is98
                    ? 'win98-btn'
                    : 'bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors'
                }`}
              >
                <Send size={13} />
                Send Message
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
