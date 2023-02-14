import { ApiProperty } from '@nestjs/swagger';
import {
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateMovieDto {
  @IsString({ message: 'Nome precisa ser uma string' })
  @MinLength(3, { message: 'Nome precisa ter pelo menos 3 caracteres' })
  @ApiProperty({
    description: 'Nome do filme',
    example: 'Vingadores',
  })
  name: string;

  @IsUrl({ _x: '' }, { message: 'Url da imagem precisa ser uma Url válida' })
  @ApiProperty({
    description: 'Url da imagem do filme',
    example: 'vingadores.png',
  })
  imageUrl: string;

  @IsPositive({ message: 'Ano de lançamento deve ser maior que 0' })
  @ApiProperty({
    description: 'Ano de lançamento do filme',
    example: 2012,
  })
  releaseYear: number;

  @IsPositive({ message: 'Classificação de idade deve ser maior que 0' })
  @ApiProperty({
    description: 'Classificação etária do filme',
    example: 13,
  })
  ageRating: number;

  @IsUUID('all', {
    each: true,
    message: 'Id dos streaming precisam ser um UUID',
  })
  @ApiProperty({
    description: 'ID de um ou mais streaming',
    example: [
      '4bf57eb2-d16b-4913-85d2-24ff45adab59',
      '91a3df25-1239-490e-86bb-bfd83e4a7980',
    ],
  })
  streamingIds: string[];

  @IsUUID('all', { each: true, message: 'Id dos gêneros precisam ser um UUID' })
  @ApiProperty({
    description: 'ID de um ou mais gênero',
    example: [
      '0203266f-7bea-4eb6-856e-f0a41e961210',
      'f4c4535d-128e-4672-92c6-d5b7800f855d',
    ],
  })
  genreIds: string[];
}
