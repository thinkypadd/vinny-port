import { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
  name: 'Alex Rivera',
  title: 'Full Stack Engineer & Systems Tinkerer',
  tagline: 'Building lightweight distributed systems, snappy developer tools, and tactile web interfaces.',
  location: 'San Francisco, CA & Remote',
  bio: [
    'I build fast, resilient web applications and systems software with minimal bloat. My focus centers on high-performance interfaces, local-first architectures, and clean developer workflows.',
    'Currently exploring edge computing primitives, browser-native database engines, and retro computing aesthetics in modern applications.',
    'When not writing code, I restore 90s mechanical keyboards, experiment with self-hosted homelabs, and cycle around the bay.'
  ],
  skills: [
    {
      title: 'Languages',
      skills: ['TypeScript', 'JavaScript', 'Go', 'Rust', 'Python', 'SQL', 'C']
    },
    {
      title: 'Frontend & UI',
      skills: ['React', 'Next.js', 'Tailwind CSS', 'Vite', 'HTML5/Canvas', 'WebSockets', 'Radix UI']
    },
    {
      title: 'Backend & Data',
      skills: ['Node.js', 'PostgreSQL', 'Redis', 'SQLite', 'GraphQL', 'gRPC', 'Kafka']
    },
    {
      title: 'DevOps & Tooling',
      skills: ['Docker', 'Kubernetes', 'Linux', 'Vercel', 'AWS', 'Git', 'CI/CD Pipelines']
    }
  ],
  projects: [
    {
      id: 'vapor-db',
      title: 'VaporDB',
      description: 'An embedded in-memory key-value store with write-ahead logging and snapshotting written in Go. Under 2,000 LOC.',
      tech: ['Go', 'Raft', 'BoltDB', 'Docker'],
      link: 'https://github.com',
      github: 'https://github.com',
      featured: true,
      metrics: '120k ops/sec throughput, <1ms p99 latency'
    },
    {
      id: 'hyper-terminal',
      title: 'RetroShell',
      description: 'A WebGL-accelerated CRT terminal emulator with authentic phosphor decay, scanlines, and VT100 compliance.',
      tech: ['TypeScript', 'WebGL', 'WebAudio API', 'Canvas'],
      link: 'https://github.com',
      github: 'https://github.com',
      featured: true,
      metrics: 'Zero dropped frames at 60fps'
    },
    {
      id: 'sync-mesh',
      title: 'SyncMesh',
      description: 'Local-first CRDT synchronization engine for peer-to-peer collaborative canvas drawing with zero central authority.',
      tech: ['React', 'Yjs', 'WebRTC', 'IndexedDB'],
      link: 'https://github.com',
      github: 'https://github.com',
      metrics: 'Sub-50ms peer-to-peer conflict resolution'
    },
    {
      id: 'tiny-mon',
      title: 'TinyMon',
      description: 'Single-binary system resource monitor for Linux servers with zero runtime dependencies and a micro TUI.',
      tech: ['Rust', 'Sysinfo', 'Crossterm'],
      link: 'https://github.com',
      github: 'https://github.com',
      metrics: 'Only 3.2MB binary, <10MB RAM usage'
    }
  ],
  experience: [
    {
      role: 'Senior Software Engineer',
      company: 'Platform Architecture Team',
      period: '2023 - Present',
      bullets: [
        'Architected real-time event streaming pipeline processing 40M+ events daily with zero data loss.',
        'Refactored legacy monolith frontend into lightweight modular micro-frontends, cutting bundle size by 62%.',
        'Spearheaded internal developer tooling improvements, dropping CI cycle times from 18m to 3.5m.'
      ]
    },
    {
      role: 'Full Stack Engineer',
      company: 'Cloud Infrastructure Lab',
      period: '2021 - 2023',
      bullets: [
        'Built interactive web console for distributed serverless orchestrator with real-time log streaming.',
        'Implemented zero-downtime database migration tooling for multi-tenant PostgreSQL clusters.'
      ]
    },
    {
      role: 'Software Engineering Intern',
      company: 'Systems & Tools Group',
      period: '2020 - 2021',
      bullets: [
        'Contributed to core CLI tooling and telemetry libraries across Node.js and Go microservices.'
      ]
    }
  ],
  contacts: {
    email: 'hello@alexrivera.dev',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://x.com'
  }
};
