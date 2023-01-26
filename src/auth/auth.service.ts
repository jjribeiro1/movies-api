import { Injectable } from '@nestjs/common/decorators';
import { LoginInputDto } from './dto/login-input.dto';
import { compare } from 'bcrypt';
import { LoginOutPutDto } from './dto/login-output.dto';
import { Exception, ExceptionsType } from 'src/exceptions/newException';
import { UserRepository } from 'src/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwt: JwtService,
  ) {}

  async login(dto: LoginInputDto): Promise<LoginOutPutDto> {
    const { email, password } = dto;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Exception(
        ExceptionsType.UNAUTHORIZED,
        'email or password invalid',
      );
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new Exception(
        ExceptionsType.UNAUTHORIZED,
        'email or password invalid',
      );
    }

    delete user.password;

    return {
      user,
      token: this.jwt.sign({
        sub: user.id,
        email: user.email,
        cpf: user.cpf,
      }),
    };
  }
}
