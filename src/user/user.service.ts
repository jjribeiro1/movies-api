import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/repositories/user.repository';
import { Exception, ExceptionsType } from 'src/exceptions/newException';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const emailAlreadyExists = await this.userRepository.findByEmail(dto.email);
    if (emailAlreadyExists) {
      throw new Exception(ExceptionsType.INVALIDDATA, 'Email must be unique');
    }

    const cpfAlreadyExists = await this.userRepository.findByCpf(dto.cpf);
    if (cpfAlreadyExists) {
      throw new Exception(ExceptionsType.INVALIDDATA, 'Cpf must be unique');
    }

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
    await this.userRepository.findById(id);
    if (dto.email) {
      const emailAlreadyExists = await this.userRepository.findByEmail(
        dto.email,
      );
      if (emailAlreadyExists) {
        throw new Exception(ExceptionsType.INVALIDDATA, 'Email must be unique');
      }
    }

    if (dto.cpf) {
      const cpfAlreadyExists = await this.userRepository.findByCpf(dto.cpf);
      if (cpfAlreadyExists) {
        throw new Exception(ExceptionsType.INVALIDDATA, 'Cpf must be unique');
      }
    }

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }
    const data = {
      ...dto,
    };
    return await this.userRepository.update(id, data);
  }
  async remove(id: string) {
    await this.userRepository.findById(id);
    return await this.userRepository.delete(id);
  }
}
