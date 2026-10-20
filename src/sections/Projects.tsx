import { useState } from 'react';
import { ArrowUpRight, Wrench, BookOpen, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useReveal } from './useMotion';

const GITHUB_USER = 'itachi-re';
const GITHUB_URL = `https://github.com/${GITHUB_USER}`;
const ACTIVITY_GRAPH_URL =
  `https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USER}` +
  '&bg_color=00000000&color=FFD700&line=58a6ff&point=FFD700&hide_border=true';

interface Project {
  name: string;
  icon: LucideIcon;
  status: string;
  statusColor: string;
  description: string;
  tags: string[];
}

const projects: Project[] = [
  {
    name: 'dotfiles',
    icon: Wrench,
    status: 'production_ready',
    statusColor: '#3fb950',
    description:
      'Complete Linux environment, version-controlled life. Every config line has a reason — nothing is there by default.',
    tags: ['Hyprland', 'Sway', 'Neovim', 'Ghostty', 'Pywal', 'Zsh'],
  },
  {
    name: 'notes-c',
    icon: BookOpen,
    status: 'ongoing',
    statusColor: '#FFD700',
    description:
      'Structured C programming knowledge base. Organized from first principles — every abstraction traced back to the metal.',
    tags: ['C', 'Systems', 'Low-level', 'Kernel'],
  },
  {
    name: 'scripts',
    icon: Zap,
    status: 'active',
    statusColor: '#58a6ff',
    description: 'System automation that earns its place. No bloat. No magic. Every line is readable.',
    tags: ['Bash', 'Zsh', 'Automation', 'Workflow'],
  },
];

/** The graph comes from a free third-party service that is sometimes down,
 *  so it fades in when loaded and falls back to a plain link when it fails. */
function ActivityGraph() {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  if (status === 'error') {
    return (
      <p className="text-hacker-muted text-sm font-mono">
        Activity graph is unavailable right now.{' '}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="text-hacker-blue underline underline-offset-4"
        >
          View activity on GitHub
        </a>
      </p>
    );
  }

  return (
    <div className="min-h-[8rem]">
      <img
        src={ACTIVITY_GRAPH_URL}
        alt={`GitHub contribution activity for ${GITHUB_USER}`}
        loading="lazy"
        decoding="async"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        className={`w-full rounded-lg transition-opacity duration-300 ${
          status === 'loaded' ? 'opacity-90 hover:opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

export function Projects() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section
      id="projects"
      ref={sectionRef}
      aria-labelledby="projects-heading"
      className="py-24 px-6 relative"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="observe">
          <h2 id="projects-heading" className="section-head">
            <span className="text-hacker-blue">▸</span> ls -la{' '}
            <span className="gradient-text">./projects</span>
          </h2>
          <p className="section-sub">
            $ total {projects.length} — drwxr-xr-x {GITHUB_USER}
          </p>
        </div>

        <ul className="flex flex-col gap-5 mb-6">
          {projects.map((project, index) => (
            <li
              key={project.name}
              className="observe"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <a
                href={`${GITHUB_URL}/${project.name}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.name} — ${project.status.replace('_', ' ')} (opens on GitHub)`}
                className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hacker-blue"
              >
                <div className="liquid-glass glass-hover project-card group">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <project.icon
                        size={24}
                        aria-hidden="true"
                        className="text-hacker-blue group-hover:text-hacker-gold transition-colors duration-300"
                      />
                      <h3 className="font-display font-bold text-lg text-hacker-text">
                        {project.name}
                      </h3>
                      <span
                        className="status-badge font-mono"
                        style={{
                          background: `${project.statusColor}20`,
                          color: project.statusColor,
                          border: `1px solid ${project.statusColor}40`,
                        }}
                      >
                        {project.status}
                      </span>
                    </div>
                    <p className="text-hacker-muted text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <li key={tag} className="tag">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ArrowUpRight
                    size={28}
                    aria-hidden="true"
                    className="text-hacker-blue opacity-40 group-hover:opacity-100 group-hover:text-hacker-gold motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0"
                  />
                </div>
              </a>
            </li>
          ))}
        </ul>

        <div className="liquid-glass p-6 observe">
          <div className="text-hacker-comment text-xs mb-5 font-mono">/* github activity graph */</div>
          <ActivityGraph />
        </div>
      </div>
    </section>
  );
}
