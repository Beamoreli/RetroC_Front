import { Role } from './role.model';
import { Game } from './game.model';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  novaSenha?: string;
  roles: Role[];
  jogos: Game[];
  favoritos: Game[];
  jogosFavoritos: Game[]; 
  foto?:string;
}
