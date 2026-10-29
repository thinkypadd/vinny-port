export type OsTheme = 'macos' | 'win98';

export type AppId = 'about' | 'projects' | 'skills' | 'terminal' | 'contact' | 'settings';

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  featured?: boolean;
  metrics?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface PortfolioData {
  name: string;
  title: string;
  tagline: string;
  location: string;
  bio: string[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  contacts: {
    email: string;
    github: string;
    linkedin: string;
    twitter?: string;
  };
}
