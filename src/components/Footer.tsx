import { Github } from 'lucide-react';
import { links } from '@/data/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-10 px-6 border-t border-hacker-blue/10" style={{ zIndex: 1 }}>
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-hacker-muted text-xs font-mono mb-2">
          © {year} <span className="text-hacker-blue">itachi_re</span> — built with curiosity · refined with patience
        </p>
        <p className="text-hacker-muted text-[11px] font-mono mb-3">
          React · TypeScript · Tailwind · deployed with GitHub Actions ·{' '}
          <a
            href={links.source}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-hacker-blue hover:text-hacker-gold transition-colors"
          >
            <Github size={11} aria-hidden="true" /> view source
          </a>
        </p>
        <p className="text-hacker-blue text-[10px] font-mono opacity-70">[ ∞.∞∞∞∞∞∞ ] Still learning...</p>
      </div>
    </footer>
  );
}
