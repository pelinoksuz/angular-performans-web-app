import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  isExpanded = false;
  role = localStorage.getItem('role');

  constructor(private router: Router) { }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  dashbooardClicked() {
    this.router.navigate(['/dashboard']);
  }

  vehiclesClicked() {
    this.router.navigate(['/vehicles']);
  }
}
