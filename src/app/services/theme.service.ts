import { Injectable } from '@angular/core';

type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private storageKey = 'theme';

  constructor() {
    const theme = localStorage.getItem(this.storageKey);
    if (theme === 'dark') {
      document.body.classList.add(theme);
    } else {
      document.body.classList.add('light');
      localStorage.setItem(this.storageKey, 'light');
    }
  }

  public toggleTheme(): void {
    const theme = localStorage.getItem(this.storageKey);
    if (theme === 'dark') {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      localStorage.setItem(this.storageKey, 'light');
    } else {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      localStorage.setItem(this.storageKey, 'dark');
    }
  }

  public setTheme(theme: Theme): void {
    localStorage.setItem(this.storageKey, theme);
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }

  public getTheme(): Theme {
    return document.body.classList.contains('dark') ? 'dark' : 'light';
  }
}
