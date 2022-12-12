import { ApiProperty } from '@nestjs/swagger';
import { IsValidCpf } from 'src/user/decorators/validCpf.decorator';
import { IsValidPassword } from 'src/user/decorators/validPassword.decorator';

export class LoginInputDto {
  @IsValidCpf()
  @ApiProperty({
    description: 'cpf do usuario',
    example: '87462578026',
  })
  cpf: string;

  @IsValidPassword()
  @ApiProperty({
    description: 'senha do usuario',
    example: 'senha123@',
  })
  password: string;
}
