import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private url = 'http://localhost:3000/';
  private httpClient = inject(HttpClient);
  public currentTasks$ : Observable<GetTasksResponse[]|null>;
  private currentTasksBehivorSubject : BehaviorSubject<GetTasksResponse[]|null> = new BehaviorSubject<GetTasksResponse[]|null>([]);
  

  constructor(){
    this.currentTasks$ = this.currentTasksBehivorSubject; 
  }
getTasksByProject(projectId:number){
    return this.httpClient.get<GetTasksResponse[]>(this.url + `api/tasks?projectId=${projectId}`).pipe(
      tap((tasks) => {
        this.currentTasksBehivorSubject.next(tasks);
      })
    );
}

postTask(task:CreateTaskRequest){
    return this.httpClient.post<GetTasksResponse>(this.url + 'api/tasks', task).pipe(
      tap(task => {
        const currentTasks = this.currentTasksBehivorSubject.getValue() || [];
        this.currentTasksBehivorSubject.next([...currentTasks, task]);
      })
    );
}
patchTask(taskId:number, task:UpdateTaskRequest){
    return this.httpClient.patch<GetTasksResponse>(this.url + `api/tasks/${taskId}`, task).pipe(
      tap(updatedTask => {
        const currentTasks = this.currentTasksBehivorSubject.getValue() || [];
        const updatedTasks = currentTasks.map(t => t.id === updatedTask.id ? updatedTask : t);
        this.currentTasksBehivorSubject.next(updatedTasks);
      })
    );

}
deleteTask(taskId:number){
    return this.httpClient.delete<void>(this.url + `api/tasks/${taskId}`).pipe(
      tap(() => {
        const currentTasks = this.currentTasksBehivorSubject.getValue() || [];
        const updatedTasks = currentTasks.filter(t => t.id !== taskId);
        this.currentTasksBehivorSubject.next(updatedTasks);
      })
    );
}
}



