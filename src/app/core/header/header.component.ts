import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  title: string = 'AutoOps Control';
  @Input() userMode: 'guest' | 'admin' | 'engineer' | '' = '';

  logout() {
    console.log('Logout clicked');
  }
}
