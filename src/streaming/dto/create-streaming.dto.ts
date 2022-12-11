import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { IsUnique } from 'src/user/decorators/IsUnique.decorator';

export class CreateStreamingDto {
  @IsString()
  @IsUnique('streaming')
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
