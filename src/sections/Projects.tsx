import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  Package,
  Search,
  Smartphone,
  Star,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { useReveal } from "./useMotion";
import { useLiveRepos } from '@/hooks/use-live-repos';
import { useTheme, type Theme } from '@/hooks/use-theme';
import { timeAgo } from '@/lib/format';
import { GITHUB_USER, links, stats } from '@/data/site';
import { categories, languageColors, projects, repoUrl, type CategoryId, type Project } from '@/data/projects';

const categoryIcon: Record<CategoryId, LucideIcon> = {
  packaging: Package,
  docs: BookOpen,
  config: Wrench,
  apps: Zap,
  android: Smartphone,
  notes: GraduationCap,
};

const categoryLabel = Object.fromEntries(categories.map((c) => [c.id, c.label])) as Record<CategoryId, string>;

type SortKey = 'featured' | 'recent' | 'stars';
const COLLAPSED_LIMIT = 9;

function Meta({ project }: { project: Project }) {
  return (
    <div className="repo-meta">
      {project.language && (
        <span className="inline-flex items-center">
          <span className="lang-dot" style={{ background: languageColors[project.language] ?? '#8b949e' }} />
          {project.language}
        </span>
      )}
      {project.stars > 0 && (
        <span className="inline-flex items-center gap-1">
          <Star size={12} aria-hidden="true" /> {project.stars}
          <span className="sr-only"> stars</span>
        </span>
      )}
      <span>updated {timeAgo(project.updated)}</span>
      {project.obs && (
        <a
          href={project.obs}
          target="_blank"
          rel="noreferrer"
          className="relative z-10 ml-auto inline-flex items-center gap-1 text-hacker-success hover:text-hacker-gold transition-colors"
        >
          <Package size={12} aria-hidden="true" /> OBS
        </a>
      )}
    </div>
  );
}

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const Icon = categoryIcon[project.category];
  return (
    <article
      className="liquid-glass glass-hover group relative observe"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="repo-card !p-6">
        <div className="flex items-start gap-3">
          <Icon size={22} className="text-hacker-blue mt-0.5 group-hover:text-hacker-gold transition-colors duration-300" />
          <div className="min-w-0 flex-1">
            <a
              href={repoUrl(project.name)}
              target="_blank"
              rel="noreferrer"
              className="font-display font-bold text-lg text-hacker-text after:absolute after:inset-0 after:content-['']"
            >
              {project.name}
            </a>
            <div className="text-[11px] font-mono text-hacker-muted mt-0.5">{categoryLabel[project.category]}</div>
          </div>
          <ArrowUpRight
            size={22}
            className="text-hacker-blue opacity-40 group-hover:opacity-100 group-hover:text-hacker-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0"
            aria-hidden="true"
          />
        </div>
        <p className="text-hacker-muted text-sm leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <Meta project={project} />
      </div>
    </article>
  );
}

function RepoCard({ project, index }: { project: Project; index: number }) {
  const Icon = categoryIcon[project.category];
  return (
    <article
      className="liquid-glass glass-hover group relative animate-fade-up"
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms`, animationFillMode: 'backwards' }}
    >
      <div className="repo-card">
        <div className="flex items-center gap-2.5">
          <Icon size={16} className="text-hacker-blue flex-shrink-0" aria-hidden="true" />
          <a
            href={repoUrl(project.name)}
            target="_blank"
            rel="noreferrer"
            className="font-mono font-semibold text-sm text-hacker-text truncate group-hover:text-hacker-blue transition-colors after:absolute after:inset-0 after:content-['']"
          >
            {project.name}
          </a>
        </div>
        <p className="text-hacker-muted text-xs leading-relaxed line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag !text-[10px] !py-0.5 !px-2.5">
              {tag}
            </span>
          ))}
        </div>
        <Meta project={project} />
      </div>
    </article>
  );
}

/** The graph comes from a free third-party service that is sometimes down, so it
 *  fades in when loaded and falls back to a plain link when it fails. */
function ActivityGraph({ theme }: { theme: Theme }) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const colors =
    theme === 'light'
      ? 'color=9a6700&line=0969da&point=9a6700'
      : 'color=FFD700&line=58a6ff&point=FFD700';

  if (status === 'error') {
    return (
      <p className="text-hacker-muted text-sm font-mono">
        Activity graph is unavailable right now.{' '}
        <a href={links.github} target="_blank" rel="noreferrer" className="text-hacker-blue underline underline-offset-4">
          View activity on GitHub
        </a>
      </p>
    );
  }

  return (
    <div className="min-h-[8rem]">
      <img
        src={`https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USER}&bg_color=00000000&${colors}&hide_border=true`}
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
  const ref = useReveal<HTMLElement>();
  const { theme } = useTheme();
  const { projects: all, isLive } = useLiveRepos(projects);

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryId | 'all'>('all');
  const [sort, setSort] = useState<SortKey>('featured');
  const [expanded, setExpanded] = useState(false);

  const featured = useMemo(() => all.filter((p) => p.featured), [all]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = all.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      if (!q) return true;
      return [p.name, p.description, p.language ?? '', ...p.tags].join(' ').toLowerCase().includes(q);
    });
    const byRecent = (a: Project, b: Project) => b.updated.localeCompare(a.updated);
    return [...list].sort((a, b) => {
      if (sort === 'stars') return b.stars - a.stars || byRecent(a, b);
      if (sort === 'featured') return Number(!!b.featured) - Number(!!a.featured) || byRecent(a, b);
      return byRecent(a, b);
    });
  }, [all, query, category, sort]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: all.length };
    all.forEach((p) => {
      c[p.category] = (c[p.category] ?? 0) + 1;
    });
    return c;
  }, [all]);

  const unlimited = expanded || query.trim() !== '' || category !== 'all';
  const visible = unlimited ? filtered : filtered.slice(0, COLLAPSED_LIMIT);
  const hidden = filtered.length - visible.length;

  return (
    <section
      id="projects"
      ref={ref}
      aria-labelledby="projects-heading"
      className="py-24 px-6 relative"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="observe">
          <h2 id="projects-heading" className="section-head">
            <span className="text-hacker-blue">▸</span> ls -la <span className="gradient-text">./projects</span>
          </h2>
          <p className="section-sub">
            $ total {all.length} — drwxr-xr-x {GITHUB_USER}
            {isLive && (
              <span className="ml-3 whitespace-nowrap">
                <span className="live-dot" />
                live from GitHub
              </span>
            )}
          </p>
        </div>

        {/* Featured */}
        <div className="grid md:grid-cols-2 gap-5 mb-14">
          {featured.map((project, i) => (
            <FeaturedCard key={project.name} project={project} index={i} />
          ))}
        </div>

        {/* Explorer */}
        <div className="observe mb-6">
          <div className="text-hacker-comment text-xs mb-4 font-mono">/* explore everything */</div>

          <div className="grid sm:grid-cols-[1fr_200px] gap-3 mb-4">
            <label className="relative block">
              <span className="sr-only">Search repositories</span>
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-hacker-muted pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="grep repos… (name, tag, language)"
                className="field !pl-10"
                autoComplete="off"
                spellCheck={false}
              />
            </label>
            <label className="block">
              <span className="sr-only">Sort repositories</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="field">
                <option value="featured">sort: featured</option>
                <option value="recent">sort: recently updated</option>
                <option value="stars">sort: most starred</option>
              </select>
            </label>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            <button type="button" className="chip" aria-pressed={category === 'all'} onClick={() => setCategory('all')}>
              all <span className="count">{counts.all}</span>
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                className="chip"
                aria-pressed={category === c.id}
                title={c.blurb}
                onClick={() => setCategory(c.id)}
              >
                {c.label} <span className="count">{counts[c.id] ?? 0}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs font-mono text-hacker-muted mb-4" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
        </p>

        {visible.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {visible.map((project, i) => (
              <RepoCard key={project.name} project={project} index={i} />
            ))}
          </div>
        ) : (
          <div className="liquid-glass p-8 text-center font-mono text-sm text-hacker-muted mb-6">
            $ grep: no repos match “{query}”
          </div>
        )}

        {hidden > 0 && (
          <div className="text-center mb-10">
            <button type="button" className="btn-ghost !py-3 !px-6 !text-[13px]" onClick={() => setExpanded(true)}>
              show {hidden} more
            </button>
          </div>
        )}

        <p className="text-xs font-mono text-hacker-comment mb-10 leading-relaxed">
          /* original work only. The other {stats.publicRepos - stats.originalRepos} public repos are forks and mirrors I keep for
          reference — they’re all on{' '}
          <a href={links.github} target="_blank" rel="noreferrer" className="text-hacker-blue hover:text-hacker-gold">
            GitHub
          </a>
          . */
        </p>

        {/* GitHub Activity Graph */}
        <div className="liquid-glass p-6 observe">
          <div className="text-hacker-comment text-xs mb-5 font-mono">/* github activity graph */</div>
          <ActivityGraph key={theme} theme={theme} />
        </div>
      </div>
    </section>
  );
}
