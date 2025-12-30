import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles: string[] = route.data['roles'];
    const currentRole = this.authService.currentRole;

    // 1️⃣ Kullanıcı login değilse → /login sayfasına gönder
    if (!currentRole) {
      this.router.navigate(['/login']);
      return false;
    }

    // 2️⃣ Role kontrolü: user izinli değilse → /dashboard'a yönlendir
    if (requiredRoles && !requiredRoles.includes(currentRole)) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    // 3️⃣ Yetkiliyse erişime izin ver
    return true;
  }
}
