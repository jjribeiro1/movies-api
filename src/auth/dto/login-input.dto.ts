import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { IsValidPassword } from 'src/user/decorators/validPassword.decorator';

export class LoginInputDto {
  @IsEmail({}, { message: 'Email inválido' })
  @ApiProperty({
    description: 'email do usuario',
    example: 'seuemail@hotmail.com',
  })
  email: string;

  @IsValidPassword()
  @ApiProperty({
    description: 'senha do usuario',
    example: 'suasenha123@',
  })
  password: string;
}
