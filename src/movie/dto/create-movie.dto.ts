export class CreateMovieDto {
  name: string;
  imageUrl: string;
  releaseYear: number;
  ageRating: number;
  streamingIds: string[];
  genreIds: string[];
}
