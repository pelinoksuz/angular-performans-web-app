import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private router: Router) { }

  title: string = 'AutoOps Control';
  @Input() userMode: 'guest' | 'admin' | 'engineer' | '' = '';

  logout() {
    this.router.navigate(['/login']);
  }
}
