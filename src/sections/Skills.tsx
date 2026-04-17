import { useEffect, useRef, useState } from 'react';

const skills = [
  { name: 'Linux System Programming', level: 80, delay: 0 },
  { name: 'Low-level Performance Optimization', level: 70, delay: 0.18 },
  { name: 'Network Protocol Analysis', level: 60, delay: 0.36 },
  { name: 'Binary Exploitation & Reverse Engineering', level: 50, delay: 0.54 },
  { name: 'Wayland Compositor Internals', level: 40, delay: 0.72 },
];

const languages = [
  { name: 'C', color: '#A8B9CC', bgColor: 'rgba(168, 185, 204, 0.12)', borderColor: 'rgba(168, 185, 204, 0.3)' },
  { name: 'Python', color: '#3776AB', bgColor: 'rgba(55, 118, 171, 0.12)', borderColor: 'rgba(55, 118, 171, 0.3)' },
  { name: 'Bash', color: '#4EAA25', bgColor: 'rgba(78, 170, 37, 0.12)', borderColor: 'rgba(78, 170, 37, 0.3)' },
  { name: 'Lua', color: '#7C74D9', bgColor: 'rgba(124, 116, 217, 0.12)', borderColor: 'rgba(124, 116, 217, 0.3)' },
  { name: 'Zsh', color: '#89E051', bgColor: 'rgba(137, 224, 81, 0.12)', borderColor: 'rgba(137, 224, 81, 0.3)' },
  { name: 'GDB', color: '#ff6b6b', bgColor: 'rgba(255, 107, 107, 0.12)', borderColor: 'rgba(255, 107, 107, 0.3)' },
  { name: 'Make', color: '#FFD700', bgColor: 'rgba(255, 215, 0, 0.12)', borderColor: 'rgba(255, 215, 0, 0.3)' },
  { name: 'Git', color: '#F54D27', bgColor: 'rgba(245, 77, 39, 0.12)', borderColor: 'rgba(245, 77, 39, 0.3)' },
  { name: 'Neovim', color: '#57A143', bgColor: 'rgba(87, 161, 67, 0.12)', borderColor: 'rgba(87, 161, 67, 0.3)' },
  { name: 'Docker', color: '#2496ED', bgColor: 'rgba(36, 150, 237, 0.12)', borderColor: 'rgba(36, 150, 237, 0.3)' },
];

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animatedLevels, setAnimatedLevels] = useState<number[]>(skills.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            entry.target.classList.add('visible');
            
            // Animate skill bars
            skills.forEach((skill, index) => {
              setTimeout(() => {
                setAnimatedLevels((prev) => {
                  const newLevels = [...prev];
                  newLevels[index] = skill.level;
                  return newLevels;
                });
              }, index * 150);
            });
            
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = sectionRef.current?.querySelectorAll('.observe');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [hasAnimated]);

  const getProgressBar = (level: number) => {
    const filled = Math.round(level / 10);
    const empty = 10 - filled;
    return '█'.repeat(filled) + '░'.repeat(empty);
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 px-6 relative"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="observe">
          <h2 className="section-head">
            <span className="text-hacker-blue">▸</span> cat{' '}
            <span className="gradient-text">learning_goals.txt</span>
          </h2>
          <p className="section-sub">$ [ACTIVE MODULES] — progress tracking enabled</p>
        </div>

        {/* Skills Progress */}
        <div className="liquid-glass p-8 mb-5 observe">
          <div className="space-y-7">
            {skills.map((skill, index) => (
              <div key={skill.name} className="skill-row">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-mono flex items-center gap-2">
                    <span className="text-hacker-blue">►</span> {skill.name}
                  </span>
                  <span className="text-xs font-mono text-hacker-blue font-semibold">
                    {animatedLevels[index]}%
                  </span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-fill transition-all duration-1000 ease-out"
                    style={{ width: `${animatedLevels[index]}%` }}
                  />
                </div>
                <div className="text-right mt-1">
                  <span className="text-xs font-mono text-hacker-muted tracking-tighter">
                    {getProgressBar(animatedLevels[index])}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Languages & Tools */}
        <div className="liquid-glass p-6 observe">
          <div className="text-hacker-comment text-xs mb-5 font-mono">
            /* languages & tools */
          </div>
          <div className="flex flex-wrap gap-3">
            {languages.map((lang) => (
              <div
                key={lang.name}
                className="lang-badge cursor-default"
                style={{
                  background: lang.bgColor,
                  border: `1px solid ${lang.borderColor}`,
                  color: lang.color,
                }}
              >
                {lang.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
