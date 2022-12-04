import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { handleException } from 'src/exceptions/handleException';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileEntity } from './entities/profile.entity';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async create(@Body() dto: CreateProfileDto): Promise<ProfileEntity> {
    try {
      return await this.profileService.create(dto);
    } catch (error) {
      handleException(error);
    }
  }

  @Get()
  async findAll(): Promise<ProfileEntity[]> {
    try {
      return await this.profileService.findAll();
    } catch (error) {
      handleException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProfileEntity> {
    try {
      return await this.profileService.findOne(id);
    } catch (error) {
      handleException(error);
    }
  }

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

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      return await this.profileService.delete(id);
    } catch (error) {
      handleException(error);
    }
  }
}
