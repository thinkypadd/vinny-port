export type ItemId =
  | 'nuthoughts'
  | 'works'
  | 'archive'
  | 'polaroid'
  | 'resume'
  | 'audio'
  | 'terminal'
  | 'contact';

export interface DesktopItem {
  id: ItemId;
  label: string;
  iconType: 'folder-manila' | 'folder-black' | 'folder-gray' | 'polaroid' | 'text' | 'audio' | 'terminal' | 'contact';
  position: { x: number; y: number }; // percentage or pixel coordinates
  subtext?: string;
  urlPath?: string;
}

export interface WindowState {
  id: ItemId;
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
  year: string;
  category: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  metrics?: string;
}

export interface ArchiveItem {
  id: string;
  title: string;
  year: string;
  type: string;
  description: string;
  link?: string;
}

export interface ThoughtSection {
  date: string;
  title?: string;
  paragraphs: string[];
  signature: string;
  imageCaption?: string;
}

export interface PortfolioData {
  name: string;
  moniker: string;
  title: string;
  location: string;
  bio: string;
  thought: ThoughtSection;
  projects: ProjectItem[];
  archive: ArchiveItem[];
  skills: { category: string; items: string[] }[];
  contacts: {
    email: string;
    github: string;
    twitter: string;
    linkedin: string;
    source: string;
  };
}
