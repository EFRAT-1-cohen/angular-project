import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'; 
import { tap } from 'rxjs/operators'; 
import { AuthLoginModel, AuthModel, AuthResponseModel, UserModel } from '../../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3000';
  private httpClient = inject(HttpClient);
  
  private userSubject = new BehaviorSubject<UserModel | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor() {}

  register(registerData: AuthModel) {
    return this.httpClient.post<AuthResponseModel>(`${this.url}/api/auth/register`, registerData).pipe(
      tap(data => {
        sessionStorage.setItem('token', data.token);
        this.userSubject.next(data.user);
      })
    );
  }

  login(loginData: AuthLoginModel) {
    return this.httpClient.post<AuthResponseModel>(`${this.url}/api/auth/login`, loginData).pipe(
      tap(data => {
        sessionStorage.setItem('token', data.token);
        this.userSubject.next(data.user);
      })
    );
  }
  logout() {
    sessionStorage.removeItem('token');
    this.userSubject.next(null);
  }
   getCurrentUser() {
    return this.httpClient.get<UserModel>(`${this.url}/api/auth/me`).pipe(
      tap(user => {
        this.userSubject.next(user);
      })
    );
  }

  getUserFromToken() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.getCurrentUser().subscribe({
        error: () => this.logout()
      });
    }
  }
}