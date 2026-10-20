import { BookOpen, FileText, GitBranch, Package } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { stats } from '@/data/site';
import { useCountUp, useInViewOnce, useReveal } from './useMotion';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  sub: string;
  icon: LucideIcon;
}

const items: Stat[] = [
  { value: stats.trackedPackages, suffix: '+', label: 'packages auto-tracked', sub: 'upstream checks every 6 h', icon: Package },
  { value: stats.originalRepos, suffix: '', label: 'original repos', sub: `${stats.publicRepos} public incl. forks`, icon: GitBranch },
  { value: stats.guides, suffix: '', label: 'Linux guides', sub: 'in clean-system-guide', icon: BookOpen },
  { value: stats.notes, suffix: '', label: 'study notes', sub: `+ ${stats.diagrams} diagrams`, icon: FileText },
];

function StatTile({ item, index, active }: { item: Stat; index: number; active: boolean }) {
  const value = useCountUp(item.value, active, index * 80, 1200);

  return (
    <li className="liquid-glass p-5 observe" style={{ transitionDelay: `${index * 80}ms` }}>
      <item.icon size={16} className="text-hacker-blue mb-3" aria-hidden="true" />
      {/* animated number is hidden from assistive tech; the final value is read once */}
      <span className="stat-num" aria-hidden="true">
        {value}
        {item.suffix}
      </span>
      <span className="sr-only">
        {item.value}
        {item.suffix}
      </span>
      <div className="text-sm text-hacker-text mt-2">{item.label}</div>
      <div className="text-xs font-mono text-hacker-muted mt-1">{item.sub}</div>
    </li>
  );
}

export function Stats() {
  const sectionRef = useReveal<HTMLElement>();
  const { ref: gridRef, inView } = useInViewOnce<HTMLUListElement>(0.3);

  return (
    <section ref={sectionRef} aria-label="At a glance" className="px-6 pb-8 -mt-6 relative" style={{ zIndex: 1 }}>
      <ul ref={gridRef} className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <StatTile key={item.label} item={item} index={i} active={inView} />
        ))}
      </ul>
    </section>
  );
}
