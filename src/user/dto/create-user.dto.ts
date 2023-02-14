import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsEmail } from 'class-validator';
import { IsValidCpf } from '../decorators/validCpf.decorator';
import { IsValidPassword } from '../decorators/validPassword.decorator';
import { IsValidRole } from '../decorators/validRole.decorator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome próprio do usuário',
    example: 'Lucas',
  })
  @IsString({ message: 'Nome precisa ser uma string' })
  @MinLength(3, { message: 'Nome precisa ter pelo menos 3 caracteres' })
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'seuemail@hotmail.com',
  })
  @IsEmail({ message: 'Email inválido' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário, necessária para fazer login',
    example: 'suasenha123@',
  })
  @IsValidPassword()
  password: string;

  @ApiProperty({
    description: 'Cpf do usuário, necessário para fazer login',
    example: '20909687021',
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
