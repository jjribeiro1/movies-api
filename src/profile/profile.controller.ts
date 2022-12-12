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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessLevel, Roles } from 'src/auth/access-level.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { handleException } from 'src/exceptions/handleException';
import { CreateProfileDto } from './dto/create-profile.dto';
import {
  AddOrRemoveFavoriteMovieDto,
  FavoriteMovieResponse,
} from './dto/favorite-movie.dto.';
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
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AccessLevel(Roles.USER, Roles.ADMIN)
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
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AccessLevel(Roles.USER, Roles.ADMIN)
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
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AccessLevel(Roles.USER, Roles.ADMIN)
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
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AccessLevel(Roles.USER, Roles.ADMIN)
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
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AccessLevel(Roles.USER, Roles.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    try {
      return await this.profileService.remove(id);
    } catch (error) {
      handleException(error);
    }
  }

  @ApiOperation({
    summary: 'Favoritar um filme',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AccessLevel(Roles.USER, Roles.ADMIN)
  @Post('/add-favorite')
  async addFavorite(
    @Body() dto: AddOrRemoveFavoriteMovieDto,
  ): Promise<FavoriteMovieResponse> {
    try {
      return await this.profileService.addFavoriteMovie(dto);
    } catch (error) {
      handleException(error);
    }
  }

  @ApiOperation({
    summary: 'Remover um filme dos favoritos',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AccessLevel(Roles.USER, Roles.ADMIN)
  @Post('/remove-favorite')
  async removeFavorite(
    @Body() dto: AddOrRemoveFavoriteMovieDto,
  ): Promise<FavoriteMovieResponse> {
    try {
      return await this.profileService.removeFavoriteMovie(dto);
    } catch (error) {
      handleException(error);
    }
  }
}
