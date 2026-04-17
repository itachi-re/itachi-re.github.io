import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const navItems = [
  { label: 'home', href: '#home' },
  { label: 'about', href: '#about' },
  { label: 'skills', href: '#skills' },
  { label: 'projects', href: '#projects' },
  { label: 'philosophy', href: '#philosophy' },
  { label: 'contact', href: '#contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.slice(1));
      const scrollPos = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileOpen(false);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    // Theme toggle logic would go here
  };

  return (
    <>
      <nav
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
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`px-4 py-2 rounded-md text-xs font-mono tracking-wider transition-all duration-200 ${
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
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono text-hacker-blue bg-hacker-blue/10 border border-hacker-blue/20 hover:border-hacker-blue/40 transition-all duration-200"
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
            <span>{isDark ? 'light' : 'dark'}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 rounded-lg border border-hacker-blue/20 text-hacker-text hover:border-hacker-blue/40 transition-all duration-200"
          >
            {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div
        className={`fixed top-16 left-0 right-0 z-40 bg-hacker-bg/98 backdrop-blur-xl border-b border-hacker-blue/10 transition-all duration-300 md:hidden ${
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
