import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { IsValidPassword } from 'src/user/decorators/validPassword.decorator';

export class LoginInputDto {
  @IsEmail()
  @ApiProperty({
    description: 'email do usuario',
    example: 'email@email.com',
  })
  email: string;

  @IsValidPassword()
  @ApiProperty({
    description: 'senha do usuario',
    example: 'senha123@',
  })
  password: string;
}
