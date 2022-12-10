import { GenreEntity } from '../../genre/entities/genre.entity';
import { StreamingEntity } from './streaming.entity';

export class MovieEntity {
  id: string;
  name: string;
  imageUrl: string;
  releaseYear: number;
  ageRating: number;
  stream: StreamingEntity[];
  genres: GenreEntity[];
}
