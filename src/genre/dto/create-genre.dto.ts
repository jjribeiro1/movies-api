import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateGenreDto {
  @IsString({ message: 'Nome precisa ser uma string' })
  @MinLength(3, { message: 'Nome precisa ter pelo menos 3 caracteres' })
  @ApiProperty({
    description: 'nome do gênero',
    example: 'ficção científica',
  })
  name: string;
}
