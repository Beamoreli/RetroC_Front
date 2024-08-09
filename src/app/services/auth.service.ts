import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080'; // Base URL do backend

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token); 
      })
    );
  }
  

  register(user: { name: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, user);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role && payload.role === 'ADMIN'; // Verifica se o papel é ADMIN
  }
}
