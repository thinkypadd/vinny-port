import React, { useState, useRef, useEffect } from 'react';
import { OsTheme } from '../../types';
import { portfolioData } from '../../data/portfolio';

interface TerminalAppProps {
  theme: OsTheme;
  onSetTheme: (newTheme: OsTheme) => void;
  onOpenApp: (id: any) => void;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export const TerminalApp: React.FC<TerminalAppProps> = ({ theme, onSetTheme, onOpenApp }) => {
  const is98 = theme === 'win98';
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: '',
      output: (
        <div className="space-y-1 mb-2">
          <div className="text-emerald-400 font-bold">
            {is98 ? 'Microsoft(R) Windows 98 [Version 4.10.1998] MS-DOS Prompt' : 'macOS Darwin Kernel Version 23.4.0 (zsh)'}
          </div>
          <div className="text-slate-400">
            Type <span className="text-yellow-300 font-mono">help</span> to list available commands, or <span className="text-yellow-300 font-mono">theme</span> to switch OS.
          </div>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const parts = cmd.split(' ');
    const main = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    let output: React.ReactNode = null;

    switch (main) {
      case 'help':
        output = (
          <div className="space-y-1 text-slate-300">
            <div>Available commands:</div>
            <div className="grid grid-cols-2 gap-x-4 max-w-sm pl-2">
              <div><span className="text-yellow-300">about</span> - view bio & intro</div>
              <div><span className="text-yellow-300">projects</span> - list repositories</div>
              <div><span className="text-yellow-300">skills</span> - show tech stack</div>
              <div><span className="text-yellow-300">contact</span> - social & email</div>
              <div><span className="text-yellow-300">theme [win98|macos]</span> - switch theme</div>
              <div><span className="text-yellow-300">open &lt;app&gt;</span> - open window</div>
              <div><span className="text-yellow-300">clear</span> - reset terminal</div>
              <div><span className="text-yellow-300">whoami</span> - print identity</div>
              <div><span className="text-yellow-300">date</span> - current timestamp</div>
            </div>
          </div>
        );
        break;

      case 'about':
      case 'bio':
        output = (
          <div className="space-y-1 text-slate-300">
            <div className="text-blue-400 font-bold">{portfolioData.name} - {portfolioData.title}</div>
            <div>{portfolioData.tagline}</div>
            <div className="text-slate-400 text-xs mt-1">Location: {portfolioData.location}</div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-slate-300">
            {portfolioData.projects.map((p) => (
              <div key={p.id} className="pl-2 border-l-2 border-emerald-500">
                <span className="text-emerald-400 font-semibold">{p.title}</span>: {p.description}
                <div className="text-xs text-slate-400">Tech: {p.tech.join(', ')}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-1 text-slate-300">
            {portfolioData.skills.map((s) => (
              <div key={s.title}>
                <span className="text-cyan-400">{s.title}:</span> {s.skills.join(', ')}
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-slate-300">
            <div>Email: <a href={`mailto:${portfolioData.contacts.email}`} className="text-blue-400 underline">{portfolioData.contacts.email}</a></div>
            <div>GitHub: <a href={portfolioData.contacts.github} target="_blank" rel="noreferrer" className="text-blue-400 underline">{portfolioData.contacts.github}</a></div>
            <div>LinkedIn: <a href={portfolioData.contacts.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 underline">{portfolioData.contacts.linkedin}</a></div>
          </div>
        );
        break;

      case 'theme':
        if (arg === 'win98' || arg === 'windows' || arg === '98') {
          onSetTheme('win98');
          output = <span className="text-emerald-400">Switched theme to Windows 98.</span>;
        } else if (arg === 'macos' || arg === 'mac' || arg === 'apple') {
          onSetTheme('macos');
          output = <span className="text-emerald-400">Switched theme to macOS.</span>;
        } else {
          output = (
            <div className="text-yellow-300">
              Current theme: <span className="text-white font-bold">{theme}</span>. Usage: <code className="text-white">theme macos</code> or <code className="text-white">theme win98</code>
            </div>
          );
        }
        break;

      case 'open':
        if (['about', 'projects', 'skills', 'terminal', 'contact', 'settings'].includes(arg)) {
          onOpenApp(arg);
          output = <span className="text-emerald-400">Opening {arg}...</span>;
        } else {
          output = <span className="text-red-400">App not found. Try: about, projects, skills, contact, settings</span>;
        }
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        setInputVal('');
        return;

      case 'whoami':
        output = <span className="text-cyan-300">visitor@vinny-portfolio (~guest)</span>;
        break;

      case 'date':
        output = <span className="text-slate-300">{new Date().toString()}</span>;
        break;

      case 'sudo':
        output = <span className="text-red-400">sudo: user is not in the sudoers file. This incident will be reported.</span>;
        break;

      default:
        output = <span className="text-red-400">command not found: {main}. Type &quot;help&quot; for a list of commands.</span>;
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInputVal('');
  };

  return (
    <div 
      className={`h-full p-4 overflow-y-auto font-mono text-xs sm:text-sm select-text cursor-text ${
        is98 ? 'bg-black text-[#00ff00] win98-scrollbar' : 'bg-[#0f111a]/95 text-slate-200 mac-scrollbar'
      }`}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="space-y-3">
        {history.map((h, i) => (
          <div key={i} className="space-y-1">
            {h.command && (
              <div className="flex items-center gap-2">
                <span className={is98 ? 'text-white' : 'text-blue-400 font-bold'}>
                  {is98 ? 'C:\\WINDOWS>' : 'user@macOS ~ %'}
                </span>
                <span className="text-white">{h.command}</span>
              </div>
            )}
            {h.output}
          </div>
        ))}
      </div>

      <form onSubmit={handleCommand} className="flex items-center gap-2 mt-2">
        <span className={is98 ? 'text-white font-bold' : 'text-blue-400 font-bold shrink-0'}>
          {is98 ? 'C:\\WINDOWS>' : 'user@macOS ~ %'}
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-white font-mono p-0 focus:ring-0"
          autoFocus
          spellCheck={false}
        />
      </form>
      <div ref={bottomRef} />
    </div>
  );
};
