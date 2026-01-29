import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth-service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
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
 templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb=inject(NonNullableFormBuilder);
  private authService=inject(AuthService);
  private router=inject(Router);
  
  form=this.fb.group({
    name:['',[Validators.required, Validators.minLength(2)]],
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.required, Validators.minLength(6)]]
  });
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    
    const userData = this.form.getRawValue();

    this.authService.register(userData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'נרשמת בהצלחה!',
          text: 'מיד מועבר לצוות...',
          timer: 1500, 
          showConfirmButton: false, 
          background: '#ffffff', 
          iconColor: '#4CAF50'  
        });

        setTimeout(() => {
          this.router.navigate(['/teams']);
        }, 1500);
      },

      error: (err) => {
        if (err.status === 409) {
          Swal.fire({
            icon: 'warning',
            title: 'אופס...',
            text: 'כתובת האימייל הזו כבר רשומה במערכת!',
            confirmButtonText: 'הבנתי, אנסה להתחבר',
            confirmButtonColor: '#ff4081' 
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'שגיאה',
            text: 'משהו השתבש בהרשמה. נסה שוב מאוחר יותר.',
            confirmButtonText: 'סגור'
          });
        }
      }
    });
  }}