import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useReveal } from './useMotion';

const EMAIL = 'itachi_re@protonmail.com';

const socialLinks = [
  { name: 'GitHub', handle: 'itachi-re', href: 'https://github.com/itachi-re', abbr: 'GH' },
  { name: 'GitLab', handle: 'itachi_re', href: 'https://gitlab.com/itachi_re', abbr: 'GL' },
  { name: 'Codeberg', handle: 'itachi-re', href: 'https://codeberg.org/itachi-re', abbr: 'CB' },
  { name: 'Telegram', handle: '@itachi_re', href: 'https://t.me/itachi_re', abbr: 'TG' },
  { name: 'Email', handle: EMAIL, href: `mailto:${EMAIL}`, abbr: '@' },
];

export function Contact() {
  const sectionRef = useReveal<HTMLElement>();
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.clearTimeout(resetTimer.current);
      resetTimer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context, permissions): fall back to the mail client.
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-heading"
      className="py-24 px-6 relative"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="observe">
          <h2 id="contact-heading" className="section-head">
            <span className="text-hacker-blue">▸</span> find{' '}
            <span className="gradient-text">./contact</span>
          </h2>
          <p className="section-sub">$ ping itachi-re — awaiting response...</p>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {socialLinks.map((link, index) => {
            const external = link.href.startsWith('http');
            return (
              <li key={link.name} className="observe" style={{ transitionDelay: `${index * 80}ms` }}>
                <a
                  href={link.href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  aria-label={`${link.name}: ${link.handle}${external ? ' (opens in new tab)' : ''}`}
                  className="social-link group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hacker-blue"
                >
                  <div
                    className="social-icon motion-safe:group-hover:animate-bounce"
                    aria-hidden="true"
                  >
                    {link.abbr}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-hacker-text group-hover:text-hacker-blue transition-colors">
                      {link.name}
                    </div>
                    <div className="text-xs text-hacker-muted font-mono">{link.handle}</div>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mb-6 observe">
          <button type="button" onClick={copyEmail} className="btn-ghost">
            {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            {copied ? 'Email copied' : 'Copy email address'}
          </button>
          <span role="status" className="sr-only">
            {copied ? 'Email address copied to clipboard' : ''}
          </span>
        </div>

        <div className="liquid-glass p-7 observe">
          <div className="text-hacker-comment text-xs mb-5 font-mono">
            $ systemctl --user status life.service
          </div>
          <div className="font-mono text-sm space-y-2">
            <div className="status-row">
              <span className="status-key" aria-hidden="true">●</span>
              <span className="text-hacker-success">
                life.service — Itachi&apos;s Operating Runtime
              </span>
            </div>
            <div className="status-row">
              <span className="status-key">Loaded:</span>
              <span>loaded (/etc/systemd/user/life.service; enabled)</span>
            </div>
            <div className="status-row">
              <span className="status-key">Active:</span>
              <span className="text-hacker-success flex items-center gap-2">
                active (running) — and always iterating
                <span className="pulse-dot" aria-hidden="true" />
              </span>
            </div>
            <div className="status-row">
              <span className="status-key">CGroup:</span>
              <span className="text-hacker-blue">
                curiosity [running] · discipline [running] · open_source [running]
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
