import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { MovieEntity } from 'src/movie/entities/movie.entity';

export class AddOrRemoveFavoriteMovieDto {
  @ApiProperty({
    description:
      'ID do perfil que vai adicionar ou remover o filme dos favoritos',
    example: '07ba36d3-a8de-4426-9132-8d3986a0b439',
  })
  @IsUUID('all', { message: 'Id do perfil do usuário precisa ser um UUID' })
  profileId: string;

  @ApiProperty({
    description: 'ID do filme que vai ser adicionado ou removido dos favoritos',
    example: '37a3567d-21fa-4a7c-b081-3d07191940a7',
  })
  @IsUUID('all', { message: 'Id do filme precisa ser um UUID' })
  movieId: string;
}

export class FavoriteMovieResponse {
  favoriteMoviesOnProfile: MovieEntity[];
}
