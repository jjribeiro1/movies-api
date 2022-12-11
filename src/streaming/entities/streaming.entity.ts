import { MovieEntity } from '../../movie/entities/movie.entity';

export class StreamingEntity {
  id: string;
  name: string;
  price: number;
  movies?: MovieEntity[];
}
