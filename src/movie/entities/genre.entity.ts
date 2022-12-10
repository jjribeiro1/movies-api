import { MovieEntity } from './movie.entity';

export class GenreEntity {
  id: string;
  name: string;
  movies?: MovieEntity[];
}
