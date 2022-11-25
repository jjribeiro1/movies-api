import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly userSelect = {
    id: true,
    name: true,
    cpf: true,
    email: true,
    password: false,
    role: true,
  };
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    try {
      const data = {
        ...dto,
        password: await bcrypt.hash(dto.password, 10),
      };

      return this.prisma.user.create({ data, select: this.userSelect });
    } catch (err) {
      console.log(err.message);
    }
  }

  findAll() {
    throw new Error('Method not implemented.');
  }

  findOne(id: string) {
    throw new Error('Method not implemented.');
  }

  update(id: string, dto: UpdateUserDto) {
    throw new Error('Method not implemented.');
  }
  remove(id: string) {
    throw new Error('Method not implemented.');
  }
}
