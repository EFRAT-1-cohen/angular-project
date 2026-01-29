import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { AddMemberModel, NameTeamModel, TeamsModel } from '../../models/teams.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private url = 'http://localhost:3000';
  private httpClient = inject(HttpClient);

  private teamSubject = new BehaviorSubject<TeamsModel[] | null>(null);
  public team$ = this.teamSubject.asObservable();

  constructor() {}

  getTeams() {
    return this.httpClient.get<TeamsModel[]>(`${this.url}/api/teams`)
      .pipe(
        tap(teams => {
          this.teamSubject.next(teams); 
        })
      );
  }

  postTeams(teamData: NameTeamModel) {
    return this.httpClient.post<TeamsModel>(`${this.url}/api/teams`, teamData).pipe(
      tap(() => {
        this.getTeams().subscribe(); 
      })
    );
  }

  addMemberToTeam(postmember: AddMemberModel, teamId: number) {
    return this.httpClient.post<void>(
      `${this.url}/api/teams/${teamId}/members`, 
      postmember
    ).pipe(
      tap(() => {
        const teams = this.teamSubject.getValue();
        if (teams) {
          const updatedTeams = teams.map(team => {
            if (team.id === teamId) {
              return { ...team, members_count: team.members_count + 1 };
            }
            return team;
          });
          this.teamSubject.next(updatedTeams);
        }
      })
    );
  }

  deleteTeam(teamId: number) {
    return this.httpClient.delete<void>(`${this.url}/api/teams/${teamId}`).pipe(
      tap(() => {
        const currentTeams = this.teamSubject.getValue() || [];
        const updatedTeams = currentTeams.filter(team => team.id !== teamId);
        this.teamSubject.next(updatedTeams);
      })
    );
  }
}