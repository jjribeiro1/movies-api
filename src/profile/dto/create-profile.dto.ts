import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsUUID, MinLength } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({
    description: 'Nome do perfil',
    example: 'perfil 1',
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    description: 'Url da imagem do perfil',
    example: 'imagem.png',
  })
  @IsUrl()
  imageUrl: string;

  @ApiProperty({
    description: 'ID do usuário que criou o perfil',
    example: 'd5b7ade1-679c-4e38-a6da-4298f49aef62',
  })
  @IsUUID()
  userId: string;
}
