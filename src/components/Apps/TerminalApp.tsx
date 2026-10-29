import React, { useState, useRef, useEffect } from 'react';
import { portfolioData } from '../../data/portfolio';

interface TerminalAppProps {
  onClose?: () => void;
  onOpenApp?: (id: string) => void;
}

interface CommandHistory {
  command: string;
  output: string | React.ReactNode;
}

export const TerminalApp: React.FC<TerminalAppProps> = ({ onClose, onOpenApp }) => {
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'sys.init',
      output: (
        <div className="space-y-1 text-neutral-400">
          <div>vinnyOS v2.6.0 (x86_64-pc-none)</div>
          <div>Type <span className="text-white font-bold">help</span> to view available commands.</div>
        </div>
      )
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const lower = cmd.toLowerCase();
    let response: React.ReactNode = '';

    switch (lower) {
      case 'help':
        response = (
          <div className="space-y-1">
            <div className="text-neutral-300 font-bold">AVAILABLE COMMANDS:</div>
            <div className="grid grid-cols-2 gap-x-4 max-w-sm text-neutral-400">
              <div><span className="text-emerald-400">ls</span> : list desktop files</div>
              <div><span className="text-emerald-400">whoami</span> : profile identity</div>
              <div><span className="text-emerald-400">cat &lt;file&gt;</span> : print file</div>
              <div><span className="text-emerald-400">projects</span> : view works</div>
              <div><span className="text-emerald-400">contact</span> : contact channels</div>
              <div><span className="text-emerald-400">clear</span> : clear terminal</div>
              <div><span className="text-emerald-400">exit</span> : close window</div>
            </div>
          </div>
        );
        break;

      case 'ls':
      case 'dir':
        response = (
          <div className="space-y-1 text-neutral-300">
            <div>drwx------  4 vinny staff  128B  works/</div>
            <div>drwx------  2 vinny staff  128B  archive/</div>
            <div>-rw-r--r--  1 vinny staff  1.2K  nuthoughts.txt</div>
            <div>-rw-r--r--  1 vinny staff  840B  resume.txt</div>
            <div>-rw-r--r--  1 vinny staff  3.4M  polaroid.raw</div>
            <div>-rw-r--r--  1 vinny staff  1.8M  memo_01.wav</div>
            <div>-rwxr-xr-x  1 vinny staff  420B  terminal.sh</div>
          </div>
        );
        break;

      case 'whoami':
        response = (
          <div className="space-y-1 text-neutral-300">
            <div><span className="font-bold text-white">{portfolioData.name}</span> (@{portfolioData.moniker})</div>
            <div>{portfolioData.title}</div>
            <div className="text-neutral-400">{portfolioData.bio}</div>
            <div className="text-neutral-500">Location: {portfolioData.location}</div>
          </div>
        );
        break;

      case 'cat thoughts':
      case 'cat nuthoughts':
      case 'cat nuthoughts.txt':
        response = (
          <div className="space-y-2 text-neutral-300 max-w-lg">
            <div className="text-xs text-neutral-500">--- {portfolioData.thought.date} ---</div>
            {portfolioData.thought.paragraphs.slice(0, 3).map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
            <div className="text-emerald-400 font-bold">{portfolioData.thought.signature}</div>
          </div>
        );
        break;

      case 'projects':
        response = (
          <div className="space-y-2 text-neutral-300">
            {portfolioData.projects.map((p) => (
              <div key={p.id} className="border-l-2 border-emerald-500 pl-2">
                <div className="font-bold text-white">{p.title} ({p.year})</div>
                <div className="text-neutral-400 text-xs">{p.description}</div>
                <div className="text-neutral-500 text-[11px]">Stack: {p.tech.join(', ')}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        response = (
          <div className="space-y-1 text-neutral-300">
            <div>Email: <a href={`mailto:${portfolioData.contacts.email}`} className="text-emerald-400 underline">{portfolioData.contacts.email}</a></div>
            <div>GitHub: <a href={portfolioData.contacts.github} target="_blank" rel="noreferrer" className="text-emerald-400 underline">{portfolioData.contacts.github}</a></div>
            <div>Twitter / X: <a href={portfolioData.contacts.twitter} target="_blank" rel="noreferrer" className="text-emerald-400 underline">{portfolioData.contacts.twitter}</a></div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
        if (onClose) {
          onClose();
          return;
        }
        response = 'Session ended.';
        break;

      default:
        if (cmd.startsWith('open ')) {
          const app = cmd.replace('open ', '').trim();
          if (onOpenApp) {
            onOpenApp(app);
            response = `Opening ${app}...`;
          } else {
            response = `Opening ${app}`;
          }
        } else {
          response = `zsh: command not found: ${cmd}. Type 'help' for available commands.`;
        }
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output: response }]);
    setInputVal('');
  };

  return (
    <div
      className="bg-[#0b0b0b] text-neutral-200 font-mono text-xs md:text-sm p-3 md:p-4 rounded-none min-h-[280px] h-full flex flex-col cursor-text select-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 overflow-y-auto space-y-3">
        {history.map((h, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center space-x-2 text-neutral-400">
              <span className="text-emerald-500 font-bold">vinny@shell:~$</span>
              <span className="text-white">{h.command}</span>
            </div>
            <div className="pl-4">{h.output}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Prompt */}
      <form onSubmit={handleCommand} className="mt-3 flex items-center space-x-2 pt-2 border-t border-neutral-800">
        <span className="text-emerald-500 font-bold">vinny@shell:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs md:text-sm"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
};
