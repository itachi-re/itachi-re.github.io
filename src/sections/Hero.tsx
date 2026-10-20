import { useEffect, useRef, useState } from 'react';
import { Github, Send, FolderOpen, Package } from 'lucide-react';
import { prefersReducedMotion } from './useMotion';
import { shortcutLabel } from '@/lib/palette';
import { links } from '@/data/site';

const ASCII_ART = `
██╗████████╗ █████╗  ██████╗██╗  ██╗██╗
██║╚══██╔══╝██╔══██╗██╔════╝██║  ██║██║
██║   ██║   ███████║██║     ███████║██║
██║   ██║   ██╔══██║██║     ██╔══██║██║
██║   ██║   ██║  ██║╚██████╗██║  ██║██║
╚═╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝`;

const TYPING_TEXT = 'systems enthusiast · low-level explorer · terminal dweller';
const TYPING_SPEED_MS = 45;
const CURSOR_BLINK_MS = 530;

/**
 * Isolated so the per-character and cursor re-renders don't touch the rest of
 * the hero. Screen readers get the full text once instead of a partial string.
 */
function Typewriter({ text }: { text: string }) {
  const [length, setLength] = useState(() => (prefersReducedMotion() ? text.length : 0));
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    if (length >= text.length) return;
    const id = window.setTimeout(() => setLength((l) => l + 1), TYPING_SPEED_MS);
    return () => window.clearTimeout(id);
  }, [length, text]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => setCursorOn((on) => !on), CURSOR_BLINK_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      <span aria-hidden="true">{text.slice(0, length)}</span>
      <span className="sr-only">{text}</span>
      <span
        aria-hidden="true"
        className={`inline-block w-2 h-4 bg-hacker-blue ml-1 align-middle ${
          cursorOn ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const asciiRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Parallax: pointer devices only, skipped for reduced motion, batched with
  // requestAnimationFrame, and paused while the hero is off screen.
  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (prefersReducedMotion() || !canHover) return;

    const layers = [
      { el: asciiRef.current, depth: -10 },
      { el: terminalRef.current, depth: -5 },
      { el: ctaRef.current, depth: -8 },
    ];

    let x = 0;
    let y = 0;
    let frame = 0;
    let heroVisible = true;

    const apply = () => {
      frame = 0;
      for (const { el, depth } of layers) {
        if (el) el.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onMove = (e: MouseEvent) => {
      if (!heroVisible) return;
      x = (e.clientX / window.innerWidth - 0.5) * 2;
      y = (e.clientY / window.innerHeight - 0.5) * 2;
      schedule();
    };
    const onLeave = () => {
      x = 0;
      y = 0;
      schedule();
    };

    const visibility = new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
    });
    if (sectionRef.current) visibility.observe(sectionRef.current);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      visibility.disconnect();
      cancelAnimationFrame(frame);
      for (const { el } of layers) if (el) el.style.transform = '';
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative px-6 py-20"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-4xl w-full">
        <h1 className="sr-only">itachi — systems enthusiast, low-level explorer, terminal dweller</h1>

        {/* ASCII Art */}
        <div
          ref={asciiRef}
          className="ascii-container liquid-glass p-6 mb-6 relative overflow-hidden animate-fade-up transition-transform duration-200 ease-out"
        >
          <div className="shimmer-line absolute top-0 left-0 right-0" aria-hidden="true" />
          <pre
            role="img"
            aria-label="ITACHI"
            className="ascii-art text-hacker-blue text-[10px] sm:text-xs md:text-sm leading-tight font-mono ascii-glow whitespace-pre overflow-x-auto text-center"
          >
            {ASCII_ART}
          </pre>
          <div className="shimmer-line absolute bottom-0 left-0 right-0" aria-hidden="true" />
        </div>

        {/* Terminal Window */}
        <div
          ref={terminalRef}
          className="terminal-container terminal mb-8 animate-fade-up delay-200 transition-transform duration-200 ease-out"
        >
          <div className="terminal-bar" aria-hidden="true">
            <span className="terminal-dot bg-red-500" />
            <span className="terminal-dot bg-yellow-500" />
            <span className="terminal-dot bg-green-500" />
            <span className="ml-3 text-xs text-hacker-muted font-mono">
              ~/itachi — zsh — 80×24
            </span>
          </div>
          <div className="terminal-body">
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <span className="prompt" aria-hidden="true">❯</span>
                <span className="command">whoami</span>
              </div>
              <div className="output pl-5 mt-1 text-sm">
                itachi — <Typewriter text={TYPING_TEXT} />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2">
                <span className="prompt" aria-hidden="true">❯</span>
                <span className="command">uptime</span>
              </div>
              <div className="output-muted pl-5 mt-1 text-sm">
                always learning · always building · always questioning
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="prompt" aria-hidden="true">❯</span>
                <span className="command">uname -a</span>
              </div>
              <div className="output-muted pl-5 mt-1 text-sm">
                Linux mind 7.x #1 SMP x86_64 | philosophy: minimal, focused, consistent
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="cta-container flex flex-wrap gap-4 animate-fade-up delay-400 transition-transform duration-200 ease-out"
        >
          <a href="#projects" className="btn-primary">
            <FolderOpen size={16} />
            ls ./projects
          </a>
          <a
            href="https://github.com/itachi-re"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            <Github size={16} />
            GitHub
            <span className="sr-only"> (opens in new tab)</span>
          </a>
          <a
            href="https://t.me/itachi_re"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            <Send size={16} />
            Telegram
            <span className="sr-only"> (opens in new tab)</span>
          </a>
          <a href={links.obs} target="_blank" rel="noreferrer" className="btn-ghost">
            <Package size={16} />
            OBS
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </div>

        <p className="mt-6 text-xs font-mono text-hacker-muted">
          tip: press <span className="kbd-hint">{shortcutLabel}</span> or <span className="kbd-hint">/</span> to jump to
          any repo, section or link
        </p>
      </div>
    </section>
  );
}
