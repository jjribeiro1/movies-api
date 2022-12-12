import { Injectable } from '@nestjs/common/decorators';
import { LoginInputDto } from './dto/login-input.dto';
import { compare } from 'bcrypt';
import { LoginOutPutDto } from './dto/login-output.dto';
import { Exception, ExceptionsType } from 'src/exceptions/newException';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(dto: LoginInputDto): Promise<LoginOutPutDto> {
    const { cpf, password } = dto;

    const user = await this.userRepository.findByCpf(cpf);

    if (!user) {
      throw new Exception(
        ExceptionsType.UNAUTHORIZED,
        'cpf or password invalid',
      );
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new Exception(
        ExceptionsType.UNAUTHORIZED,
        'cpf or password invalid',
      );
    }

    delete user.password;

    return {
      user,
      token: 'token jwt',
    };
  }
}
