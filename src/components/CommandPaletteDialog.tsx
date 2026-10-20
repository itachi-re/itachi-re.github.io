import { useCallback } from 'react';
import {
  ArrowUpRight,
  Copy,
  Github,
  Gitlab,
  Hash,
  Mail,
  MessageCircle,
  Moon,
  Package,
  Send,
  Sun,
} from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { projects, repoUrl } from '@/data/projects';
import { links } from '@/data/site';
import { useTheme } from '@/hooks/use-theme';

const sections = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills & goals', id: 'skills' },
  { label: 'Packaging pipeline', id: 'packaging' },
  { label: 'Projects', id: 'projects' },
  { label: 'Philosophy', id: 'philosophy' },
  { label: 'Contact', id: 'contact' },
];

const externalLinks = [
  { label: 'GitHub — itachi-re', href: links.github, icon: Github },
  { label: 'OBS project — home:itachi_re', href: links.obs, icon: Package },
  { label: 'GitLab — itachi_re', href: links.gitlab, icon: Gitlab },
  { label: 'Codeberg — itachi-re', href: links.codeberg, icon: MessageCircle },
  { label: 'Telegram — @itachi_re', href: links.telegram, icon: Send },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** The actual launcher UI. Loaded on demand by CommandPalette so cmdk + dialog stay out of the first paint. */
export default function CommandPaletteDialog({ open, onOpenChange }: Props) {
  const { theme, toggle } = useTheme();

  const run = useCallback(
    (action: () => void) => {
      onOpenChange(false);
      // let the dialog close (and release scroll lock) before navigating
      window.setTimeout(action, 120);
    },
    [onOpenChange]
  );

  const go = (id: string) => run(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }));
  const openUrl = (href: string) => run(() => window.open(href, '_blank', 'noopener,noreferrer'));
  const copyEmail = () =>
    run(() => {
      void navigator.clipboard?.writeText(links.email);
    });

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Command palette"
      description="Jump to a section, open a repository or a link"
      className="bg-hacker-bg2 border-hacker-blue/20 font-mono"
    >
      <CommandInput placeholder="type a command or search repos…" />
      <CommandList className="max-h-[360px]">
        <CommandEmpty>no matches</CommandEmpty>

        <CommandGroup heading="Jump to">
          {sections.map((s) => (
            <CommandItem key={s.id} value={`section ${s.label}`} onSelect={() => go(s.id)}>
              <Hash /> {s.label}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Repositories">
          {projects.map((p) => (
            <CommandItem
              key={p.name}
              value={`repo ${p.name} ${p.description} ${p.tags.join(' ')}`}
              onSelect={() => openUrl(repoUrl(p.name))}
            >
              <ArrowUpRight />
              <span className="font-semibold">{p.name}</span>
              <span className="ml-2 truncate text-xs text-muted-foreground">{p.tags.slice(0, 3).join(' · ')}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Links & actions">
          {externalLinks.map((l) => (
            <CommandItem key={l.href} value={`link ${l.label}`} onSelect={() => openUrl(l.href)}>
              <l.icon /> {l.label}
            </CommandItem>
          ))}
          <CommandItem value="copy email address" onSelect={copyEmail}>
            <Copy /> Copy email address
          </CommandItem>
          <CommandItem value="send email" onSelect={() => run(() => (window.location.href = `mailto:${links.email}`))}>
            <Mail /> Send an email
          </CommandItem>
          <CommandItem value="toggle theme dark light" onSelect={() => run(toggle)}>
            {theme === 'dark' ? <Sun /> : <Moon />} Switch to {theme === 'dark' ? 'light' : 'dark'} theme
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
