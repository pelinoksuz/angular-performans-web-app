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

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      role: ['', Validators.required],
      accessCode: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      console.log('Form data:', this.loginForm.value);
      this.router.navigate(['/dashboard']);
    }
  }

  continueAsGuest(): void {
    this.router.navigate(['/dashboard']);
  }
}
