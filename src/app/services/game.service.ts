import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';
import { Genero } from '../models/genero.model';
import { Console } from '../models/console.model';
import { Distribuidora } from '../models/distribuidora.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.baseUrl}/games`);
  }

  getFavorites(userId: number): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.baseUrl}/games/favorites/${userId}`);
  }

  addToFavorites(userId: number, gameId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/games/favorites`, { userId, gameId });
  }

  removeFromFavorites(userId: number, gameId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/games/favorites/${userId}/${gameId}`);
  }

  getGamesByGenero(generoId: number): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.baseUrl}/games/genero/${generoId}`);
  }

  getGeneros(): Observable<Genero[]> {
    return this.http.get<Genero[]>(`${this.baseUrl}/generos`);
  }

  getConsoles(): Observable<Console[]> {
    return this.http.get<Console[]>(`${this.baseUrl}/consoles`);
  }

  getDistribuidoras(): Observable<Distribuidora[]> {
    return this.http.get<Distribuidora[]>(`${this.baseUrl}/distribuidoras`);
  }

  filterGames(generoId: number | null, consoleId: number | null): Observable<Game[]> {
    let url = `${this.baseUrl}/games`;

    if (generoId) {
      url += `/genero/${generoId}`;
    }

    if (consoleId) {
      url += `/console/${consoleId}`;
    }

    return this.http.get<Game[]>(url);
  }
}
