import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { handleException } from 'src/exceptions/handleException';
import { GenreEntity } from './entities/genre.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AccessLevel, Roles } from 'src/auth/access-level.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('genre')
@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @ApiOperation({
    summary: 'Criar um novo gênero',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AccessLevel(Roles.ADMIN)
  @Post()
  async create(@Body() dto: CreateGenreDto): Promise<GenreEntity> {
    try {
      return await this.genreService.create(dto);
    } catch (error) {
      handleException(error);
    }
  }

  @ApiOperation({
    summary: 'Listar todos os gêneros',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AccessLevel(Roles.USER, Roles.ADMIN)
  @Get()
  async findAll(): Promise<GenreEntity[]> {
    try {
      return await this.genreService.findAll();
    } catch (error) {
      handleException(error);
    }
  }

  @ApiOperation({
    summary: 'Listar um gênero por ID',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AccessLevel(Roles.USER, Roles.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GenreEntity> {
    try {
      return await this.genreService.findOne(id);
    } catch (error) {
      handleException(error);
    }
  }

  @ApiOperation({
    summary: 'Atualizar um gênero por ID',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AccessLevel(Roles.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateGenreDto,
  ): Promise<GenreEntity> {
    try {
      return await this.genreService.update(id, dto);
    } catch (error) {
      handleException(error);
    }
  }

  @ApiOperation({
    summary: 'Deletar um gênero por ID',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AccessLevel(Roles.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    try {
      return await this.genreService.remove(id);
    } catch (error) {
      handleException(error);
    }
  }
}
