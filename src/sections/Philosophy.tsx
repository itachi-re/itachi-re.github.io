import { useEffect, useRef } from 'react';
import { Zap, Eye, FileText, ArrowDown, X } from 'lucide-react';

const principles = [
  {
    icon: Zap,
    title: 'precision',
    description: 'Every line has purpose. Decoration is a warning sign.',
  },
  {
    icon: Eye,
    title: 'transparency',
    description: "If a system can't be understood, it can't be trusted.",
  },
  {
    icon: FileText,
    title: 'documentation',
    description: 'Future-you deserves to know what present-you figured out.',
  },
  {
    icon: ArrowDown,
    title: 'depth',
    description: 'Go one level deeper than you think you need to.',
  },
];

const rejects = [
  '"cargo-cult configuration"',
  '"tools you can\'t explain"',
  '"complexity that serves the author, not the reader"',
  '"giving up before reading the source"',
];

export function Philosophy() {
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
      id="philosophy"
      ref={sectionRef}
      className="py-24 px-6 relative"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="observe">
          <h2 className="section-head">
            <span className="text-hacker-blue">▸</span> cat{' '}
            <span className="gradient-text">/proc/philosophy</span>
          </h2>
          <p className="section-sub">$ python3 philosophy.py — runtime beliefs (read-only)</p>
        </div>

        {/* Principles Grid */}
        <div className="grid sm:grid-cols-2 gap-5 mb-5">
          {principles.map((principle, index) => (
            <div
              key={principle.title}
              className="liquid-glass philosophy-card observe group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <principle.icon
                  size={22}
                  className="text-hacker-gold group-hover:rotate-[360deg] transition-transform duration-700"
                />
                <span className="text-hacker-gold text-sm font-mono">
                  "{principle.title}"
                </span>
              </div>
              <p className="text-sm leading-relaxed text-hacker-text/90">
                {principle.description}
              </p>
            </div>
          ))}
        </div>

        {/* Rejects Section */}
        <div className="liquid-glass p-6 mb-5 observe">
          <div className="text-hacker-danger text-xs mb-4 font-mono">
            /* REJECTS = [
          </div>
          <div className="space-y-2 pl-2">
            {rejects.map((reject, index) => (
              <div key={index} className="reject-item">
                <X size={14} className="text-hacker-danger flex-shrink-0" />
                <span>{reject},</span>
              </div>
            ))}
          </div>
          <div className="text-hacker-danger text-xs mt-4 font-mono">] */</div>
        </div>

        {/* Quote Block */}
        <div className="liquid-glass quote-block observe relative overflow-hidden">
          <div className="shimmer-line absolute top-0 left-0 right-0" />
          <blockquote className="font-display text-xl sm:text-2xl italic text-hacker-text leading-relaxed font-semibold mb-3">
            "The quieter you become, the more you can hear."
          </blockquote>
          <cite className="text-hacker-muted text-sm font-mono not-italic">
            — /proc/philosophy
          </cite>
          <div className="shimmer-line absolute bottom-0 left-0 right-0" />
        </div>
      </div>
    </section>
  );
}
