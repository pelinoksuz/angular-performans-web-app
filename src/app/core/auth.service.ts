import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLoggedIn = false;

  login({ email, password }: any): boolean {
    if (email === 'admin@demo.com' && password === '1234') {
      this.isLoggedIn = true;
      localStorage.setItem('token', 'mock-token');
      return true;
    }
    return false;
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
