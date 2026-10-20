import { lazy, Suspense, useEffect, useState } from 'react';
import { OPEN_PALETTE_EVENT } from '@/lib/palette';

const loadDialog = () => import('./CommandPaletteDialog');
const CommandPaletteDialog = lazy(loadDialog);

/**
 * Ctrl/⌘ + K (or "/") opens a terminal-style launcher for sections, repos and links.
 * This wrapper is tiny: it owns the shortcuts and only pulls in the heavy dialog on first use.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const show = (next: boolean | ((v: boolean) => boolean)) => {
      setMounted(true);
      setOpen(next);
    };

    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        show((v) => !v);
        return;
      }
      if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const el = e.target as HTMLElement | null;
        const typing = el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
        if (!typing) {
          e.preventDefault();
          show(true);
        }
      }
    };
    const onOpen = () => show(true);

    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  // Warm the chunk shortly after load so the first open feels instant.
  useEffect(() => {
    const t = window.setTimeout(() => void loadDialog(), 2500);
    return () => window.clearTimeout(t);
  }, []);

  if (!mounted) return null;
  return (
    <Suspense fallback={null}>
      <CommandPaletteDialog open={open} onOpenChange={setOpen} />
    </Suspense>
  );
}
