import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      role: ['', Validators.required],
      accessCode: ['', Validators.required]
    });
  }

  private getUsers() {
    return [
      { role: 'admin', accessCode: '1111' },
      { role: 'operator', accessCode: '2222' },
      { role: 'user', accessCode: '3333' }
    ];
  }

  onLogin(): void {
    if (!this.loginForm.valid) return;

    const { role, accessCode } = this.loginForm.value;
    const user = this.getUsers().find(u => u.role === role);

    if (!user) {
      this.loginError = 'Selected role is invalid.';
      return;
    }

    if (user.accessCode !== accessCode) {
      this.loginError = 'Access code is incorrect.';
      return;
    }

    this.loginError = '';
    localStorage.setItem('token', 'dummy-token');
    this.authService.setRole(role); // ✅ Servise role gönder

    this.router.navigate(['/dashboard']);
  }

  continueAsGuest(): void {
    localStorage.setItem('token', 'guest-token');
    this.authService.setRole('guest'); // ✅ Servise role gönder
    this.router.navigate(['/dashboard']);
  }
}
