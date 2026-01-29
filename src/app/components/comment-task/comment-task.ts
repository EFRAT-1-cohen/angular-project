import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CommentModel, PostCommentModel } from '../../models/comment.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommentService } from '../../services/comment-service/comment-service';
import { AuthService } from '../../services/auth-service/auth-service';

@Component({
  selector: 'app-comment-task',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule
  ],
  templateUrl: './comment-task.html',
  styleUrl: './comment-task.css'
})
export class CommentTask implements OnInit {
  private route = inject(ActivatedRoute);
  private commentService = inject(CommentService);
  private authService = inject(AuthService);
  comments$ = this.commentService.comment$;
  taskId: number | null = null;
  
  currentUserId: number | null = null; 

  commentControl = new FormControl('', [Validators.required]);

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

 ngOnInit() {
  this.authService.user$.subscribe(user => {
    this.currentUserId = user?.id ?? null;
  });

  this.route.queryParams.subscribe(params => {
    this.taskId = Number(params['taskId']);
    if (this.taskId) {
      this.commentService.getCommentsByTaskId(this.taskId).subscribe(() => {
        setTimeout(() => this.scrollToBottom(), 100);
      });
    }
  });
}

 sendMessage() {
  if (this.commentControl.invalid || !this.taskId) return;

  const text = this.commentControl.value!;

  const commentData: PostCommentModel = {
    taskId: this.taskId,
    body: text
  };

  this.commentService.postComment(commentData).subscribe({
    next: () => {
      this.commentControl.reset();
      setTimeout(() => this.scrollToBottom(), 100);
    }
  });
}

  private scrollToBottom(): void {
    try {
      if (this.scrollContainer) {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      }
    } catch(err) { }
  }
}