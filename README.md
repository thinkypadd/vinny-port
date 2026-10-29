# vinny

```
[desktop]
├── nu thoughts      // statement & manifesto
├── selected works   // systems, web & low-level projects
├── archive          // prototypes & tools
├── polaroid.raw     // 35mm contact sheet
├── resume.txt       // competencies & record
├── memo_01.wav      // in-browser lo-fi synthesizer
└── terminal.sh      // interactive shell
```

A minimalist, brutalist desktop portfolio inspired by Kendrick Lamar’s [oklama.com](https://oklama.com/). Zero synthetic noise, raw monospace typography, draggable desktop artifacts, and zero-config deployment to **GitHub Pages**.

---

### 01. RUN

```bash
# install dependencies
npm install

# launch dev server (http://localhost:5173)
npm run dev
```

### 02. BUILD

```bash
# compile static bundle to ./dist
npm run build

# preview local production build
npm run preview
```

### 03. DEPLOY // GITHUB PAGES

Configured for native GitHub Actions deployment via `.github/workflows/deploy.yml`.

1. Push to GitHub:
   ```bash
   git remote add origin https://github.com/<username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
2. In repository settings:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, choose **GitHub Actions**.
   - Site deploys automatically on push to `main`.

### 04. CONFIGURE

All data, manifesto paragraphs, projects, archive lists, and contact links reside in a single file:

```
src/data/portfolio.ts
```

---

```
spec //
  engine   : react 19 + vite 6
  styles   : tailwind css + pure monospace
  audio    : native webaudio api (zero external assets)
  modes    : stark light / inverted dark
  paths    : relative ('./') for any cdn or subpath
```
