import { Terminal, Package, Code2, GitBranch, Cpu, Target } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useCountUp, useInViewOnce, useReveal } from './useMotion';

// Edit these arrays to change what shows on the page.
// level = 0-100 (how comfortable you are now)

interface Skill {
  name: string;
  level: number;
  icon: LucideIcon;
  note: string;
}

const skills: Skill[] = [
  { name: 'Linux / openSUSE', level: 80, icon: Terminal, note: 'daily driver, CLI workflows' },
  { name: 'RPM packaging (OBS)', level: 70, icon: Package, note: 'spec files, obs_scm services' },
  { name: 'Python', level: 65, icon: Code2, note: 'scripts & small CLI tools' },
  { name: 'Git / GitHub', level: 75, icon: GitBranch, note: 'repos, Actions, Pages' },
  { name: 'React / TypeScript', level: 45, icon: Cpu, note: 'this site' },
];

type GoalStatus = 'in progress' | 'next' | 'planned';

const goals: { title: string; status: GoalStatus; detail: string }[] = [
  { title: 'Kernel packaging', status: 'in progress', detail: 'Maintain optimized kernel builds on OBS' },
  { title: 'Shell scripting', status: 'next', detail: 'Automate build and release tasks' },
  { title: 'C fundamentals', status: 'planned', detail: 'Understand what runs under the hood' },
];

const statusColor: Record<GoalStatus, string> = {
  'in progress': 'text-hacker-success',
  next: 'text-hacker-blue',
  planned: 'text-hacker-muted',
};

function SkillCard({ skill, index, active }: { skill: Skill; index: number; active: boolean }) {
  const delay = index * 80;
  const value = useCountUp(skill.level, active, delay);

  return (
    <li className="liquid-glass p-5 observe" style={{ transitionDelay: `${delay}ms` }}>
      <div className="flex items-center gap-3 mb-3">
        <skill.icon size={18} className="text-hacker-blue" aria-hidden="true" />
        <div className="text-sm font-semibold text-hacker-text">{skill.name}</div>
        <div className="ml-auto text-xs font-mono text-hacker-muted" aria-hidden="true">
          {value}%
        </div>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.08)' }}
        role="progressbar"
        aria-label={skill.name}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={skill.level}
      >
        <div
          className="h-full rounded-full transition-[width] duration-1000 ease-out motion-reduce:transition-none"
          style={{
            width: active ? `${skill.level}%` : '0%',
            background: 'linear-gradient(90deg, #58a6ff, #3fb950)',
            transitionDelay: `${delay + 200}ms`,
          }}
        />
      </div>
      <div className="text-xs text-hacker-muted font-mono mt-2">{skill.note}</div>
    </li>
  );
}

export function LearningGoals() {
  const sectionRef = useReveal<HTMLElement>();
  // Bars start when the cards are on screen, not when the heading is.
  const { ref: gridRef, inView } = useInViewOnce<HTMLUListElement>(0.2);

  return (
    <section
      id="skills"
      ref={sectionRef}
      aria-labelledby="skills-heading"
      className="py-24 px-6 relative"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="observe">
          <h2 id="skills-heading" className="section-head">
            <span className="text-hacker-blue">▸</span> list{' '}
            <span className="gradient-text">./skills</span>
          </h2>
          <p className="section-sub">$ cat skills.conf learning_goals.conf</p>
        </div>

        <ul ref={gridRef} className="grid sm:grid-cols-2 gap-4 mb-6">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} active={inView} />
          ))}
        </ul>

        <div className="liquid-glass p-7 observe">
          <div className="flex items-center gap-2 text-hacker-comment text-xs mb-5 font-mono">
            <Target size={14} aria-hidden="true" /> $ ls ~/learning_goals
          </div>
          <ul className="font-mono text-sm space-y-3">
            {goals.map((goal) => (
              <li key={goal.title} className="status-row">
                <span className={`status-key ${statusColor[goal.status]}`} aria-hidden="true">●</span>
                <span className="text-hacker-text">{goal.title}</span>
                <span className="text-hacker-muted"> — {goal.detail} </span>
                <span className={`text-xs ${statusColor[goal.status]}`}>[{goal.status}]</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
