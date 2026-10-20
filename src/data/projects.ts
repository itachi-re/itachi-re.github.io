import { GITHUB_USER } from './site';

export type CategoryId = 'packaging' | 'docs' | 'config' | 'apps' | 'android' | 'notes';

export interface Category {
  id: CategoryId;
  label: string;
  blurb: string;
}

export interface Project {
  /** GitHub repo name */
  name: string;
  description: string;
  category: CategoryId;
  tags: string[];
  language?: string;
  /** Snapshot (2026-10-20). Refreshed from the GitHub API at runtime when reachable. */
  stars: number;
  /** Snapshot of the last push (ISO date). Refreshed at runtime when reachable. */
  updated: string;
  featured?: boolean;
  /** Package page on the openSUSE Build Service, when the repo ships one */
  obs?: string;
}

export const categories: Category[] = [
  { id: 'packaging', label: 'OBS & packaging', blurb: 'RPM packaging and the automation that keeps it current' },
  { id: 'docs', label: 'Guides & docs', blurb: 'Field notes written for the next person' },
  { id: 'config', label: 'Dotfiles & configs', blurb: 'Version-controlled environments' },
  { id: 'apps', label: 'Apps & tools', blurb: 'Small tools and maintained forks' },
  { id: 'android', label: 'Android', blurb: 'Device tooling, Termux and modules' },
  { id: 'notes', label: 'Study notes', blurb: 'Learning in public' },
];

export const repoUrl = (name: string) => `https://github.com/${GITHUB_USER}/${name}`;
const obs = (pkg: string) => `https://build.opensuse.org/package/show/home:itachi_re/${pkg}`;

// Every original (non-fork) repo worth showing. Descriptions are paraphrased from each README.
export const projects: Project[] = [
  // ── OBS & packaging ──────────────────────────────────────────────
  {
    name: 'obs-auto-trigger',
    description:
      'Watches 100+ upstreams with nvchecker every 6 hours and fires an OBS service run the moment a new version appears. Fails safe, least-privilege by design.',
    category: 'packaging',
    tags: ['nvchecker', 'GitHub Actions', 'OBS', 'Python'],
    language: 'Python',
    stars: 0,
    updated: '2026-10-20',
    featured: true,
  },
  {
    name: 'zypperx',
    description:
      "Parallel package downloads for zypper. Isolated chroot workers sidestep libzypp's global lock, then native zypper does the atomic install.",
    category: 'packaging',
    tags: ['zypper', 'openSUSE', 'concurrency', 'Rich'],
    language: 'Python',
    stars: 1,
    updated: '2026-03-22',
    featured: true,
    obs: obs('zypperx'),
  },
  {
    name: 'ff-dev-obs',
    description:
      "Polls Mozilla's Product Details API every 6 hours and bumps the Firefox Developer Edition package on OBS.",
    category: 'packaging',
    tags: ['Firefox', 'RPM', 'GitHub Actions'],
    stars: 2,
    updated: '2026-10-19',
    obs: obs('ff-dev-edition'),
  },
  {
    name: 'openrgb-obs',
    description:
      'Hourly watcher that spots new OpenRGB commits on GitLab and triggers an OBS rebuild. SHA-tracked, no upstream tokens.',
    category: 'packaging',
    tags: ['OpenRGB', 'obs_scm', 'Tumbleweed'],
    stars: 0,
    updated: '2026-10-19',
    obs: obs('openrgb'),
  },
  {
    name: 'brave-browser-obs',
    description:
      'Update tracker and packaging for Brave Browser on OBS, following official releases without custom patches.',
    category: 'packaging',
    tags: ['Brave', 'RPM', 'automation'],
    language: 'Shell',
    stars: 0,
    updated: '2026-10-17',
    obs: obs('brave-browser'),
  },
  {
    name: 'waydroid-image-obs',
    description:
      'Scrapes the latest Waydroid system and vendor images, rewrites the RPM spec, and lets OBS build them.',
    category: 'packaging',
    tags: ['Waydroid', 'Android', 'scraping'],
    language: 'Python',
    stars: 1,
    updated: '2026-10-15',
    obs: obs('waydroid-image'),
  },
  {
    name: 'android-studio-obs',
    description:
      'Daily-checked Android Studio Beta RPM for OBS, with fallback version detection and a patched Beta product name.',
    category: 'packaging',
    tags: ['Android Studio', 'rpmbuild', 'spec'],
    stars: 0,
    updated: '2026-10-01',
    obs: obs('android-studio'),
  },
  {
    name: 'kernel-copyto',
    description:
      'A kernel-install hook that syncs kernel and initramfs to the EFI partition for systemd-boot and rEFInd setups.',
    category: 'packaging',
    tags: ['kernel-install', 'EFI', 'rEFInd'],
    stars: 0,
    updated: '2025-11-02',
    obs: obs('kernel-copyto'),
  },
  {
    name: 'obs-files',
    description: 'Git LFS-backed home for the large binaries and assets that OBS packages need.',
    category: 'packaging',
    tags: ['Git LFS', 'OBS'],
    language: 'HTML',
    stars: 0,
    updated: '2025-10-29',
  },

  // ── Guides & docs ────────────────────────────────────────────────
  {
    name: 'clean-system-guide',
    description:
      '19 practical Linux guides that explain what each command does instead of asking for blind trust. Distro-agnostic, tested on Tumbleweed.',
    category: 'docs',
    tags: ['Linux', 'sysadmin', 'Shell', 'minimalism'],
    language: 'Shell',
    stars: 7,
    updated: '2026-09-20',
    featured: true,
  },
  {
    name: 'imou-hx21-openwrt',
    description:
      'Field notes for OpenWrt 25.12 on the Imou HX21: flashing, SQM/CAKE, WireGuard, NetBird, firewall hardening and troubleshooting.',
    category: 'docs',
    tags: ['OpenWrt', 'WireGuard', 'SQM', 'nftables'],
    stars: 4,
    updated: '2026-08-17',
  },
  {
    name: 'audio-reference-hub',
    description:
      'An open technical reference for digital audio: sampling, codecs, lossless vs lossy, loudness and LUFS, with SVG and Mermaid diagrams.',
    category: 'docs',
    tags: ['audio', 'codecs', 'FFmpeg', 'Markdown'],
    stars: 0,
    updated: '2026-10-04',
  },
  {
    name: 'openwrt_secure_ssh_guide',
    description:
      "Reach your router's SSH from anywhere through WireGuard and dynamic DNS, without ever exposing the port.",
    category: 'docs',
    tags: ['OpenWrt', 'WireGuard', 'SSH'],
    stars: 1,
    updated: '2025-10-21',
  },
  {
    name: 'kernelconfig',
    description:
      'Curated kernel .config files from XanMod, CachyOS, vanilla and other builds for side-by-side comparison.',
    category: 'docs',
    tags: ['Linux kernel', 'XanMod', 'CachyOS'],
    stars: 0,
    updated: '2026-07-11',
  },
  {
    name: 'codm',
    description: 'Tips, loadouts and grind guides for Call of Duty: Mobile.',
    category: 'docs',
    tags: ['gaming', 'guides'],
    stars: 1,
    updated: '2026-07-19',
  },

  // ── Dotfiles & configs ───────────────────────────────────────────
  {
    name: '.dotfiles',
    description:
      'KDE Plasma on openSUSE, deployed with GNU Stow: zsh and Starship, Neovim, Pywal-synced theming, GTK and Plasma configs.',
    category: 'config',
    tags: ['GNU Stow', 'KDE Plasma', 'zsh', 'Neovim', 'Pywal'],
    stars: 2,
    updated: '2026-10-13',
    featured: true,
  },
  {
    name: 'zsh-tweaks',
    description: 'My daily-driver Zsh and Starship setup, tuned for speed and clarity.',
    category: 'config',
    tags: ['zsh', 'Starship'],
    language: 'Shell',
    stars: 0,
    updated: '2026-07-11',
  },
  {
    name: 'dotfiles-android',
    description: 'Termux dotfiles for a fast, minimal Android setup: MPV, FFmpeg and shell tweaks.',
    category: 'config',
    tags: ['Termux', 'MPV', 'FFmpeg'],
    stars: 2,
    updated: '2026-08-14',
  },

  // ── Apps & tools ─────────────────────────────────────────────────
  {
    name: 'yuki-iptv',
    description:
      'Community-maintained fork of the IPTV player with EPG support, kept alive after upstream was removed. Packaged for OBS.',
    category: 'apps',
    tags: ['PyQt', 'mpv', 'IPTV', 'EPG'],
    language: 'Python',
    stars: 13,
    updated: '2026-10-04',
    featured: true,
    obs: obs('yuki-iptv'),
  },
  {
    name: 'lastfm-scrobbler',
    description: 'Bulk-uploads missing listening history to Last.fm from a CSV file.',
    category: 'apps',
    tags: ['Last.fm', 'CLI'],
    language: 'Python',
    stars: 1,
    updated: '2026-09-23',
  },
  {
    name: 'wallfetch',
    description: 'Userscript that adds one-click, original-resolution downloads to Wallhaven.',
    category: 'apps',
    tags: ['userscript', 'wallpapers'],
    language: 'JavaScript',
    stars: 0,
    updated: '2026-07-20',
  },
  {
    name: 'claude-skills',
    description: 'A personal collection of Claude Skills: reusable workflow instructions for AI agents.',
    category: 'apps',
    tags: ['Claude', 'agents', 'workflows'],
    stars: 0,
    updated: '2026-07-06',
  },

  // ── Android ──────────────────────────────────────────────────────
  {
    name: 'vayu-utils',
    description:
      'Flashing and utility toolkit for the Xiaomi Poco X3 Pro (vayu) across Linux, Windows and Android.',
    category: 'android',
    tags: ['Xiaomi', 'fastboot', 'firmware'],
    language: 'Python',
    stars: 2,
    updated: '2026-09-26',
  },
  {
    name: 'bootanimation-template',
    description:
      'A template for boot-animation modules that install on Magisk, KernelSU and APatch alike, with validation and release automation.',
    category: 'android',
    tags: ['Magisk', 'KernelSU', 'APatch'],
    language: 'Shell',
    stars: 0,
    updated: '2026-08-22',
  },
  {
    name: 'rmx3063',
    description: 'Firmware decryption and bootloader-unlock guide and scripts for the Realme RMX3063 on Linux.',
    category: 'android',
    tags: ['Realme', 'MediaTek', 'firmware'],
    language: 'Shell',
    stars: 0,
    updated: '2025-10-24',
  },
  {
    name: 'termux-customization',
    description: 'A step-by-step guide to a polished, productive Termux terminal.',
    category: 'android',
    tags: ['Termux', 'guide'],
    stars: 1,
    updated: '2025-12-17',
  },

  // ── Study notes ──────────────────────────────────────────────────
  {
    name: 'butex-notes',
    description:
      'B.Sc. Textile Engineering (Fabric Engineering) notes at BUTEX: Markdown and LaTeX, 815 notes, 500 diagrams, solved question banks.',
    category: 'notes',
    tags: ['Markdown', 'LaTeX', 'textile engineering'],
    language: 'HTML',
    stars: 8,
    updated: '2026-10-18',
    featured: true,
  },
  {
    name: 'c-learning-notes',
    description: 'Notes, snippets and exercises from learning C, with spellcheck in CI.',
    category: 'notes',
    tags: ['C', 'vim'],
    language: 'Shell',
    stars: 0,
    updated: '2026-07-29',
  },
  {
    name: 'learn-web-hacking',
    description: 'A structured roadmap for learning web application security from zero.',
    category: 'notes',
    tags: ['web security', 'roadmap'],
    stars: 0,
    updated: '2026-07-04',
  },
  {
    name: 'picoCTF-notes',
    description: 'Notes taken while solving picoCTF challenges.',
    category: 'notes',
    tags: ['CTF', 'picoCTF'],
    stars: 0,
    updated: '2026-01-21',
  },
];

export const languageColors: Record<string, string> = {
  Python: '#3572A5',
  Shell: '#89e051',
  JavaScript: '#f1e05a',
  HTML: '#e34c26',
  TypeScript: '#3178c6',
  C: '#8a8a8a',
};
