import { GenreEntity } from '../entities/genre.entity';
import { StreamingEntity } from '../entities/streaming.entity';

export class CreateMovieDto {
  name: string;
  imageUrl: string;
  releaseYear: number;
  ageRating: number;
  streamingIds: StreamingEntity[];
  genreIds: GenreEntity[];
}
