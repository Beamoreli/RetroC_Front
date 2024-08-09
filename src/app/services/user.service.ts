// user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getUserById(userId: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/usuarios/${userId}`);
  }

  updateUser(user: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseUrl}/usuarios/${user.id}`, user);
  }

  updateUserPassword(userId: number, novaSenha: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/usuarios/${userId}/atualizar-senha`, { novaSenha });
  }

  uploadUserPhoto(userId: number, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('photo', photo);

    return this.http.post(`${this.baseUrl}/usuarios/${userId}/upload-photo`, formData);
  }

  removeFromFavorites(userId: number, gameId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/usuarios/${userId}/favoritos/${gameId}`);
  }
}