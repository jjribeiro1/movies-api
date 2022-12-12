import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateStreamingDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do streaming',
    example: 'HBO Plus',
  })
  name: string;

  @IsNumber()
  @ApiProperty({
    description: 'Preço do streaming',
    example: 20,
  })
  price: number;
}
