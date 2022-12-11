import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { handleException } from 'src/exceptions/handleException';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Criar um novo usuário',
  })
  @Post()
  async create(@Body() dto: CreateUserDto): Promise<UserEntity> {
    try {
      return await this.userService.create(dto);
    } catch (error) {
      handleException(error);
    }
  }

  @ApiOperation({
    summary: 'Listar todos os usuários',
  })
  @Get()
  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.userService.findAll();
    } catch (error) {
      handleException(error);
    }
  }

  @ApiOperation({
    summary: 'Listar um usuário por ID',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    try {
      return await this.userService.findOne(id);
    } catch (error) {
      handleException(error);
    }
  }

  @ApiOperation({
    summary: 'Atualizar um usuário por ID',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserEntity> {
    try {
      return await this.userService.update(id, dto);
    } catch (error) {
      handleException(error);
    }
  }

  @ApiOperation({
    summary: 'Deletar um usuário por ID',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    try {
      return await this.userService.remove(id);
    } catch (error) {
      handleException(error);
    }
  }
}
