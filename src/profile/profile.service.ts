import { Injectable } from '@nestjs/common';
import { Exception, ExceptionsType } from 'src/exceptions/newException';
import { ProfileRepository } from 'src/repositories/profile.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileEntity } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly userRepository: UserRepository,
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

  async delete(id: string): Promise<void> {
    return await this.profileRepository.delete(id);
  }
}
