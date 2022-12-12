import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  @MinLength(3)
  @ApiProperty({
    description: 'nome do gênero',
    example: 'ficção científica',
  })
  name: string;
}
