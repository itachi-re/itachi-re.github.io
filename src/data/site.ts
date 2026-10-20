// Single source of truth for links used across the site.
export const GITHUB_USER = 'itachi-re';

export const links = {
  github: 'https://github.com/itachi-re',
  gitlab: 'https://gitlab.com/itachi_re',
  codeberg: 'https://codeberg.org/itachi-re',
  telegram: 'https://t.me/itachi_re',
  obs: 'https://build.opensuse.org/project/show/home:itachi_re',
  email: 'itachi_re@protonmail.com',
  source: 'https://github.com/itachi-re/itachi-re.github.io',
} as const;

// Snapshot numbers taken from the repos on 2026-10-20 (see README "Updating the data").
export const stats = {
  trackedPackages: 100, // obs-auto-trigger README: "100+ packages"
  originalRepos: 35,
  publicRepos: 63,
  guides: 19, // clean-system-guide
  notes: 815, // butex-notes: Markdown notes
  diagrams: 500, // butex-notes: SVG/PNG figures
} as const;
