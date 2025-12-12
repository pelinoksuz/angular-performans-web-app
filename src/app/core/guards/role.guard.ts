import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: any): boolean {
    const userRole = localStorage.getItem('role');
    const allowedRoles = route.data['roles'] as Array<string>;

    if (!allowedRoles.includes(userRole || '')) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
