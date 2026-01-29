import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms'; 
import { AddMemberModel, NameTeamModel } from '../../models/teams.model';
import { TeamService } from '../../services/team-service/team-service';
import { Router } from '@angular/router';
import { TeamCard } from '../team-card/team-card'; 
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TeamCard, 
    MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule
  ],
  templateUrl: './teams.html',
  styleUrl: './teams.css',
})
export class Teams implements OnInit {
  private teamsService = inject(TeamService);
  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router); 
  
  teams$ = this.teamsService.team$;
  activeTeam: number | null = null;
  
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]]
  });

  ngOnInit() {
    this.teamsService.getTeams().subscribe({
      next: () => {}, 
      error: (err) => {
        Swal.fire('שגיאת תקשורת', 'לא ניתן לטעון את רשימת הצוותים', 'error');
      }
    });
  }

  createNewTeam() {
    if (this.form.invalid) return;
    
    const newTeam: NameTeamModel = { name: this.form.getRawValue().name };

    this.teamsService.postTeams(newTeam).subscribe({
      next: () => {
        Swal.fire('מעולה', 'הצוות נוצר בהצלחה', 'success');
        this.form.reset();
      },
      error: (err) => {
        const msg = err.status === 409 ? 'שם הצוות כבר קיים' : 'לא ניתן ליצור צוות כרגע';
        Swal.fire('שגיאה', msg, 'error');
      }
    });
  }

  onAddMemberFromCard(memberData: AddMemberModel, teamId: number) {
    this.teamsService.addMemberToTeam(memberData, teamId).subscribe({
      next: () => Swal.fire('הצלחה', 'החבר נוסף לצוות!', 'success'),
      error: (err) => {
        let msg = 'לא ניתן להוסיף את החבר';
        if (err.status === 404) msg = 'המשתמש או הצוות לא נמצאו';
        if (err.status === 400) msg = 'המשתמש כבר קיים בצוות זה';
        
        Swal.fire('שגיאה', msg, 'error');
      }
    });
  }

  onDeleteTeam(teamId: number) {
    Swal.fire({
      title: 'האם אתה בטוח?',
      text: 'הצוות יימחק לצמיתות יחד עם כל הפרויקטים והמשימות שלו!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'כן, מחק!',
      cancelButtonText: 'ביטול'
    }).then((result) => {
      if (result.isConfirmed) {
        this.teamsService.deleteTeam(teamId).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'הצוות נמחק!',
              text: 'הצוות הוסר בהצלחה מהמערכת.',
              toast: true,
              position: 'bottom-start',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              background: '#d4edda',
              color: '#155724'
            });
          },
          error: () => {
            Swal.fire({
              title: 'שגיאה במחיקה',
              text: 'לא הצלחנו למחוק את הצוות. נסה שוב.',
              icon: 'error',
              confirmButtonColor: '#dc3545'
            });
          }
        });
      }
    });
  }
}