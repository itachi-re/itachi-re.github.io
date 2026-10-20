export const OPEN_PALETTE_EVENT = 'itachi:open-palette';

export const openPalette = () => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));

const isApple = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent);

/** Label for the palette shortcut, matched to the visitor's platform. */
export const shortcutLabel = isApple ? '⌘ K' : 'Ctrl K';
