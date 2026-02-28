import { effect, Injectable, signal } from '@angular/core';

type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private storageKey = 'theme';
  private theme = signal<Theme>('dark');

  public readonly theme$ = this.theme.asReadonly();

  constructor() {
    const saved = localStorage.getItem(this.storageKey) as Theme | null;

    if (saved === 'dark' || saved === 'light') {
      this.theme.set(saved);
    }
    effect(() => {
      const current = this.theme();

      document.body.classList.remove('light', 'dark');
      document.body.classList.add(current);

      localStorage.setItem(this.storageKey, current);
    });
  }

  public toggleTheme(): void {
    this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  public setTheme(theme: Theme): void {
    this.theme.set(theme);
  }

  public getTheme(): Theme {
    return this.theme();
  }
}
