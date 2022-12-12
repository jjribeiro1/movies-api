import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { StreamingService } from './streaming.service';
import { CreateStreamingDto } from './dto/create-streaming.dto';
import { UpdateStreamingDto } from './dto/update-streaming.dto';
import { handleException } from 'src/exceptions/handleException';
import { StreamingEntity } from './entities/streaming.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AccessLevel, Roles } from 'src/auth/access-level.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('streaming')
@Controller('streaming')
export class StreamingController {
  constructor(private readonly streamingService: StreamingService) {}

  @ApiOperation({
    summary: 'Criar um novo streaming',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AccessLevel(Roles.ADMIN)
  @Post()
  async create(@Body() dto: CreateStreamingDto): Promise<StreamingEntity> {
    try {
      return await this.streamingService.create(dto);
    } catch (error) {
      handleException(error);
    }
  }

  @ApiOperation({
    summary: 'Listar todos os streaming',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AccessLevel(Roles.USER, Roles.ADMIN)
  @Get()
  async findAll(): Promise<StreamingEntity[]> {
    try {
      return await this.streamingService.findAll();
    } catch (error) {
      handleException(error);
    }
  }

  @ApiOperation({
    summary: 'Listar um streaming ID',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AccessLevel(Roles.USER, Roles.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<StreamingEntity> {
    try {
      return await this.streamingService.findOne(id);
    } catch (error) {
      handleException(error);
    }
  }

  @ApiOperation({
    summary: 'Atualizar um streaming por ID',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AccessLevel(Roles.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateStreamingDto,
  ): Promise<StreamingEntity> {
    try {
      return await this.streamingService.update(id, dto);
    } catch (error) {
      handleException(error);
    }
  }

  @ApiOperation({
    summary: 'Deletar um streaming por ID',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AccessLevel(Roles.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    try {
      return await this.streamingService.remove(id);
    } catch (error) {
      handleException(error);
    }
  }
}
