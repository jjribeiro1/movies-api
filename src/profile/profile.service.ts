import { Injectable } from '@nestjs/common';
import { Exception, ExceptionsType } from 'src/exceptions/newException';
import { MovieRepository } from 'src/repositories/movie.repository';
import { ProfileRepository } from 'src/repositories/profile.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { CreateProfileDto } from './dto/create-profile.dto';
import {
  AddOrRemoveFavoriteMovieDto,
  FavoriteMovieResponse,
} from './dto/favorite-movie.dto.';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileEntity } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly userRepository: UserRepository,
    private readonly movieRepository: MovieRepository,
  ) {}

  async create(dto: CreateProfileDto): Promise<ProfileEntity> {
    const data = { ...dto };
    const profileUser = await this.userRepository.findById(data.userId);
    if (!profileUser) {
      throw new Exception(ExceptionsType.INVALIDDATA, 'User not found');
    }
    return await this.profileRepository.create(data);
  }

  async findAll(): Promise<ProfileEntity[]> {
    return await this.profileRepository.findAll();
  }

  async findOne(id: string): Promise<ProfileEntity> {
    return await this.profileRepository.findById(id);
  }

  async update(id: string, dto: UpdateProfileDto): Promise<ProfileEntity> {
    const data = {
      name: dto.name,
      imageUrl: dto.imageUrl,
    };
    return await this.profileRepository.update(id, data);
  }

  async remove(id: string): Promise<void> {
    return await this.profileRepository.delete(id);
  }

  async addFavoriteMovie(
    dto: AddOrRemoveFavoriteMovieDto,
  ): Promise<FavoriteMovieResponse> {
    const { profileId, movieId } = dto;

    await this.profileRepository.findById(profileId);
    await this.movieRepository.findById(movieId);

    return await this.profileRepository.addFavoriteMovie(dto);
  }

  async removeFavoriteMovie(
    dto: AddOrRemoveFavoriteMovieDto,
  ): Promise<FavoriteMovieResponse> {
    const { profileId, movieId } = dto;

    await this.profileRepository.findById(profileId);
    await this.movieRepository.findById(movieId);

    return await this.profileRepository.removeFavoriteMovie(dto);
  }
}
