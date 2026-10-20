import { Fragment } from 'react';
import { ArrowUpRight, Clock, Globe, Hammer, Lock, Package, Search, ShieldCheck, Workflow } from 'lucide-react';
import { useReveal } from "./useMotion";
import { links } from '@/data/site';
import { repoUrl } from '@/data/projects';
import { SHOWN_TOTAL, TRACKED_TOTAL, obsPackageUrl, packageGroups, watchers } from '@/data/packages';

const steps = [
  { icon: Globe, title: 'upstreams', detail: 'GitHub · GitLab · git · web pages' },
  { icon: Search, title: 'nvchecker', detail: 'compares against versions.json' },
  { icon: Workflow, title: 'trigger_obs.py', detail: 'GitHub Actions cron, every 6 h' },
  { icon: Package, title: 'OBS runservice', detail: 'POST per changed package' },
  { icon: Hammer, title: 'fresh build', detail: 'obs_scm re-fetch → spec → rebuild' },
];

const guarantees = [
  {
    icon: ShieldCheck,
    title: 'fails safe',
    text: 'A failed trigger keeps the old version on file, so it retries next run. If more than 25% of checks error, the run aborts before triggering anything.',
  },
  {
    icon: Lock,
    title: 'least privilege',
    text: 'No pull_request trigger, and the OBS token lives in GitHub Secrets, never in the repo.',
  },
  {
    icon: Clock,
    title: 'on demand',
    text: 'Manual runs support a dry run and a force-trigger for one package. Concurrent runs queue instead of racing.',
  },
];

export function Packaging() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="packaging" ref={ref} className="py-24 px-6 relative" style={{ zIndex: 1 }}>
      <div className="max-w-5xl mx-auto">
        <div className="observe">
          <h2 className="section-head">
            <span className="text-hacker-blue">▸</span> build <span className="gradient-text">./packaging</span>
          </h2>
          <p className="section-sub">$ osc results home:itachi_re — packages that rebuild themselves</p>
        </div>

        {/* Pipeline */}
        <div className="liquid-glass p-6 sm:p-8 mb-5 observe">
          <div className="text-hacker-comment text-xs mb-5 font-mono">/* obs-auto-trigger: one run, end to end */</div>
          <ol className="pipeline" aria-label="Packaging pipeline">
            {steps.map((step, i) => (
              <Fragment key={step.title}>
                {i > 0 && <li className="pipe-link" aria-hidden="true" />}
                <li className="pipe-node">
                  <step.icon size={20} className="text-hacker-blue mx-auto mb-2" aria-hidden="true" />
                  <div className="font-mono text-sm text-hacker-text">{step.title}</div>
                  <div className="font-mono text-[11px] text-hacker-muted mt-1 leading-snug">{step.detail}</div>
                </li>
              </Fragment>
            ))}
          </ol>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {guarantees.map((g) => (
              <div key={g.title} className="rounded-xl p-4 border border-hacker-blue/10 bg-hacker-blue/[0.04]">
                <div className="flex items-center gap-2 mb-2 text-hacker-gold font-mono text-sm">
                  <g.icon size={15} aria-hidden="true" /> {g.title}
                </div>
                <p className="text-xs leading-relaxed text-hacker-muted">{g.text}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <a href={links.obs} target="_blank" rel="noreferrer" className="btn-primary !py-3 !px-6 !text-[13px]">
              <Package size={15} /> home:itachi_re on OBS
            </a>
            <a href={repoUrl('obs-auto-trigger')} target="_blank" rel="noreferrer" className="btn-ghost !py-3 !px-6 !text-[13px]">
              obs-auto-trigger <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        {/* Tracked packages */}
        <div className="liquid-glass p-6 sm:p-8 mb-5 observe">
          <div className="text-hacker-comment text-xs mb-6 font-mono">
            /* tracked upstreams — showing {SHOWN_TOTAL} of {TRACKED_TOTAL} */
          </div>
          <div className="space-y-5">
            {packageGroups.map((group) => (
              <div key={group.label} className="grid sm:grid-cols-[160px_1fr] gap-2 sm:gap-4 items-start">
                <div className="text-hacker-gold text-xs font-mono pt-1.5">{group.label}</div>
                <div className="flex flex-wrap gap-2">
                  {group.names.map((name) => (
                    <a key={name} href={obsPackageUrl(name)} target="_blank" rel="noreferrer" className="pkg-chip">
                      {name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-hacker-comment text-xs mt-6 font-mono">
            /* the full list lives in nvchecker.toml — every section name is an OBS package name */
          </div>
        </div>

        {/* Per-package watchers */}
        <div className="liquid-glass p-6 sm:p-8 observe">
          <div className="text-hacker-comment text-xs mb-5 font-mono">/* watchers: who feeds OBS, and how often */</div>
          <div className="font-mono text-sm divide-y divide-hacker-blue/10">
            {watchers.map((w) => (
              <div key={w.repo} className="grid grid-cols-[1fr_auto] sm:grid-cols-[220px_1fr_auto] gap-x-4 gap-y-1 py-3 items-baseline">
                <a
                  href={repoUrl(w.repo)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-hacker-blue hover:text-hacker-gold transition-colors truncate"
                >
                  {w.repo}
                </a>
                <span className="text-hacker-muted text-xs col-span-2 sm:col-span-1 order-3 sm:order-none">{w.target}</span>
                <span className="text-hacker-success text-xs">{w.cadence}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
