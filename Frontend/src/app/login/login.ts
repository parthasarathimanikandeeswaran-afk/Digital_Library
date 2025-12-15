import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Authservice } from '../authservice';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  email = '';
  password = '';
  loginMessage = '';

  constructor(private router: Router, private auth: Authservice) {}

  ngOnInit() {
  if (this.auth.isLoggedIn()) {
    this.router.navigate(['/home']);
  }
}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.loginMessage = 'Please fill all required fields';
      return;
    }

    // 🔐 Call backend API
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (res: any) => {
        this.loginMessage = '✅ Login successful!';
        console.log('User:', res);

        // 🍪 Store user email in cookie (valid for 1 day)
        this.auth.setLogin(this.email);

        // ⏳ Small delay to show success message
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 800);

        form.resetForm();
      },
      error: (err: any) => {
        console.error(err);
        this.loginMessage = err.error || '❌ Invalid credentials';
      },
    });
  }
}
