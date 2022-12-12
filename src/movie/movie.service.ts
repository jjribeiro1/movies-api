import { Injectable } from '@nestjs/common';
import { Exception, ExceptionsType } from 'src/exceptions/newException';
import { MovieRepository } from 'src/repositories/movie.repository';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieEntity } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}
  async create(dto: CreateMovieDto): Promise<MovieEntity> {
    const nameAlreadyExists = await this.movieRepository.findByName(dto.name);
    if (nameAlreadyExists) {
      throw new Exception(ExceptionsType.INVALIDDATA, 'name must be unique');
    }

    const imageUrlAlreadyExists = await this.movieRepository.findByImageUrl(
      dto.imageUrl,
    );
    if (imageUrlAlreadyExists) {
      throw new Exception(
        ExceptionsType.INVALIDDATA,
        'imageUrl must be unique',
      );
    }
    return await this.movieRepository.create(dto);
  }

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.findAll();
  }

  async findOne(id: string): Promise<MovieEntity> {
    return await this.movieRepository.findById(id);
  }

  async update(id: string, dto: UpdateMovieDto): Promise<MovieEntity> {
    await this.movieRepository.findById(id);
    const nameAlreadyExists = await this.movieRepository.findByName(dto.name);
    if (nameAlreadyExists) {
      throw new Exception(ExceptionsType.INVALIDDATA, 'name must be unique');
    }

    const imageUrlAlreadyExists = await this.movieRepository.findByImageUrl(
      dto.imageUrl,
    );
    if (imageUrlAlreadyExists) {
      throw new Exception(
        ExceptionsType.INVALIDDATA,
        'imageUrl must be unique',
      );
    }
    return await this.movieRepository.update(id, dto);
  }

  async remove(id: string): Promise<void> {
    await this.movieRepository.findById(id);
    return await this.movieRepository.delete(id);
  }
}
