import { IsValidCpf } from 'src/user/decorators/validCpf.decorator';
import { IsValidPassword } from 'src/user/decorators/validPassword.decorator';

export class LoginInputDto {
  @IsValidCpf()
  cpf: string;

  @IsValidPassword()
  password: string;
}
