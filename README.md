# Minimalist Dual-OS Developer Portfolio

A responsive, high-performance portfolio website running two interactive operating system environments: **macOS** and **Windows 98**. Ready for zero-config deployment on [Vercel](https://vercel.com).

## Highlights

- **Dual OS Environments**: Seamlessly switch between modern **macOS** (frosted glass, traffic lights, menu bar, dynamic dock) and authentic **Windows 98** (teal desktop, Start menu, 3D beveled borders, taskbar).
- **Interactive Window Manager**: Draggable, minimizable, maximizable, and focusable windows with mouse and touch support.
- **Embedded Apps**:
  - **About Me**: Bio, career history, and background.
  - **Projects**: Filterable project showcases with live preview links and GitHub repositories.
  - **Capabilities**: Categorized technical skills with visual chips.
  - **Interactive Terminal**: Custom shell supporting `help`, `about`, `projects`, `skills`, `theme`, `contact`, and `clear`.
  - **Contact**: Interactive messaging form and social links.
  - **System Preferences**: Instant theme switcher, CRT scanline filter toggle, and synthesized sound toggle.
- **Synthesized Audio**: Procedural retro click and transition sounds via Web Audio API (no heavy audio files, can be muted).
- **Mobile Responsive**: Adapts smoothly to mobile and touch screens.

## Quick Start

### Development

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## Deploying to Vercel

### Option 1: Vercel CLI (Fastest)

```bash
npm i -g vercel
vercel
```

Follow the prompts. Vercel automatically detects the Vite configuration and `vercel.json`.

### Option 2: GitHub Integration

1. Push this repository to GitHub:
   ```bash
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```
2. Open [Vercel Dashboard](https://vercel.com/new).
3. Import your repository.
4. Click **Deploy**. Vercel will build and serve your site globally.

## Customizing Your Content

Edit [src/data/portfolio.ts](file:///home/tinker/Documents/Agent-Projects/vinny/src/data/portfolio.ts) to update your name, bio, skills, projects, and contact channels.
