import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Teams } from './components/teams/teams';
import { TeamProjects } from './components/team-projects/team-projects';
import { TaskProject } from './components/task-project/task-project';
import { CommentTask } from './components/comment-task/comment-task';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'teams', pathMatch: 'full' },
  
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'teams', component: Teams, canActivate: [authGuard] },
  { path: 'projects', component: TeamProjects, canActivate: [authGuard] },
  { path: 'tasks', component: TaskProject, canActivate: [authGuard] },
  { path: 'comments', component: CommentTask, canActivate: [authGuard] },
  { path: '**', redirectTo: 'teams' }
];