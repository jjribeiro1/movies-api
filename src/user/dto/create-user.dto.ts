import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsEmail, IsNotEmpty } from 'class-validator';
import { IsValidCpf } from '../decorators/validCpf.decorator';
import { IsValidPassword } from '../decorators/validPassword.decorator';
import { IsValidRole } from '../decorators/validRole.decorator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome próprio do usuário',
    example: 'Lucas',
  })
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email do usuário, necessário para fazer login',
    example: 'seuemail@hotmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário, necessária para fazer login',
    example: 'suasenha123@',
  })
  @IsValidPassword()
  password: string;

  @ApiProperty({
    description: 'Cpf do usuário',
    example: '209.096.870-21',
  })
  @IsValidCpf()
  cpf: string;

  @ApiProperty({
    description: 'Nível de acesso do usuário',
    example: 'USER',
  })
  @IsValidRole(['ADMIN', 'USER'])
  role: string;
}
