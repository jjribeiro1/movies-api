import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
import { UpdateProfileDto } from 'src/profile/dto/update-profile.dto';
import { ProfileEntity } from 'src/profile/entities/profile.entity';
import { Exception } from 'src/exceptions/newException';
import { ExceptionsType } from 'src/exceptions/newException';
import {
  AddOrRemoveFavoriteMovieDto,
  FavoriteMovieResponse,
} from 'src/profile/dto/favorite-movie.dto.';

@Injectable()
export class ProfileRepository {
  private readonly profileSelect = {
    id: true,
    name: true,
    imageUrl: true,
    userId: true,
  };
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProfileDto): Promise<ProfileEntity> {
    try {
      const { name, imageUrl, userId } = dto;
      const createdProfile = await this.prisma.profile.create({
        data: {
          name,
          imageUrl,
          User: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return createdProfile;
    } catch (error) {
      throw new Exception(
        ExceptionsType.INVALIDDATA,
        'Error ao tentar criar um perfil',
      );
    }
  }

  async findAll(): Promise<ProfileEntity[]> {
    try {
      const profiles = await this.prisma.profile.findMany();
      return profiles;
    } catch (error) {
      throw new Exception(ExceptionsType.DATABASE);
    }
  }

  async findById(id: string): Promise<ProfileEntity> {
    try {
      const profile = await this.prisma.profile.findUniqueOrThrow({
        where: { id },
        select: {
          ...this.profileSelect,
          favoriteMoviesOnProfile: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
              ageRating: true,
              releaseYear: true,
              stream: true,
              genres: true,
            },
          },
        },
      });

      return profile;
    } catch (error) {
      throw new Exception(ExceptionsType.NOTFOUND, error.message);
    }
  }

  async update(id: string, dto: UpdateProfileDto): Promise<ProfileEntity> {
    try {
      const { name, imageUrl } = dto;
      const updatedProfile = await this.prisma.profile.update({
        where: { id },
        data: {
          name,
          imageUrl,
        },
        select: {
          ...this.profileSelect,
          favoriteMoviesOnProfile: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
              ageRating: true,
              releaseYear: true,
              stream: true,
              genres: true,
            },
          },
        },
      });
      return updatedProfile;
    } catch (error) {
      throw new Exception(
        ExceptionsType.INVALIDDATA,
        'Erro ao tentar editar um perfil',
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.profile.delete({ where: { id } });
    } catch (error) {
      throw new Exception(
        ExceptionsType.INVALIDDATA,
        'Erro ao tentar excluir um perfil',
      );
    }
  }

  async addFavoriteMovie(
    dto: AddOrRemoveFavoriteMovieDto,
  ): Promise<FavoriteMovieResponse> {
    try {
      const { profileId, movieId } = dto;
      const addFavorite = await this.prisma.profile.update({
        where: { id: profileId },
        data: {
          favoriteMoviesOnProfile: {
            connect: {
              id: movieId,
            },
          },
        },
        select: {
          favoriteMoviesOnProfile: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
              ageRating: true,
              releaseYear: true,
              genres: true,
              stream: true,
            },
          },
        },
      });

      return addFavorite;
    } catch (error) {
      throw new Exception(
        ExceptionsType.INVALIDDATA,
        'Erro ao tentar adicionar um filme aos favoritos do perfil',
      );
    }
  }

  async removeFavoriteMovie(
    dto: AddOrRemoveFavoriteMovieDto,
  ): Promise<FavoriteMovieResponse> {
    try {
      const { profileId, movieId } = dto;
      const removeFavorite = await this.prisma.profile.update({
        where: { id: profileId },
        data: {
          favoriteMoviesOnProfile: {
            disconnect: {
              id: movieId,
            },
          },
        },
        select: {
          favoriteMoviesOnProfile: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
              ageRating: true,
              releaseYear: true,
              genres: true,
              stream: true,
            },
          },
        },
      });

      return removeFavorite;
    } catch (error) {
      throw new Exception(
        ExceptionsType.INVALIDDATA,
        'Erro ao tentar excluir um filme dos favoritos do perfil',
      );
    }
  }
}
