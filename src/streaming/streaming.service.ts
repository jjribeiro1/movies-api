import { Injectable } from '@nestjs/common';
import { Exception, ExceptionsType } from 'src/exceptions/newException';
import { StreamingRepository } from 'src/repositories/streaming.repository';
import { CreateStreamingDto } from './dto/create-streaming.dto';
import { UpdateStreamingDto } from './dto/update-streaming.dto';
import { StreamingEntity } from './entities/streaming.entity';

@Injectable()
export class StreamingService {
  constructor(private readonly streamingRepository: StreamingRepository) {}
  async create(dto: CreateStreamingDto): Promise<StreamingEntity> {
    await this.validateData(dto.name);
    return await this.streamingRepository.create(dto);
  }

  async findAll(): Promise<StreamingEntity[]> {
    return await this.streamingRepository.findAll();
  }

  async findOne(id: string): Promise<StreamingEntity> {
    return await this.streamingRepository.findById(id);
  }

  async update(id: string, dto: UpdateStreamingDto): Promise<StreamingEntity> {
    await this.findOne(id);
    if (dto.name) {
      await this.validateData(dto.name);
    }

    return await this.streamingRepository.update(id, dto);
  }

  async remove(id: string): Promise<void> {
    await this.streamingRepository.findById(id);
    return await this.streamingRepository.delete(id);
  }

  async validateData(name: string): Promise<void> {
    const nameAlreadyExists = await this.streamingRepository.findByName(name);
    if (nameAlreadyExists) {
      throw new Exception(
        ExceptionsType.INVALIDDATA,
        'Esse nome já está em uso',
      );
    }
  }
}
