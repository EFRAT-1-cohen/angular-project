import { Component, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, NgClass } from '@angular/common';
import Swal from 'sweetalert2';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip'; 

import { ProjectService } from '../../services/project-service/project-service';
import { CreateProjectModel } from '../../models/projects.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-team-projects',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    NgClass,
    RouterLink, 
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatChipsModule,
    MatMenuModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './team-projects.html',
  styleUrl: './team-projects.css',
})
export class TeamProjects implements OnInit {
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  private fb = inject(NonNullableFormBuilder);

  project$ = this.projectService.project$;
  currentTeamId: number | null = null;

  isFormExpanded = false;

  projectForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]], 
    description: ['', [Validators.maxLength(500)]]
  });


 ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['teamId']) {
        this.currentTeamId = Number(params['teamId']);
        this.projectService.getProjectsByTeam(this.currentTeamId).subscribe();
      }
    });
  }
  toggleForm() {
    this.isFormExpanded = !this.isFormExpanded;
    if (!this.isFormExpanded) {
      this.projectForm.reset();
    }
  }

  onSubmit() {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }
    
    if (!this.currentTeamId) {
      Swal.fire({
        title: 'שגיאת מערכת',
        text: 'חסר מזהה צוות (Team ID).',
        icon: 'error',
        confirmButtonColor: '#dc3545'
      });
      return;
    }

    const newProjectData: CreateProjectModel = {
      teamId: this.currentTeamId,
      name: this.projectForm.getRawValue().name || '',
      description: this.projectForm.getRawValue().description || ''
    };

    this.projectService.postProject(newProjectData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'הפרויקט נוצר בהצלחה!',
          toast: true,
          position: 'bottom-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: '#d4edda',
          color: '#155724'
        });
        this.projectForm.reset();
        this.isFormExpanded = false;
      },
      error: () => {
        Swal.fire({
          title: 'אופס...',
          text: 'לא הצלחנו ליצור את הפרויקט. נסה שוב.',
          icon: 'error',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }
}