import { Injectable, signal, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from './auth.service';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  private readonly authService = inject(AuthService);

  // 🔁 RxJS role$ → Signal
  private readonly role = toSignal(this.authService.role$, {
    initialValue: this.authService.currentRole,
  });

  private readonly _theme = signal<Theme>('light');
  readonly theme = this._theme.asReadonly();

  constructor() {

    /* Role değiştiğinde → role’a özel theme yükle */
    effect(() => {
      const role = this.role();

      // guest veya null → her zaman light
      if (!role) {
        this._theme.set('light');
        return;
      }

      const storedTheme =
        localStorage.getItem(this.storageKey(role)) as Theme | null;

      this._theme.set(storedTheme || 'light');
    });

    /* Theme değiştiğinde → DOM + role’a özel storage */
    effect(() => {
      const theme = this._theme();
      document.body.classList.remove('theme-light', 'theme-dark');
      document.body.classList.add(`theme-${theme}`);

      const role = this.role();
      if (role) {
        localStorage.setItem(this.storageKey(role), theme);
      }
    });
  }

  toggle() {
    this._theme.update(t => (t === 'light' ? 'dark' : 'light'));
  }

  private storageKey(role: string) {
    return `theme:${role}`;
  }
}
