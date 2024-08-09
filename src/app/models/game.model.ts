import { Console } from './console.model';
import { Distribuidora } from './distribuidora.model';
import { Genero } from './genero.model';

export interface Game {
  id: number;
  nome: string;
  imagem: string;
  anoLancamento: number;
  console: Console;
  distribuidora: Distribuidora;
  generos: Genero[];
}
