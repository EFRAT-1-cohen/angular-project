import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task-service/task-service';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common'; 
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GetTasksResponse } from '../../models/task.model';

@Component({
  selector: 'app-task-project',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AsyncPipe,
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './task-project.html',
  styleUrl: './task-project.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskProject {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private taskService = inject(TaskService);
  private fb = inject(NonNullableFormBuilder);
  
  task$ = this.taskService.currentTasks$;
  currentProjectId: number | null = null;
  currentTaskId: number | null = null;

  isLoadingTasks = signal<boolean>(false);
  isCreatingTask = signal<boolean>(false);
  isDeletingTask = signal<boolean>(false);
  isUpdatingTask = signal<boolean>(false);
  error = signal<string | null>(null);
  isFormADDExpanded = signal<boolean>(false);
  isEditing = signal<boolean>(false);
  
  taskForm = this.fb.group({
   title: ['', [Validators.required, Validators.minLength(2)]], 
  description: [''],
  status: ['todo'],        
  priority: ['normal'],   
  assigneeId: [null as number | null],
  dueDate: [null as Date | null]
  });
  
 updateTaskForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]], 
   description: [''],
   status: ['todo'],        
   priority: ['normal'],
   assigneeId: [null as number | null],
   dueDate: [null as Date | null]
  });
  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const idFromUrl = params.get('projectId');
      this.currentProjectId = idFromUrl ? Number(idFromUrl) : 1;
      this.loadTasks();
    });
  }

  private loadTasks() {
    if (!this.currentProjectId) return;
    
    this.isLoadingTasks.set(true);
    this.error.set(null);
    
    this.taskService.getTasksByProject(this.currentProjectId).subscribe({
      next: () => {
        this.isLoadingTasks.set(false);
      },
      error: (err) => {
        this.isLoadingTasks.set(false);
        this.error.set('לא ניתן לטעון את המשימות');
      }
    });
  }

  toggleAddForm() {
    this.isFormADDExpanded.update(val => !val);
    if (this.isFormADDExpanded()) {
      this.isEditing.set(false); 
      this.taskForm.reset();
    }
  }

  onEditClick(task: GetTasksResponse) {
    this.isEditing.set(true);
    this.isFormADDExpanded.set(true);
    this.currentProjectId = task.project_id;
    this.currentTaskId = task.id;
    let dueDate: Date | null = null;
    if (task.due_date) {
      dueDate = new Date(task.due_date);
    }
    this.updateTaskForm.setValue({
      title: task.title,
      description: task.description || '',
      status: task.status,
      priority: task.priority,
      assigneeId: task.assignee_id,
      dueDate: dueDate  
    });
  }

  onSubmitADD() {
    if (this.taskForm.valid && this.currentProjectId) {
      this.isCreatingTask.set(true);
      const formValue = this.taskForm.getRawValue();
      let finalDueDate = null;
      if (formValue.dueDate) {
        const dateObj = new Date(formValue.dueDate); 
        finalDueDate = dateObj.toISOString().split('T')[0];
      }
      const finalAssigneeId = formValue.assigneeId ? Number(formValue.assigneeId) : null;
      const newTask = {
        projectId: this.currentProjectId,
        title: formValue.title,
        description: formValue.description,
        status: formValue.status  as 'todo' | 'in_progress' | 'done',
        priority: formValue.priority as 'low' | 'normal' | 'high',
        assigneeId: finalAssigneeId,
        dueDate: finalDueDate,
        orderIndex: 0
      };
      
      this.taskService.postTask(newTask).subscribe({
        next: () => {
          this.isCreatingTask.set(false);
          Swal.fire({
            icon: 'success',
            title: 'המשימה נוצרה!',
            text: 'הוספנו את המשימה לרשימה בהצלחה',
            timer: 1500, 
            showConfirmButton: false
          });
          this.taskForm.reset();
          this.isFormADDExpanded.set(false);
        },
        error: (err) => {
          this.isCreatingTask.set(false);
          Swal.fire({
            icon: 'error',
            title: 'אופס...',
            text: 'משהו השתבש ביצירת המשימה. נסה שוב מאוחר יותר.',
            confirmButtonText: 'הבנתי',
            confirmButtonColor: '#d33'
          });
        }
      });
    }
  }

  onUpdateTask() {
    if (this.updateTaskForm.valid && this.currentTaskId) {
      this.isUpdatingTask.set(true);
      const formValue = this.updateTaskForm.getRawValue();
      let dueDateString = '';
      if (formValue.dueDate) {
        dueDateString = formValue.dueDate.toISOString().split('T')[0]; 
      }
      
      const updatedTask = {
        title: formValue.title,
        description: formValue.description,
        status: formValue.status as 'todo' | 'in_progress' | 'done',
        priority: formValue.priority as 'low' | 'normal' | 'high',
        assignee_id: Number(formValue.assigneeId),
        due_date: dueDateString,
      };

      this.taskService.patchTask(this.currentTaskId, updatedTask).subscribe({
        next: () => {
          this.isUpdatingTask.set(false);
          Swal.fire({
            icon: 'success',
            title: 'המשימה עודכנה!',
            text: 'המשימה עודכנה בהצלחה',
            timer: 1500,
            showConfirmButton: false
          });
          
          this.toggleAddForm();
        },
        error: (err) => {
          this.isUpdatingTask.set(false);
          Swal.fire({
            icon: 'error',
            title: 'אופס...',
            text: 'משהו השתבש בעדכון המשימה. נסה שוב מאוחר יותר.',
            confirmButtonText: 'הבנתי',
            confirmButtonColor: '#d33'
          });
        }
      });
    }
  }
  
  onSubmitDelete(taskId: number) {
    this.isDeletingTask.set(true);
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.isDeletingTask.set(false);
        Swal.fire({
          icon: 'success',
          title: 'המשימה נמחקה!',
          text: 'המשימה נמחקה בהצלחה',
          timer: 1500,
          showConfirmButton: false
        });
      },
      error: (err) => {
        this.isDeletingTask.set(false);
        Swal.fire({
          icon: 'error',
          title: 'אופס...',
          text: 'משהו השתבש במחיקת המשימה. נסה שוב מאוחר יותר.',
          confirmButtonText: 'הבנתי',
          confirmButtonColor: '#d33'
        });
      }
    });
  }

  openComments(taskId: number) {
    this.router.navigate(['/comments'], { queryParams: { taskId: taskId } });
  }
}