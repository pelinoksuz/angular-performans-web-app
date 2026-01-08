// theme.service.ts
import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  private readonly _theme = signal<Theme>(
    (localStorage.getItem('theme') as Theme) || 'light'
  );

  readonly theme = this._theme.asReadonly();

  constructor() {
    effect(() => {
      const theme = this._theme();
      document.body.classList.remove('theme-light', 'theme-dark');
      document.body.classList.add(`theme-${theme}`);
      localStorage.setItem('theme', theme);
    });
  }

  toggle() {
    this._theme.update(t => (t === 'light' ? 'dark' : 'light'));
  }
}
