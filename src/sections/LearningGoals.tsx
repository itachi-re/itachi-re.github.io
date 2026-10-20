import { useEffect, useRef, useState } from 'react';
import { Terminal, Package, Code2, GitBranch, Cpu, Target } from 'lucide-react';

// Edit these arrays to change what shows on the page.
// level = 0-100 (how comfortable you are now)

const skills = [
  { name: 'Linux / openSUSE', level: 80, icon: Terminal, note: 'daily driver, CLI workflows' },
  { name: 'RPM packaging (OBS)', level: 70, icon: Package, note: 'spec files, obs_scm services' },
  { name: 'Python', level: 65, icon: Code2, note: 'scripts & small CLI tools' },
  { name: 'Git / GitHub', level: 75, icon: GitBranch, note: 'repos, Actions, Pages' },
  { name: 'React / TypeScript', level: 45, icon: Cpu, note: 'this site' },
];

const goals = [
  { title: 'Kernel packaging', status: 'in progress', detail: 'Maintain optimized kernel builds on OBS' },
  { title: 'Shell scripting', status: 'next', detail: 'Automate build and release tasks' },
  { title: 'C fundamentals', status: 'planned', detail: 'Understand what runs under the hood' },
];

const statusColor: Record<string, string> = {
  'in progress': 'text-hacker-success',
  next: 'text-hacker-blue',
  planned: 'text-hacker-muted',
};

export function LearningGoals() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            setShown(true);
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
    <section id="skills" ref={sectionRef} className="py-24 px-6 relative" style={{ zIndex: 1 }}>
      <div className="max-w-5xl mx-auto">
        <div className="observe">
          <h2 className="section-head">
            <span className="text-hacker-blue">▸</span> list{' '}
            <span className="gradient-text">./skills</span>
          </h2>
          <p className="section-sub">$ cat skills.conf learning_goals.conf</p>
        </div>

        {/* Skills */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="liquid-glass p-5 observe"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <skill.icon size={18} className="text-hacker-blue" />
                <div className="text-sm font-semibold text-hacker-text">{skill.name}</div>
                <div className="ml-auto text-xs font-mono text-hacker-muted">{skill.level}%</div>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: shown ? `${skill.level}%` : '0%',
                    background: 'linear-gradient(90deg, #58a6ff, #3fb950)',
                    transition: 'width 1s ease-out',
                  }}
                />
              </div>
              <div className="text-xs text-hacker-muted font-mono mt-2">{skill.note}</div>
            </div>
          ))}
        </div>

        {/* Learning goals */}
        <div className="liquid-glass p-7 observe">
          <div className="flex items-center gap-2 text-hacker-comment text-xs mb-5 font-mono">
            <Target size={14} /> $ ls ~/learning_goals
          </div>
          <div className="font-mono text-sm space-y-3">
            {goals.map((goal) => (
              <div key={goal.title} className="status-row">
                <span className={`status-key ${statusColor[goal.status]}`}>●</span>
                <span className="text-hacker-text">{goal.title}</span>
                <span className="text-hacker-muted"> — {goal.detail} </span>
                <span className={`text-xs ${statusColor[goal.status]}`}>[{goal.status}]</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
