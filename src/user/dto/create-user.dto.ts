import { IsString, MinLength, IsEmail, IsNotEmpty } from 'class-validator';
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

  cpf: string;

  role: string;
}
