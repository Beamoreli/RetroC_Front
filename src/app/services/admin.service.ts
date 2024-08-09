import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model'; // Importe o modelo de jogo aqui

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  addGame(game: Game): Observable<Game> {
    return this.http.post<Game>(`${this.baseUrl}/games/add`, game);
  }
}
