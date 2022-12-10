import { Injectable } from '@nestjs/common';
import { GenreRepository } from 'src/repositories/genre.repository';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { GenreEntity } from './entities/genre.entity';

@Injectable()
export class GenreService {
  constructor(private readonly genreRepository: GenreRepository) {}
  async create(dto: CreateGenreDto): Promise<GenreEntity> {
    return await this.genreRepository.create(dto);
  }

  async findAll(): Promise<GenreEntity[]> {
    return await this.genreRepository.findAll();
  }

  async findOne(id: string): Promise<GenreEntity> {
    return await this.genreRepository.findById(id);
  }

  async update(id: string, dto: UpdateGenreDto): Promise<GenreEntity> {
    return await this.genreRepository.update(id, dto);
  }

  async remove(id: string): Promise<void> {
    return await this.genreRepository.delete(id);
  }
}
