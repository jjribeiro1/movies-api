import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
import { UpdateProfileDto } from 'src/profile/dto/update-profile.dto';
import { ProfileEntity } from 'src/profile/entities/profile.entity';
import { Exception } from 'src/exceptions/newException';
import { ExceptionsType } from 'src/exceptions/newException';

@Injectable()
export class ProfileRepository {
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
      throw new Exception(ExceptionsType.INVALIDDATA, 'Error creating profile');
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
      });

      return profile;
    } catch (error) {
      throw new Exception(ExceptionsType.NOTFOUND, error.message);
    }
  }

  async update(id: string, dto: UpdateProfileDto): Promise<ProfileEntity> {
    try {
      await this.findById(id);
      const data = { ...dto };
      const updatedProfile = await this.prisma.profile.update({
        where: { id },
        data,
      });
      return updatedProfile;
    } catch (error) {
      throw new Exception(ExceptionsType.INVALIDDATA, 'Error updating profile');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.findById(id);
      await this.prisma.profile.delete({ where: { id } });
    } catch (error) {
      throw new Exception(ExceptionsType.INVALIDDATA, 'Error deleting profile');
    }
  }
}
