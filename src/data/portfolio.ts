import { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
  name: 'Vinny',
  moniker: 'vinny',
  title: 'Full-Stack Engineer & Creative Technologist',
  location: 'San Francisco / Remote',
  bio: 'Software engineer focused on distributed systems, tactile web surfaces, and offline-first interfaces. Stripping away synthetic noise in pursuit of tools that last.',
  thought: {
    date: 'october 30 2026',
    title: 'nu thoughts',
    paragraphs: [
      'I spend most of my days building small, reliable machines. Writing code. Reading whitepapers. And restoring vintage computers. The quiet hours of early morning keep me focused.',
      'I go days without checking feeds.',
      'The modern web has become loud, filled with synthetic layers and algorithmic panic. I find relief in simplicity—interfaces that respond with zero latency, software that respects human attention, and architectures that can survive a disconnected wire.',
      'While trends accelerate and evaporate, I reflect on what endures. Clean primitives. Honest data structures. Systems built with intent.',
      'As I release this body of work, I am grateful for the collaborators, open-source maintainers, and craftsmen who take pride in the invisible details. Writing software is a trade and a discipline.',
      'There is quiet dignity in subtraction.',
      'Thank you for stopping by.',
      'See you in the terminal.'
    ],
    signature: '-vinny',
    imageCaption: 'desk, 35mm film, 2026'
  },
  projects: [
    {
      id: 'vapor-engine',
      title: 'vapor-engine',
      year: '2026',
      category: 'systems / database',
      description: 'An embedded in-memory key-value store with append-only write-ahead log and MVCC snapshotting in Go. Zero external dependencies. Under 1,800 lines of code.',
      tech: ['Go', 'Raft', 'BoltDB', 'POSIX'],
      link: 'https://github.com',
      github: 'https://github.com',
      metrics: '140k writes/sec, sub-millisecond p99 latency'
    },
    {
      id: 'monolith-os',
      title: 'oklama-desktop',
      year: '2026',
      category: 'interface / frontend',
      description: 'A brutalist digital desktop environment inspired by Kendrick Lamar’s oklama.com. Minimalist draggable workspace, pure typography, and offline static delivery for GitHub Pages.',
      tech: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite'],
      link: 'https://github.com',
      github: 'https://github.com',
      metrics: 'Zero runtime bundle bloat, 100% lighthouse score'
    },
    {
      id: 'telemetry-stream',
      title: 'telemetry-stream',
      year: '2025',
      category: 'distributed systems',
      description: 'Lightweight WebSocket/gRPC multiplexer for ingesting distributed IoT telemetry metrics with zero GC spikes in high-throughput environments.',
      tech: ['Rust', 'Tokio', 'WebSockets', 'Protobuf'],
      link: 'https://github.com',
      github: 'https://github.com',
      metrics: 'Handles 80k concurrent connections on single core'
    },
    {
      id: 'raw-canvas',
      title: 'raw-canvas',
      year: '2025',
      category: 'graphics / creative',
      description: 'Minimalist raster editor in WebGL with authentic phosphor decay simulation, pixel-precise grid snapping, and pressure-sensitive brush dynamics.',
      tech: ['TypeScript', 'WebGL2', 'WebAudio API', 'GLSL'],
      link: 'https://github.com',
      github: 'https://github.com',
      metrics: '60fps locked on low-power mobile devices'
    },
    {
      id: 'sync-wire',
      title: 'sync-wire',
      year: '2024',
      category: 'local-first / p2p',
      description: 'Peer-to-peer CRDT state synchronizer over WebRTC data channels for real-time collaborative document editing without central servers.',
      tech: ['TypeScript', 'WebRTC', 'CRDTs', 'IndexedDB'],
      link: 'https://github.com',
      github: 'https://github.com',
      metrics: '<30ms median peer convergence'
    }
  ],
  archive: [
    {
      id: 'arch-01',
      title: 'forth-cpu-emulator',
      year: '2024',
      type: 'emulator',
      description: 'Stack-based virtual machine written in ANSI C targeting a minimal 16-bit instruction set.',
      link: 'https://github.com'
    },
    {
      id: 'arch-02',
      title: 'analog-synth-patcher',
      year: '2024',
      type: 'audio / web-audio',
      description: 'Modular synthesizer patch bay running in the browser using Web Audio AudioWorklets.',
      link: 'https://github.com'
    },
    {
      id: 'arch-03',
      title: 'dotfiles-nix',
      year: '2023',
      type: 'configuration',
      description: 'Deterministic NixOS and Neovim development environment reproducible across machines.',
      link: 'https://github.com'
    },
    {
      id: 'arch-04',
      title: 'markdown-typesetter',
      year: '2023',
      type: 'cli tool',
      description: 'Zero-config CLI that compiles Markdown documents into minimalist book-grade PDFs.',
      link: 'https://github.com'
    }
  ],
  skills: [
    {
      category: 'Languages',
      items: ['Go', 'TypeScript', 'Rust', 'C', 'Python', 'SQL', 'Bash']
    },
    {
      category: 'Frontend & Architecture',
      items: ['React', 'Next.js', 'Tailwind CSS', 'Vite', 'HTML5 Canvas', 'WebGL', 'WebSockets', 'WebAudio']
    },
    {
      category: 'Systems & Backend',
      items: ['Node.js', 'PostgreSQL', 'SQLite', 'Redis', 'gRPC', 'Docker', 'Linux (Debian/Arch)', 'Nginx']
    },
    {
      category: 'Principles',
      items: ['Local-First Software', 'Minimalist Digital Brutalism', 'Offline Capability', 'Accessibility (WCAG AA)', 'Zero Unnecessary Abstractions']
    }
  ],
  contacts: {
    email: 'vinny@example.com',
    github: 'https://github.com',
    twitter: 'https://x.com',
    linkedin: 'https://linkedin.com',
    source: 'https://github.com'
  }
};
