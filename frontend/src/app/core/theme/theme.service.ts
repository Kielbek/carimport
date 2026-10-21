import { DOCUMENT, Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';
const STORAGE_KEY = 'carimport.theme';

/**
 * Light/dark theme stored per browser. The initial value is applied by an inline script in index.html before first
 * paint (no flash); this service only reads it back and handles toggling. Without an explicit choice the OS setting
 * wins and is followed live.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly theme = signal<Theme>('dark');

  constructor() {
    if (!this.browser) {
      return;
    }
    this.theme.set(this.document.documentElement.dataset['theme'] === 'light' ? 'light' : 'dark');
    const media = this.document.defaultView?.matchMedia('(prefers-color-scheme: dark)');
    media?.addEventListener('change', (e) => {
      if (!this.stored()) {
        this.apply(e.matches ? 'dark' : 'light');
      }
    });
  }

  toggle(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // not persisted - still applied for this visit
    }
  }

  private apply(theme: Theme): void {
    this.theme.set(theme);
    this.document.documentElement.dataset['theme'] = theme;
  }

  private stored(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }
}
