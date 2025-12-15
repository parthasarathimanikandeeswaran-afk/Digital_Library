import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Authservice } from '../authservice';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  userName = '';
  email = '';
  password = '';
  registerMessage = '';
  loading = false;

  constructor(private authService: Authservice) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.registerMessage = '⚠️ Please fill all fields correctly.';
      return;
    }

    const userData = {
      userName: this.userName.trim(),
      email: this.email.trim(),
      password: this.password.trim(),
    };

    this.loading = true;
    this.registerMessage = '';

    this.authService.register(userData).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.registerMessage = '✅ Registration successful!';
        form.resetForm();
      },
      error: (err: any) => {
        this.loading = false;
        console.error('Register Error:', err);

        if (err.status === 409 || err.error?.includes('duplicate')) {
          this.registerMessage = '❌ Email already registered!';
        } else {
          this.registerMessage = '❌ Registration failed. Please try again.';
        }
      },
    });
  }
}
