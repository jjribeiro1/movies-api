import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({
    description: 'Nome do perfil',
    example: 'perfil 1',
  })
  name: string;

  @ApiProperty({
    description: 'Url da imagem do perfil',
    example: 'imagem.png',
  })
  imageUrl: string;

  @ApiProperty({
    description: 'ID do usuário que criou o perfil',
    example: 'd5b7ade1-679c-4e38-a6da-4298f49aef62',
  })
  userId: string;
}
