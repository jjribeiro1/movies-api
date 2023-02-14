import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsUUID, MinLength } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({
    description: 'Nome do perfil',
    example: 'perfil 1',
  })
  @IsString({ message: 'Nome precisa ser uma string' })
  @MinLength(3, { message: 'Nome precisa ter pelo menos 3 caracteres' })
  name: string;

  @ApiProperty({
    description: 'Url da imagem do perfil',
    example: 'imagem.png',
  })
  @IsUrl({ _x: '' }, { message: 'Url da imagem precisa ser uma Url válida' })
  imageUrl: string;

  @ApiProperty({
    description: 'ID do usuário que criou o perfil',
    example: 'd5b7ade1-679c-4e38-a6da-4298f49aef62',
  })
  @IsUUID('all', { message: 'Id do usuário precisa ser um UUID' })
  userId: string;
}
