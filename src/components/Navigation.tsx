import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Search } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { openPalette, shortcutLabel } from '@/lib/palette';

const navItems = [
  { label: 'home', href: '#home' },
  { label: 'about', href: '#about' },
  { label: 'skills', href: '#skills' },
  { label: 'packaging', href: '#packaging' },
  { label: 'projects', href: '#projects' },
  { label: 'philosophy', href: '#philosophy' },
  { label: 'contact', href: '#contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => item.href.slice(1));
      const scrollPos = window.scrollY + 150;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isMobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileOpen(false);
  };

  return (
    <>
      <nav
        aria-label="Primary"
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 transition-all duration-300 ${
          isScrolled
            ? 'bg-hacker-bg/95 backdrop-blur-xl border-b border-hacker-blue/10'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="font-display font-extrabold text-lg tracking-tight"
        >
          <span className="text-hacker-blue">itachi</span>
          <span className="text-hacker-gold">_re</span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              aria-current={activeSection === item.href.slice(1) ? 'true' : undefined}
              className={`px-3 py-2 rounded-md text-xs font-mono tracking-wider transition-all duration-200 ${
                activeSection === item.href.slice(1)
                  ? 'text-hacker-blue bg-hacker-blue/10'
                  : 'text-hacker-muted hover:text-hacker-blue hover:bg-hacker-blue/5'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={openPalette}
            aria-label="Open command palette"
            className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-mono text-hacker-muted bg-hacker-blue/5 border border-hacker-blue/15 hover:border-hacker-blue/40 hover:text-hacker-blue transition-all duration-200"
          >
            <Search size={14} />
            <span className="hidden sm:inline kbd-hint">{shortcutLabel}</span>
          </button>

          <button
            type="button"
            onClick={toggle}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs font-mono text-hacker-blue bg-hacker-blue/10 border border-hacker-blue/20 hover:border-hacker-blue/40 transition-all duration-200"
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
            <span className="hidden sm:inline">{isDark ? 'light' : 'dark'}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-nav"
            className="lg:hidden p-2 rounded-lg border border-hacker-blue/20 text-hacker-text hover:border-hacker-blue/40 transition-all duration-200"
          >
            {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div
        id="mobile-nav"
        className={`fixed top-16 left-0 right-0 z-40 bg-hacker-bg/98 backdrop-blur-xl border-b border-hacker-blue/10 transition-all duration-300 lg:hidden ${
          isMobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col p-4 gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`px-4 py-3 rounded-lg text-sm font-mono transition-all duration-200 ${
                activeSection === item.href.slice(1)
                  ? 'text-hacker-blue bg-hacker-blue/10'
                  : 'text-hacker-text hover:text-hacker-blue hover:bg-hacker-blue/5'
              }`}
            >
              ▸ {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
