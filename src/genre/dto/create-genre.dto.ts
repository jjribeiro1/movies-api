import { IsString, MinLength } from 'class-validator';
import { IsUnique } from 'src/user/decorators/IsUnique.decorator';

export class CreateGenreDto {
  @IsString()
  @MinLength(3)
  @IsUnique('genre')
  name: string;
}
