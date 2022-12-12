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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('streaming')
@Controller('streaming')
export class StreamingController {
  constructor(private readonly streamingService: StreamingService) {}

  @ApiOperation({
    summary: 'Criar um novo streaming',
  })
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
