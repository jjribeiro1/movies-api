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
} from '@nestjs/common';
import { StreamingService } from './streaming.service';
import { CreateStreamingDto } from './dto/create-streaming.dto';
import { UpdateStreamingDto } from './dto/update-streaming.dto';
import { handleException } from 'src/exceptions/handleException';
import { StreamingEntity } from './entities/streaming.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('streaming')
@Controller('streaming')
export class StreamingController {
  constructor(private readonly streamingService: StreamingService) {}

  @ApiOperation({
    summary: 'Criar um novo streaming',
  })
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
