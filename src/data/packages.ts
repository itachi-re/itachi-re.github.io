// Upstreams tracked by obs-auto-trigger (nvchecker.toml, snapshot 2026-10-20).
// Each name is also the package name in the OBS project home:itachi_re.
export const TRACKED_TOTAL = 116;

export interface PackageGroup {
  label: string;
  names: string[];
}

export const packageGroups: PackageGroup[] = [
  {
    label: 'Browsers & chat',
    names: ['brave-browser-beta', 'zen-browser', 'floorp', 'firedragon', 'vivaldi', 'webcord', 'telegram'],
  },
  {
    label: 'Dev & Android tools',
    names: [
      'codium', 'zed', 'gradle', 'codeblocks', 'arduino-ide', 'android-ndk', 'android-build-tools',
      'android-apktool', 'scrcpy', 'qtscrcpy', 'rkdeveloptool',
    ],
  },
  {
    label: 'Media',
    names: ['yt-dlp', 'ani-cli', 'krita', 'iptvnator', 'hypnotix', 'megacubo', 'lrcget', 'mangayomi', 'komikku'],
  },
  {
    label: 'System & kernel',
    names: ['kernel-xanmod-v3', 'rEFInd', 'zypperx', 'zypperoni', 'fastfetch', 'bleachbit', 'iotop', 'ventoy', 'gearlever'],
  },
  {
    label: 'Waydroid stack',
    names: ['waydroid', 'waydroid-image', 'anbox-modules', 'libgbinder', 'libglibutil', 'python-gbinder', 'waydroid-magisk'],
  },
  {
    label: 'Gaming',
    names: ['shadps4', 'hydra-launcher', 'gamescope', 'protonup-qt', 'ProtonPlus', 'faugus-launcher', 'rbdoom3bfg', 'winboat'],
  },
  {
    label: 'Desktop & theming',
    names: [
      'plasma6-theme-klassy', 'plasma-panel-colorizer', 'kde-material-you-colors', 'plasma-wallpaper-effects',
      'python3-pywal16', 'zsh-autosuggestions', 'zsh-syntax-highlighting', 'nerd-fonts', 'monaspace-fonts',
    ],
  },
  {
    label: 'Network & remote',
    names: ['cloudflare-warp', 'wgcf', 'wg-info', 'rustdesk', 'remmina', 'freerdp', 'qBittorrent-Enhanced-Edition', 'jdownloader2'],
  },
  {
    label: 'Notes & office',
    names: ['obsidian', 'joplin-desktop', 'onlyoffice-desktopeditors', 'stirling-pdf'],
  },
];

export const SHOWN_TOTAL = packageGroups.reduce((sum, g) => sum + g.names.length, 0);

export const obsPackageUrl = (name: string) =>
  `https://build.opensuse.org/package/show/home:itachi_re/${encodeURIComponent(name)}`;

// Single-package watchers that feed OBS directly.
export const watchers = [
  { repo: 'obs-auto-trigger', target: '100+ packages', cadence: 'every 6 h' },
  { repo: 'ff-dev-obs', target: 'Firefox Developer Edition', cadence: 'every 6 h' },
  { repo: 'openrgb-obs', target: 'OpenRGB (git snapshots)', cadence: 'hourly' },
  { repo: 'brave-browser-obs', target: 'Brave Browser', cadence: 'daily' },
  { repo: 'android-studio-obs', target: 'Android Studio Beta', cadence: 'daily' },
  { repo: 'waydroid-image-obs', target: 'Waydroid images', cadence: 'scheduled' },
];
