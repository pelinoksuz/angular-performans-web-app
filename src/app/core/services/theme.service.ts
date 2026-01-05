import { Injectable } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'app-theme';

  initTheme(): void {
    const savedTheme = localStorage.getItem('app-theme') as 'light' | 'dark';
    const theme = savedTheme ?? 'light';

    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
  }


  toggleTheme(): void {
    const isDark = document.body.classList.contains('theme-dark');
    this.applyTheme(isDark ? 'light' : 'dark');
  }

  setTheme(theme: ThemeMode): void {
    this.applyTheme(theme);
  }

  private applyTheme(theme: ThemeMode): void {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem(this.STORAGE_KEY, theme);
  }

  get currentTheme(): ThemeMode {
    return document.body.classList.contains('theme-dark') ? 'dark' : 'light';
  }
}
