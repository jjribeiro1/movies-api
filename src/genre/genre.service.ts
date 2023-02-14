import { Injectable } from '@nestjs/common';
import { Exception, ExceptionsType } from 'src/exceptions/newException';
import { GenreRepository } from 'src/repositories/genre.repository';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { GenreEntity } from './entities/genre.entity';

@Injectable()
export class GenreService {
  constructor(private readonly genreRepository: GenreRepository) {}
  async create(dto: CreateGenreDto): Promise<GenreEntity> {
    await this.validateData(dto.name);
    return await this.genreRepository.create(dto);
  }

  async findAll(): Promise<GenreEntity[]> {
    return await this.genreRepository.findAll();
  }

  async findOne(id: string): Promise<GenreEntity> {
    return await this.genreRepository.findById(id);
  }

  async update(id: string, dto: UpdateGenreDto): Promise<GenreEntity> {
    await this.findOne(id);
    await this.validateData(dto.name);
    return await this.genreRepository.update(id, dto);
  }

  async remove(id: string): Promise<void> {
    await this.genreRepository.findById(id);
    return await this.genreRepository.delete(id);
  }

  async validateData(name: string): Promise<void> {
    const nameAlreadyExists = await this.genreRepository.findByName(name);
    if (nameAlreadyExists) {
      throw new Exception(
        ExceptionsType.INVALIDDATA,
        'Esse nome já está em uso',
      );
    }
  }
}
