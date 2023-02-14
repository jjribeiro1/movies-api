import { ApiProperty } from '@nestjs/swagger';
import { IsPositive, IsString, MinLength } from 'class-validator';

export class CreateStreamingDto {
  @IsString()
  @MinLength(3, { message: 'Nome precisa ter pelo menos 3 caracteres' })
  @ApiProperty({
    description: 'Nome do streaming',
    example: 'HBO Plus',
  })
  name: string;

  @IsPositive({ message: 'Preço deve ser maior que 0' })
  @ApiProperty({
    description: 'Preço do streaming',
    example: 20,
  })
  price: number;
}
