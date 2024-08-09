import { Component, OnInit } from '@angular/core';

import { GameService } from '../../services/game.service';
import { Game } from '../../models/game.model';
import { Genero } from '../../models/genero.model';
import { Console } from '../../models/console.model';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.component.html',
  styleUrls: ['./all-games.component.css'],
})
export class AllGamesComponent implements OnInit {
  games: Game[] = [];
  generos: Genero[] = [];
  consoles: Console[] = [];

  selectedGenero: number | null = null;
  selectedConsole: number | null = null;

  favoriteGames: number[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.loadGames();
    this.loadGeneros(); 


    
    this.loadConsoles();
  }

  loadGames(): void {
    this.gameService.getGames().subscribe(
      (data) => {
        this.games = data;
        this.loadFavoriteGames();
      },
      (error) => {
        console.error('Erro ao carregar jogos', error);
      }
    );
  }

  loadFavoriteGames(): void {
    const userId = 1;

    this.gameService.getFavorites(userId).subscribe(
      (data) => {
        this.favoriteGames = data.map((game) => game.id);
      },
      (error) => {
        console.error('Erro ao carregar jogos favoritos', error);
      }
    );
  }

  loadGeneros(): void {
    this.gameService.getGeneros().subscribe(
      (data) => {
        this.generos = data;
      },
      (error) => {
        console.error('Erro ao carregar gêneros', error);
      }
    );
  }

  loadConsoles(): void {
    this.gameService.getConsoles().subscribe(
      (data) => {
        this.consoles = data;
      },
      (error) => {
        console.error('Erro ao carregar consoles', error);
      }
    );
  }

  applyFilters(): void {
    this.gameService
      .filterGames(this.selectedGenero, this.selectedConsole)
      .subscribe(
        (data) => {
          this.games = data;
        },
        (error) => {
          console.error('Erro ao filtrar jogos', error);
        }
      );
  }

  toggleFavorite(gameId: number): void {
    const userId = 1; 

    if (this.isFavorite(gameId)) {
      this.gameService.removeFromFavorites(userId, gameId).subscribe(
        () => {
          this.favoriteGames = this.favoriteGames.filter((id) => id !== gameId);
        },
        (error) => {
          console.error('Erro ao remover dos favoritos', error);
        }
      );
    } else {
      this.gameService.addToFavorites(userId, gameId).subscribe(
        () => {
          this.favoriteGames.push(gameId);
        },
        (error) => {
          console.error('Erro ao adicionar aos favoritos', error);
        }
      );
    }
  }

  isFavorite(gameId: number): boolean {
    return this.favoriteGames.includes(gameId);
  }
}
