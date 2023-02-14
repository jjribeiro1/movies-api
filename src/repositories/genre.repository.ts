import { Injectable } from '@nestjs/common';
import { Exception, ExceptionsType } from 'src/exceptions/newException';
import { CreateGenreDto } from 'src/genre/dto/create-genre.dto';
import { UpdateGenreDto } from 'src/genre/dto/update-genre.dto';
import { GenreEntity } from 'src/genre/entities/genre.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GenreRepository {
  private readonly movieSelect = {
    id: true,
    name: true,
    imageUrl: true,
    ageRating: true,
    releaseYear: true,
    stream: true,
    genres: true,
  };
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGenreDto): Promise<GenreEntity> {
    try {
      const createdGenre = await this.prisma.genre.create({
        data: {
          name: dto.name,
        },
      });
      return createdGenre;
    } catch (error) {
      throw new Exception(
        ExceptionsType.INVALIDDATA,
        'Erro ao tentar criar um gênero',
      );
    }
  }

  async findAll(): Promise<GenreEntity[]> {
    try {
      const genres = await this.prisma.genre.findMany({
        orderBy: {
          name: 'asc',
        },
      });
      return genres;
    } catch (error) {
      throw new Exception(ExceptionsType.DATABASE);
    }
  }

  async findById(id: string): Promise<GenreEntity> {
    try {
      const genre = await this.prisma.genre.findUniqueOrThrow({
        where: { id },
        select: {
          id: true,
          name: true,
          movies: {
            select: this.movieSelect,
          },
        },
      });
      return genre;
    } catch (error) {
      throw new Exception(ExceptionsType.NOTFOUND, error.message);
    }
  }

  async findByName(name: string): Promise<GenreEntity> {
    const genre = await this.prisma.genre.findUnique({
      where: { name },
    });

    return genre;
  }

  async update(id: string, dto: UpdateGenreDto): Promise<GenreEntity> {
    try {
      const updatedGenre = await this.prisma.genre.update({
        where: { id },
        data: {
          name: dto.name,
        },
        select: {
          id: true,
          name: true,
          movies: {
            select: this.movieSelect,
          },
        },
      });
      return updatedGenre;
    } catch (error) {
      throw new Exception(
        ExceptionsType.INVALIDDATA,
        'Erro ao tentar editar um gênero',
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.genre.delete({ where: { id } });
    } catch (error) {
      throw new Exception(
        ExceptionsType.INVALIDDATA,
        'Erro ao tentar excluir um gênero',
      );
    }
  }
}
