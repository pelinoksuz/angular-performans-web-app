import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _role$ = new BehaviorSubject<string | null>(this.getRoleFromStorage());
  role$ = this._role$.asObservable();

  // LocalStorage’tan mevcut rolü al
  private getRoleFromStorage(): string | null {
    return localStorage.getItem('role');
  }

  // Login sonrası çağrılır
  setRole(role: string): void {
    localStorage.setItem('role', role);
    this._role$.next(role);
  }

  // Logout sonrası çağrılır
  clearAuth(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this._role$.next(null);
  }

  // Şu anki role değerini senkron al
  get currentRole(): string | null {
    return this._role$.value;
  }

  isAuthorized(requiredRoles: string[]): boolean {
    const role = this.currentRole;
    return !!role && requiredRoles.includes(role);
  }
}
