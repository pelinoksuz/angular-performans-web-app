import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  title = 'AutoOps Control';
  userRole: string | null = null;
  isLoginPage = false;
  constructor(private router: Router, private authService: AuthService) {}

  private readonly themeService = inject(ThemeService);

  readonly theme = this.themeService.theme;

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.isLoginPage = this.router.url.includes('login');
    });

    this.authService.role$.subscribe(role => {
      this.userRole = role;
    });
  }

  toggleTheme() {
    this.themeService.toggle();
  }

  logout() {
    this.authService.clearAuth();
    this.router.navigate(['/login']);
  }
}
