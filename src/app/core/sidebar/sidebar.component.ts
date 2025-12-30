import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isExpanded = false;

  constructor(private router: Router, public authService: AuthService) {}

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  dashbooardClicked() {
    this.router.navigate(['/dashboard']);
  }

  vehiclesClicked() {
    this.router.navigate(['/vehicles']);
  }

  latestActivityClicked() {
    this.router.navigate(['/latest-activity']);
  }
}
