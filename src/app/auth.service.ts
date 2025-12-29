import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  hasRole(...allowedRoles: string[]): boolean {
    const role = this.getRole();
    return allowedRoles.includes(role || '');
  }

  logout(): void {
    localStorage.clear();
  }
}
