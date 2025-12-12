import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: string = '';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      role: ['', Validators.required],
      accessCode: ['', Validators.required]
    });
  }

  // Fake backend function
  getUsers() {
    return [
      { role: 'admin', accessCode: '1111' },
      { role: 'operator', accessCode: '2222' },
      { role: 'user', accessCode: '3333' }
    ];
  }

  onLogin(): void {
    if (!this.loginForm.valid) return;

    const { role, accessCode } = this.loginForm.value;

    const users = this.getUsers();
    const foundUser = users.find(u => u.role === role);

    if (!foundUser) {
      this.loginError = 'Selected role is invalid.';
      return;
    }

    if (foundUser.accessCode !== accessCode) {
      this.loginError = 'Access code is incorrect.';
      return;
    }

    this.loginError = '';
    localStorage.setItem('token', 'dummy-token');
    localStorage.setItem('role', role);

    this.router.navigate(['/dashboard']);
  }

  continueAsGuest(): void {
    localStorage.setItem('token', 'guest-token');
    localStorage.setItem('role', 'guest');
    this.router.navigate(['/dashboard']);
  }
}
