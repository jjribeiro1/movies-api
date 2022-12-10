import { MovieEntity } from '../../movie/entities/movie.entity';

export class GenreEntity {
  id: string;
  name: string;
  movies?: MovieEntity[];
}
