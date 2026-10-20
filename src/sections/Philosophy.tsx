import { Zap, Eye, FileText, ArrowDown, X } from 'lucide-react';
import { useReveal } from './useMotion';

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

// Plain strings; the code-style quotes and trailing comma are added when rendering.
const rejects = [
  'cargo-cult configuration',
  "tools you can't explain",
  'complexity that serves the author, not the reader',
  'giving up before reading the source',
];

export function Philosophy() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      aria-labelledby="philosophy-heading"
      className="py-24 px-6 relative"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="observe">
          <h2 id="philosophy-heading" className="section-head">
            <span className="text-hacker-blue">▸</span> cat{' '}
            <span className="gradient-text">/proc/philosophy</span>
          </h2>
          <p className="section-sub">$ python3 philosophy.py — runtime beliefs (read-only)</p>
        </div>

        <ul className="grid sm:grid-cols-2 gap-5 mb-5">
          {principles.map(({ icon: Icon, title, description }, index) => (
            <li
              key={title}
              className="liquid-glass philosophy-card observe group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon
                  size={22}
                  aria-hidden="true"
                  className="text-hacker-gold motion-safe:group-hover:rotate-[360deg] transition-transform duration-700"
                />
                <span className="text-hacker-gold text-sm font-mono">{`"${title}"`}</span>
              </div>
              <p className="text-sm leading-relaxed text-hacker-text/90">{description}</p>
            </li>
          ))}
        </ul>

        <div className="liquid-glass p-6 mb-5 observe">
          <div className="text-hacker-danger text-xs mb-4 font-mono">/* REJECTS = [</div>
          <ul className="space-y-2 pl-2">
            {rejects.map((reject) => (
              <li key={reject} className="reject-item">
                <X size={14} className="text-hacker-danger flex-shrink-0" aria-hidden="true" />
                <span>{`"${reject}",`}</span>
              </li>
            ))}
          </ul>
          <div className="text-hacker-danger text-xs mt-4 font-mono">{']  */'}</div>
        </div>

        <figure className="liquid-glass quote-block observe relative overflow-hidden">
          <div className="shimmer-line absolute top-0 left-0 right-0" aria-hidden="true" />
          <blockquote className="font-display text-xl sm:text-2xl italic text-hacker-text leading-relaxed font-semibold mb-3">
            “The quieter you become, the more you can hear.”
          </blockquote>
          <figcaption>
            <cite className="text-hacker-muted text-sm font-mono not-italic">— /proc/philosophy</cite>
          </figcaption>
          <div className="shimmer-line absolute bottom-0 left-0 right-0" aria-hidden="true" />
        </figure>
      </div>
    </section>
  );
}
