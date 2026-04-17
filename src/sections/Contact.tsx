import { useEffect, useRef } from 'react';
import { Github, Gitlab, MessageCircle, Send, Mail } from 'lucide-react';

const socialLinks = [
  {
    name: 'GitHub',
    handle: 'itachi-re',
    href: 'https://github.com/itachi-re',
    icon: Github,
    abbr: 'GH',
  },
  {
    name: 'GitLab',
    handle: 'itachi_re',
    href: 'https://gitlab.com/itachi_re',
    icon: Gitlab,
    abbr: 'GL',
  },
  {
    name: 'Codeberg',
    handle: 'itachi-re',
    href: 'https://codeberg.org/itachi-re',
    icon: MessageCircle,
    abbr: 'CB',
  },
  {
    name: 'Telegram',
    handle: '@itachi_re',
    href: 'https://t.me/itachi_re',
    icon: Send,
    abbr: 'TG',
  },
  {
    name: 'Email',
    handle: 'xanbenson99@gmail.com',
    href: 'mailto:xanbenson99@gmail.com',
    icon: Mail,
    abbr: '@',
  },
];

export function Contact() {
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
      id="contact"
      ref={sectionRef}
      className="py-24 px-6 relative"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="observe">
          <h2 className="section-head">
            <span className="text-hacker-blue">▸</span> find{' '}
            <span className="gradient-text">./contact</span>
          </h2>
          <p className="section-sub">$ ping itachi-re — awaiting response...</p>
        </div>

        {/* Social Links Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {socialLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              target={link.name !== 'Email' ? '_blank' : undefined}
              rel={link.name !== 'Email' ? 'noreferrer' : undefined}
              className="social-link observe group"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="social-icon group-hover:animate-bounce">
                {link.abbr}
              </div>
              <div>
                <div className="text-sm font-semibold text-hacker-text group-hover:text-hacker-blue transition-colors">
                  {link.name}
                </div>
                <div className="text-xs text-hacker-muted font-mono">
                  {link.handle}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* System Status */}
        <div className="liquid-glass p-7 observe">
          <div className="text-hacker-comment text-xs mb-5 font-mono">
            $ systemctl --user status life.service
          </div>
          <div className="font-mono text-sm space-y-2">
            <div className="status-row">
              <span className="status-key">●</span>
              <span className="text-hacker-success">
                life.service — Itachi's Operating Runtime
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
                <span className="pulse-dot" />
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
