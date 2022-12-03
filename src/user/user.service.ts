import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const data = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    };
    return await this.userRepository.create(data);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.findAll();
  }

  async findOne(id: string): Promise<UserEntity> {
    return await this.userRepository.findById(id);
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }
    const data = {
      ...dto,
    };
    return await this.userRepository.update(id, data);
  }
  async remove(id: string) {
    return await this.userRepository.delete(id);
  }
}
