import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router // Inject the Router for navigation
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      // Call the UserService to handle login
      this.userService.login(loginData).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          // Navigate to profile settings or any other route after login
          this.router.navigate(['/profile-settings']);
        },
        error: (err) => {
          console.error('Login error:', err);
          alert('Login failed. Please check your credentials.');
        }
      });
    }
  }
}
