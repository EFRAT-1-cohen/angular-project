import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, NgClass, CommonModule } from '@angular/common';
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
    CommonModule,
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamProjects implements OnInit {
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  private fb = inject(NonNullableFormBuilder);

  project$ = this.projectService.project$;
  currentTeamId: number | null = null;

  // Loading states
  isLoadingProjects = signal<boolean>(false);
  isCreatingProject = signal<boolean>(false);
  error = signal<string | null>(null);
  isFormExpanded = signal<boolean>(false);

  projectForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]], 
    description: ['', [Validators.maxLength(500)]]
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['teamId']) {
        this.currentTeamId = Number(params['teamId']);
        this.loadProjects();
      }
    });
  }

  private loadProjects() {
    this.isLoadingProjects.set(true);
    this.error.set(null);
    
    if (this.currentTeamId) {
      this.projectService.getProjectsByTeam(this.currentTeamId).subscribe({
        next: () => {
          this.isLoadingProjects.set(false);
        },
        error: (err) => {
          this.isLoadingProjects.set(false);
          this.error.set('לא ניתן לטעון את הפרויקטים');
        }
      });
    }
  }

  toggleForm() {
    this.isFormExpanded.update(val => !val);
    if (!this.isFormExpanded()) {
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

    this.isCreatingProject.set(true);
    const newProjectData: CreateProjectModel = {
      teamId: this.currentTeamId,
      name: this.projectForm.getRawValue().name || '',
      description: this.projectForm.getRawValue().description || ''
    };

    this.projectService.postProject(newProjectData).subscribe({
      next: () => {
        this.isCreatingProject.set(false);
        Swal.fire({
          icon: 'success',
          title: 'הפרויקט נוצר בהצלחה!',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
        this.projectForm.reset();
        this.isFormExpanded.set(false);
      },
      error: (err) => {
        this.isCreatingProject.set(false);
        const msg = err.error?.message || 'לא ניתן ליצור פרויקט כרגע';
        Swal.fire('שגיאה', msg, 'error');
      }
    });
  }
}