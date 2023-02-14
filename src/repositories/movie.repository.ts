import { Injectable } from '@nestjs/common';
import { Exception, ExceptionsType } from 'src/exceptions/newException';
import { CreateMovieDto } from 'src/movie/dto/create-movie.dto';
import { UpdateMovieDto } from 'src/movie/dto/update-movie.dto';
import { MovieEntity } from 'src/movie/entities/movie.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MovieRepository {
  private readonly movieSelect = {
    id: true,
    name: true,
    imageUrl: true,
    releaseYear: true,
    ageRating: true,
    stream: true,
    genres: true,
  };
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMovieDto): Promise<MovieEntity> {
    try {
      const { name, imageUrl, ageRating, releaseYear, streamingIds, genreIds } =
        dto;

      const createdMovie = await this.prisma.movie.create({
        data: {
          name,
          imageUrl,
          ageRating,
          releaseYear,
          stream: {
            connect: streamingIds.map((id) => ({ id: id })),
          },
          genres: {
            connect: genreIds.map((id) => ({ id: id })),
          },
        },
        select: this.movieSelect,
      });

      return createdMovie;
    } catch (error) {
      console.log(error);

      throw new Exception(
        ExceptionsType.INVALIDDATA,
        'Error ao tentar criar um filme',
      );
    }
  }

  async findAll(): Promise<MovieEntity[]> {
    try {
      const movies = await this.prisma.movie.findMany({
        select: {
          ...this.movieSelect,
        },
      });

      return movies;
    } catch (error) {
      throw new Exception(ExceptionsType.DATABASE);
    }
  }

  async findById(id: string): Promise<MovieEntity> {
    try {
      const movie = await this.prisma.movie.findUniqueOrThrow({
        where: { id },
        select: this.movieSelect,
      });

      return movie;
    } catch (error) {
      throw new Exception(ExceptionsType.NOTFOUND, error.message);
    }
  }

  async findByName(name: string): Promise<MovieEntity> {
    const movie = await this.prisma.movie.findUnique({
      where: { name },
      select: this.movieSelect,
    });

    return movie;
  }

  async findByImageUrl(imageUrl: string): Promise<MovieEntity> {
    const movie = await this.prisma.movie.findUnique({
      where: { imageUrl },
      select: this.movieSelect,
    });

    return movie;
  }

  async update(id: string, dto: UpdateMovieDto): Promise<MovieEntity> {
    const { name, imageUrl, ageRating, releaseYear, genreIds, streamingIds } =
      dto;
    try {
      const updatedMovie = await this.prisma.movie.update({
        where: { id },
        data: {
          name,
          imageUrl,
          ageRating,
          releaseYear,
          genres: {
            set: genreIds?.map((id) => ({ id: id })),
          },
          stream: {
            set: streamingIds?.map((id) => ({ id: id })),
          },
        },
        select: this.movieSelect,
      });

      return updatedMovie;
    } catch (error) {
      throw new Exception(
        ExceptionsType.INVALIDDATA,
        'Error ao tentar editar um filme',
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.movie.delete({ where: { id } });
    } catch (error) {
      throw new Exception(
        ExceptionsType.INVALIDDATA,
        'Erro ao tentar excluir um filme',
      );
    }
  }

  async findMostPopularMovies() {
    try {
      const popularMovies = await this.prisma.movie.findMany({
        orderBy: {
          favoriteMoviesOnProfile: {
            _count: 'asc',
          },
        },
      });
      return popularMovies;
    } catch (error) {
      console.log(error);
    }
  }
}
