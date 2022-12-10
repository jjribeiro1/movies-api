import { MovieEntity } from './movie.entity';

export class StreamingEntity {
  id: string;
  name: string;
  price: number;
  movies?: MovieEntity[];
}
