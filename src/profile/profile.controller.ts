import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { handleException } from 'src/exceptions/handleException';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileEntity } from './entities/profile.entity';
import { ProfileService } from './profile.service';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({
    summary: 'Criar um novo perfil',
  })
  @Post()
  async create(@Body() dto: CreateProfileDto): Promise<ProfileEntity> {
    try {
      return await this.profileService.create(dto);
    } catch (error) {
      handleException(error);
    }
  }

  @ApiOperation({
    summary: 'Listar todos os perfis',
  })
  @Get()
  async findAll(): Promise<ProfileEntity[]> {
    try {
      return await this.profileService.findAll();
    } catch (error) {
      handleException(error);
    }
  }

  @ApiOperation({
    summary: 'Listar um perfil por ID',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProfileEntity> {
    try {
      return await this.profileService.findOne(id);
    } catch (error) {
      handleException(error);
    }
  }

  @ApiOperation({
    summary: 'Atualizar um perfil por ID',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProfileDto,
  ): Promise<ProfileEntity> {
    try {
      return await this.profileService.update(id, dto);
    } catch (error) {
      handleException(error);
    }
  }

  @ApiOperation({
    summary: 'Deletar um perfil por ID',
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      return await this.profileService.delete(id);
    } catch (error) {
      handleException(error);
    }
  }
}
