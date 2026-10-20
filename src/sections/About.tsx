import { Cpu, Code2, Lock, Network, BarChart3 } from 'lucide-react';
import { useReveal } from './useMotion';

const identity: { key: string; value: string; comment?: string }[] = [
  { key: '.handle', value: '"itachi"' },
  { key: '.role', value: '"systems enthusiast"' },
  { key: '.reads_source', value: 'true', comment: '/* always */' },
  { key: '.builds_minimal', value: 'true' },
];

const dailyDrivers = [
  { name: 'openSUSE Tumbleweed', active: true },
  { name: 'Arch Linux', active: true },
  { name: 'Kali Linux', active: true },
];

const tools = ['Hyprland', 'Sway', 'Neovim', 'Ghostty', 'Zsh', 'rEFInd', 'Btrfs', 'Pywal'];

const exploring = [
  { icon: Cpu, label: 'wayland_compositor_internals' },
  { icon: Lock, label: 'binary_exploitation' },
  { icon: Network, label: 'network_protocol_analysis' },
  { icon: Code2, label: 'c_systems_programming' },
  { icon: BarChart3, label: 'low_level_performance' },
];

export function About() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="py-24 px-6 relative"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="observe">
          <h2 id="about-heading" className="section-head">
            <span className="text-hacker-blue">▸</span> init:{' '}
            <span className="gradient-text">identity</span>
          </h2>
          <p className="section-sub">$ cat ./identity.c — loading core modules...</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {/* Core identity */}
          <div className="liquid-glass glass-hover p-6 observe">
            <div className="text-hacker-comment text-xs mb-5 font-mono">/* core identity */</div>
            <div className="space-y-4 font-mono text-sm">
              {identity.map(({ key, value, comment }) => (
                <div key={key} className="flex flex-wrap items-center gap-2">
                  <span className="text-hacker-gold min-w-[120px]">{key}</span>
                  <span className="text-hacker-muted" aria-hidden="true">=</span>
                  <span className="text-hacker-blue">
                    {value}
                    {comment && <span className="text-hacker-comment"> {comment}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Daily driver stack */}
          <div className="liquid-glass glass-hover p-6 observe">
            <div className="text-hacker-comment text-xs mb-5 font-mono">/* daily driver stack */</div>
            <ul className="space-y-3 mb-5">
              {dailyDrivers.map(({ name, active }) => (
                <li key={name} className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={`w-2 h-2 rounded-full ${
                      active
                        ? 'bg-hacker-success animate-pulse-glow motion-reduce:animate-none'
                        : 'bg-hacker-muted'
                    }`}
                  />
                  <span className="text-sm">{name}</span>
                  <span className="sr-only">{active ? '(in daily use)' : '(not in use)'}</span>
                </li>
              ))}
            </ul>
            <ul className="border-t border-hacker-blue/10 pt-4 flex flex-wrap gap-2">
              {tools.map((tool) => (
                <li key={tool} className="tag">
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Currently exploring */}
        <div className="liquid-glass glass-hover p-6 observe">
          <div className="text-hacker-comment text-xs mb-5 font-mono">
            {'/* currently_exploring[] = { */'}
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {exploring.map(({ icon: Icon, label }) => (
              <li key={label} className="explore-item">
                <Icon size={18} className="text-hacker-blue" aria-hidden="true" />
                <span className="text-hacker-blue">{label}</span>
              </li>
            ))}
          </ul>
          <div className="text-hacker-comment text-xs mt-5 font-mono">{'/* } */'}</div>
        </div>
      </div>
    </section>
  );
}
