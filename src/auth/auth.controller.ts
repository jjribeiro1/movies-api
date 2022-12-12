import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { handleException } from 'src/exceptions/handleException';
import { AuthService } from './auth.service';
import { LoginInputDto } from './dto/login-input.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({
    summary: 'Recebe um token ao fazer login',
  })
  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginInputDto) {
    try {
      return await this.authService.login(dto);
    } catch (error) {
      handleException(error);
    }
  }
}
