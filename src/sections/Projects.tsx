import { useEffect, useRef } from 'react';
import { ArrowUpRight, Wrench, BookOpen, Zap } from 'lucide-react';

const projects = [
  {
    name: 'dotfiles',
    icon: Wrench,
    status: 'production_ready',
    statusColor: '#3fb950',
    description:
      'Complete Linux environment, version-controlled life. Every config line has a reason — nothing is there by default.',
    tags: ['Hyprland', 'Sway', 'Neovim', 'Ghostty', 'Pywal', 'Zsh'],
    href: 'https://github.com/itachi-re/dotfiles',
  },
  {
    name: 'notes-c',
    icon: BookOpen,
    status: 'ongoing',
    statusColor: '#FFD700',
    description:
      'Structured C programming knowledge base. Organized from first principles — every abstraction traced back to the metal.',
    tags: ['C', 'Systems', 'Low-level', 'Kernel'],
    href: 'https://github.com/itachi-re/notes-c',
  },
  {
    name: 'scripts',
    icon: Zap,
    status: 'active',
    statusColor: '#58a6ff',
    description:
      'System automation that earns its place. No bloat. No magic. Every line is readable.',
    tags: ['Bash', 'Zsh', 'Automation', 'Workflow'],
    href: 'https://github.com/itachi-re/scripts',
  },
];

export function Projects() {
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
      id="projects"
      ref={sectionRef}
      className="py-24 px-6 relative"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="observe">
          <h2 className="section-head">
            <span className="text-hacker-blue">▸</span> ls -la{' '}
            <span className="gradient-text">./projects</span>
          </h2>
          <p className="section-sub">$ total 3 — drwxr-xr-x itachi-re</p>
        </div>

        {/* Project Cards */}
        <div className="flex flex-col gap-5 mb-6">
          {projects.map((project, index) => (
            <a
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="observe block"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="liquid-glass glass-hover project-card group">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <project.icon
                      size={24}
                      className="text-hacker-blue group-hover:text-hacker-gold transition-colors duration-300"
                    />
                    <span className="font-display font-bold text-lg text-hacker-text">
                      {project.name}
                    </span>
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
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowUpRight
                  size={28}
                  className="text-hacker-blue opacity-40 group-hover:opacity-100 group-hover:text-hacker-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0"
                />
              </div>
            </a>
          ))}
        </div>

        {/* GitHub Activity Graph */}
        <div className="liquid-glass p-6 observe">
          <div className="text-hacker-comment text-xs mb-5 font-mono">
            /* github activity graph */
          </div>
          <img
            src="https://github-readme-activity-graph.vercel.app/graph?username=itachi-re&bg_color=00000000&color=FFD700&line=58a6ff&point=FFD700&hide_border=true"
            alt="GitHub Activity"
            className="w-full rounded-lg opacity-90 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </div>
    </section>
  );
}
