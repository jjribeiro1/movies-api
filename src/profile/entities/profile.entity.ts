import { MovieEntity } from 'src/movie/entities/movie.entity';
import { CreateProfileDto } from '../dto/create-profile.dto';

export class ProfileEntity extends CreateProfileDto {
  id: string;
  favoriteMoviesOnProfile?: MovieEntity;
}
