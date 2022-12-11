import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { IsUnique } from 'src/user/decorators/IsUnique.decorator';

export class CreateGenreDto {
  @IsString()
  @MinLength(3)
  @IsUnique('genre')
  @ApiProperty({
    description: 'nome do gênero',
    example: 'ficção científica',
  })
  name: string;
}
