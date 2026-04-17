import { useEffect, useRef } from 'react';
import { Cpu, Code2, Lock, Network, BarChart3 } from 'lucide-react';

const dailyDrivers = [
  { name: 'openSUSE Tumbleweed', active: true },
  { name: 'Arch Linux', active: true },
  { name: 'Kali Linux', active: true },
];

const tools = [
  'Hyprland', 'Sway', 'Neovim', 'Ghostty', 'Zsh', 'rEFInd', 'Btrfs', 'Pywal'
];

const exploring = [
  { icon: Cpu, label: 'wayland_compositor_internals' },
  { icon: Lock, label: 'binary_exploitation' },
  { icon: Network, label: 'network_protocol_analysis' },
  { icon: Code2, label: 'c_systems_programming' },
  { icon: BarChart3, label: 'low_level_performance' },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.observe');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-6 relative"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="observe">
          <h2 className="section-head">
            <span className="text-hacker-blue">▸</span> init:{' '}
            <span className="gradient-text">identity</span>
          </h2>
          <p className="section-sub">$ cat ./identity.c — loading core modules...</p>
        </div>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {/* Core Identity Card */}
          <div className="liquid-glass glass-hover p-6 observe">
            <div className="text-hacker-comment text-xs mb-5 font-mono">
              /* core identity */
            </div>
            <div className="space-y-4 font-mono text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-hacker-gold min-w-[120px]">.handle</span>
                <span className="text-hacker-muted">=</span>
                <span className="text-hacker-blue">"itachi"</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-hacker-gold min-w-[120px]">.role</span>
                <span className="text-hacker-muted">=</span>
                <span className="text-hacker-blue">"systems enthusiast"</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-hacker-gold min-w-[120px]">.reads_source</span>
                <span className="text-hacker-muted">=</span>
                <span className="text-hacker-blue">
                  true <span className="text-hacker-comment">/* always */</span>
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-hacker-gold min-w-[120px]">.builds_minimal</span>
                <span className="text-hacker-muted">=</span>
                <span className="text-hacker-blue">true</span>
              </div>
            </div>
          </div>

          {/* Daily Driver Stack Card */}
          <div className="liquid-glass glass-hover p-6 observe">
            <div className="text-hacker-comment text-xs mb-5 font-mono">
              /* daily driver stack */
            </div>
            <div className="space-y-3 mb-5">
              {dailyDrivers.map((driver) => (
                <div key={driver.name} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-hacker-success animate-pulse-glow" />
                  <span className="text-sm">{driver.name}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-hacker-blue/10 pt-4 flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span key={tool} className="tag">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Currently Exploring Card */}
        <div className="liquid-glass glass-hover p-6 observe">
          <div className="text-hacker-comment text-xs mb-5 font-mono">
            /* currently_exploring[] = &#123; &#125;
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {exploring.map((item) => (
              <div key={item.label} className="explore-item">
                <item.icon size={18} className="text-hacker-blue" />
                <span className="text-hacker-blue">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="text-hacker-comment text-xs mt-5 font-mono">/* end */</div>
        </div>
      </div>
    </section>
  );
}
