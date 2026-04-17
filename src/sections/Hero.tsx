import { useEffect, useState, useRef } from 'react';
import { Github, Send, FolderOpen } from 'lucide-react';

const ASCII_ART = `
██╗████████╗ █████╗  ██████╗██╗  ██╗██╗
██║╚══██╔══╝██╔══██╗██╔════╝██║  ██║██║
██║   ██║   ███████║██║     ███████║██║
██║   ██║   ██╔══██║██║     ██╔══██║██║
██║   ██║   ██║  ██║╚██████╗██║  ██║██║
╚═╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝`;

const TYPING_TEXT = "systems enthusiast · low-level explorer · terminal dweller";

export function Hero() {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= TYPING_TEXT.length) {
        setTypedText(TYPING_TEXT.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 45);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  // Parallax effect on mouse move
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;

      const asciiEl = container.querySelector('.ascii-container') as HTMLElement;
      const terminalEl = container.querySelector('.terminal-container') as HTMLElement;
      const ctaEl = container.querySelector('.cta-container') as HTMLElement;

      if (asciiEl) {
        asciiEl.style.transform = `translate(${xPercent * -10}px, ${yPercent * -10}px)`;
      }
      if (terminalEl) {
        terminalEl.style.transform = `translate(${xPercent * -5}px, ${yPercent * -5}px)`;
      }
      if (ctaEl) {
        ctaEl.style.transform = `translate(${xPercent * -8}px, ${yPercent * -8}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative px-6 py-20"
      style={{ zIndex: 1 }}
    >
      <div ref={containerRef} className="max-w-4xl w-full">
        {/* ASCII Art */}
        <div className="ascii-container liquid-glass p-6 mb-6 relative overflow-hidden animate-fade-up transition-transform duration-200 ease-out">
          <div className="shimmer-line absolute top-0 left-0 right-0" />
          <pre className="ascii-art text-hacker-blue text-[10px] sm:text-xs md:text-sm leading-tight font-mono ascii-glow whitespace-pre-wrap text-center">
            {ASCII_ART}
          </pre>
          <div className="shimmer-line absolute bottom-0 left-0 right-0" />
        </div>

        {/* Terminal Window */}
        <div className="terminal-container terminal mb-8 animate-fade-up delay-200 transition-transform duration-200 ease-out">
          <div className="terminal-bar">
            <span className="terminal-dot bg-red-500" />
            <span className="terminal-dot bg-yellow-500" />
            <span className="terminal-dot bg-green-500" />
            <span className="ml-3 text-xs text-hacker-muted font-mono">
              ~/itachi — zsh — 80×24
            </span>
          </div>
          <div className="terminal-body">
            {/* Command 1 */}
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <span className="prompt">❯</span>
                <span className="command">whoami</span>
              </div>
              <div className="output pl-5 mt-1 text-sm">
                itachi — {typedText}
                <span
                  className={`inline-block w-2 h-4 bg-hacker-blue ml-1 align-middle ${
                    showCursor ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
            </div>

            {/* Command 2 */}
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <span className="prompt">❯</span>
                <span className="command">uptime</span>
              </div>
              <div className="output-muted pl-5 mt-1 text-sm">
                always learning · always building · always questioning
              </div>
            </div>

            {/* Command 3 */}
            <div>
              <div className="flex items-center gap-2">
                <span className="prompt">❯</span>
                <span className="command">uname -a</span>
              </div>
              <div className="output-muted pl-5 mt-1 text-sm">
                Linux mind 7.x #1 SMP x86_64 | philosophy: minimal, focused, consistent
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="cta-container flex flex-wrap gap-4 animate-fade-up delay-400 transition-transform duration-200 ease-out">
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
          </a>
          <a
            href="https://t.me/itachi_re"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            <Send size={16} />
            Telegram
          </a>
        </div>
      </div>
    </section>
  );
}
