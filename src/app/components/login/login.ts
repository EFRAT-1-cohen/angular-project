import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth-service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    RouterLink, 
    MatCardModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule,
    MatFormFieldModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
 private fb=inject(NonNullableFormBuilder);
 private authService=inject(AuthService);
 private router=inject(Router);
 private route = inject(ActivatedRoute);
 form=this.fb.group({
   email:['',[Validators.required, Validators.email]],
   password:['',[Validators.required, Validators.minLength(6)]]
 })
onSubmit() {
    if (this.form.invalid) {
      return;
    }
    
    const loginData = this.form.getRawValue();

    this.authService.login(loginData).subscribe({
      next: () => {
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
        Swal.fire({
          icon: 'error',
          title: 'שגיאה בהתחברות',
          text: 'האימייל או הסיסמה אינם נכונים',
          confirmButtonText: 'נסה שוב',
          confirmButtonColor: '#d33'
        });
      }
    });
  }}