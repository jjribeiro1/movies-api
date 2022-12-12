import { Body, Controller, Post } from '@nestjs/common';
import { handleException } from 'src/exceptions/handleException';
import { AuthService } from './auth.service';
import { LoginInputDto } from './dto/login-input.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async login(@Body() dto: LoginInputDto) {
    try {
      return await this.authService.login(dto);
    } catch (error) {
      handleException(error);
    }
  }
}
