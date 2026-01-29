import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service/auth-service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    RouterLink, 
    MatCardModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {
  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isLoading = signal<boolean>(false);
  hidePassword = signal<boolean>(true);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  togglePasswordVisibility() {
    this.hidePassword.update(val => !val);
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.isLoading.set(true);
    const loginData = this.form.getRawValue();

    this.authService.login(loginData).subscribe({
      next: () => {
        this.isLoading.set(false);
        Swal.fire({
          title: 'איזה כיף שחזרת!',
          text: 'מתחבר למערכת...',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });

        setTimeout(() => {
          this.router.navigate(['/teams']);
        }, 1500);
      },

      error: (err) => {
        this.isLoading.set(false);
        const errorMessage = err.error?.message || 'האימייל או הסיסמה אינם נכונים';
        Swal.fire({
          icon: 'error',
          title: 'שגיאה בהתחברות',
          text: errorMessage,
          confirmButtonText: 'נסה שוב',
          confirmButtonColor: '#d33'
        });
      }
    });
  }
}