# vinny — Minimalist Desktop Portfolio

A brutalist, minimalist digital desktop portfolio inspired by Kendrick Lamar's [oklama.com](https://oklama.com/). Built with React 19, TypeScript, Tailwind CSS, and Vite. Configured for zero-config deployment to **GitHub Pages**.

## Aesthetic & Architecture

- **Oklama Brutalist Aesthetic**: High-contrast monospace typography (`ui-monospace`), crisp pixelated retro desktop folders (manila, black, and gray), polaroid desktop sticker, and subtle signature `#cd3f25` brick-red hover accents.
- **Draggable Desktop Artifacts**: Pick up and reposition folders, documents, audio tapes, and terminal scripts anywhere on screen with mouse or touch (`data-drag="true"`). Includes a `[tidy]` action to restore canonical positions.
- **Documents & Apps**:
  - **`nu thoughts`**: Statement letter styled directly after oklama's press release manifesto with back navigation, timestamp, personal prose, and 35mm photo insert.
  - **`selected works`**: Brutalist directory table with category filters, project specs, performance metrics, live demo, and GitHub links.
  - **`archive`**: Inventory of micro-tools, open-source libraries, and past experiments.
  - **`polaroid.raw`**: Analog 35mm contact sheet viewer with film reticles and location notes.
  - **`resume.txt`**: Monospace plain-text CV format with career records and core engineering competencies.
  - **`memo_01.wav`**: In-browser ambient synthesizer generating gentle lo-fi tape drones using native Web Audio API (zero external audio files).
  - **`terminal.sh`**: Minimalist interactive command shell (`help`, `ls`, `whoami`, `cat thoughts`, `projects`, `contact`, `clear`).
- **Contrast Toggle**: Switch between stark off-white and inverted deep-black canvas (`[light]` / `[invert]`).
- **Zero AI-Slop**: No glowing gradients, fake 3D glass, or bloated dependencies. 100% static, fast, accessible (WCAG AA).

## Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev
```

Visit `http://localhost:5173`.

## Production Build

```bash
npm run build
npm run preview
```

Static build outputs directly to `./dist` with relative paths (`base: './'`), ready for any static hosting.

## GitHub Pages Deployment

### Option 1: Automated GitHub Actions (Recommended)

A GitHub Actions workflow is preconfigured at `.github/workflows/deploy.yml`.

1. Push this repository to GitHub:
   ```bash
   git remote add origin https://github.com/<username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
2. In your GitHub repository:
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Every push to `main` will build and publish the site automatically.

### Option 2: Manual gh-pages Branch

```bash
npm run build
npx gh-pages -d dist
```

## Customizing Your Content

All portfolio information, statement text, project listings, contact URLs, and skill tags are centralized in:

- [`src/data/portfolio.ts`](src/data/portfolio.ts)

Edit that file to customize your name, bio, manifesto, project catalog, and links.
