import { IsString, MinLength, IsEmail, IsNotEmpty } from 'class-validator';
import { IsValidCpf } from '../decorators/validCpf.decorator';
import { IsValidPassword } from '../decorators/validPassword.decorator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsValidPassword()
  password: string;

  @IsValidCpf()
  cpf: string;

  role: string;
}
