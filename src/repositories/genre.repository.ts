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
      throw new Exception(ExceptionsType.INVALIDDATA, 'Error creating genre');
    }
  }

  async findAll(): Promise<GenreEntity[]> {
    try {
      const genres = await this.prisma.genre.findMany();
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

  async update(id: string, dto: UpdateGenreDto): Promise<GenreEntity> {
    try {
      await this.findById(id);
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
      throw new Exception(ExceptionsType.INVALIDDATA, 'Error updating genre');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.findById(id);
      await this.prisma.genre.delete({ where: { id } });
    } catch (error) {
      throw new Exception(ExceptionsType.INVALIDDATA, 'Error deleting genre');
    }
  }
}
