import { inject, Injectable } from '@angular/core';
import { UserModel } from '../../models/auth.model';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CreateProjectModel, ProjectModel } from '../../models/projects.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private url = 'http://localhost:3000';
  private httpClient=inject(HttpClient);
  private projectSubject = new BehaviorSubject<ProjectModel[] | null>(null);
  public project$ = this.projectSubject.asObservable();
  constructor() {}
  
  getProject(){
    return this.httpClient.get<ProjectModel[]>(`${this.url}/api/projects`).pipe(
      tap((projects)=>{this.projectSubject.next(projects);})
    )
  }
  getProjectsByTeam(teamId: number){
    return this.httpClient.get<ProjectModel[]>(`${this.url}/api/projects?teamId=${teamId}`).pipe(
      tap((projects)=>{this.projectSubject.next(projects);})
    )
  }
  
postProject(projectData: CreateProjectModel) {
    return this.httpClient.post<ProjectModel>(`${this.url}/api/projects`, projectData).pipe(
      tap((newProject) => {
        const currentProjects = this.projectSubject.getValue() || [];
        this.projectSubject.next([...currentProjects, newProject]);
      })
    );
  }
 }