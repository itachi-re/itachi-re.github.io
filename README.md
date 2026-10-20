# itachi-re.github.io

Personal site of **itachi_re** — live at <https://itachi-re.github.io/>.

A single-page, terminal-flavoured portfolio: React 19 + TypeScript + Tailwind CSS 3 on Vite 7, deployed to GitHub Pages by GitHub Actions.

## Features

- **Packaging showcase** — the `obs-auto-trigger` pipeline, tracked upstreams, and the per-package watchers feeding `home:itachi_re` on OBS
- **Project explorer** — every original repo with search, category filters and sorting; featured cards on top
- **Live repo stats** — stars and last-push dates refresh from the GitHub API (cached 6 h in `localStorage`); falls back silently to the bundled snapshot
- **Command palette** — <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>K</kbd> or <kbd>/</kbd> to jump to a section, repo or link
- **Dark / light theme** — persisted, applied before first paint (no flash)
- **Accessibility & performance** — skip link, focus rings, `prefers-reduced-motion` respected, particle canvas pauses in background tabs, fonts no longer block rendering
- **SEO** — meta description, Open Graph / Twitter card, JSON-LD, canonical URL, `robots.txt`, `sitemap.xml`

## Development

```bash
npm ci
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

Node 20+ is expected (the workflow uses Node 20).

## Project layout

```
src/
├── App.tsx                  page composition
├── sections/                Hero, Stats, About, LearningGoals, Packaging, Projects, Philosophy, Contact
├── components/              Navigation, CommandPalette, ScrollUI, ParticleBackground, Footer, ui/ (shadcn)
├── data/
│   ├── projects.ts          ← repo list, categories, descriptions
│   ├── packages.ts          ← tracked OBS packages + watcher repos
│   └── site.ts              ← links and headline numbers
├── hooks/                   use-reveal, use-theme, use-reduced-motion, use-live-repos
└── lib/                     format helpers, palette event helpers
public/                      favicon.svg, og-image.png, robots.txt, sitemap.xml
```

## Updating the data

Most content changes are edits to files in `src/data/` — no component code needed.

- **New repo?** Add an entry to `projects` in `src/data/projects.ts` (`featured: true` pins it to the top grid). Stars and dates refresh live, so the snapshot values only matter offline.
- **New OBS package?** Add its name to a group in `src/data/packages.ts`. Every name links to `build.opensuse.org/package/show/home:itachi_re/<name>`, so it must match the OBS package name.
- **Headline numbers** (packages, guides, notes) live in `src/data/site.ts`. They are snapshots taken from the repos' own READMEs.
- **Social card** — `public/og-image.png` is 1200×630. Regenerate it if the tagline changes.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds with `npm run build` and publishes `dist/` to GitHub Pages. `dist/` is git-ignored — CI builds it fresh.
