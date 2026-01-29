import { inject, Injectable } from '@angular/core';
import { CommentModel, PostCommentModel } from '../../models/comment.model';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private url = 'http://localhost:3000';
  private httpClient=inject(HttpClient);
  private commentSubject = new BehaviorSubject<CommentModel[] | null>(null);
  public comment$ = this.commentSubject.asObservable();
  constructor() {}
  getCommentsByTaskId(taskId: number) {
    return this.httpClient
      .get<CommentModel[]>(this.url + `/api/comments?taskId=${taskId}`).pipe(
        tap((comments) => {
          this.commentSubject.next(comments);
        })
      );
  }
  postComment(comment: PostCommentModel) {
    return this.httpClient
      .post<CommentModel>(this.url + '/api/comments', comment)
      .pipe(
        tap((newComment) => {
          const currentComments = this.commentSubject.getValue() || [];
          this.commentSubject.next([...currentComments, newComment]);
        })
      );
  }
}
