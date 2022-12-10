import { Injectable } from '@nestjs/common';
import { MovieRepository } from 'src/repositories/movie.repository';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieEntity } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}
  async create(dto: CreateMovieDto): Promise<MovieEntity> {
    return await this.movieRepository.create(dto);
  }

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.findAll();
  }

  async findOne(id: string): Promise<MovieEntity> {
    return await this.movieRepository.findById(id);
  }

  async update(id: string, dto: UpdateMovieDto): Promise<MovieEntity> {
    return await this.movieRepository.update(id, dto);
  }

  async remove(id: string): Promise<void> {
    return await this.movieRepository.delete(id);
  }
}
