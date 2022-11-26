import { NotFoundException, Injectable } from '@nestjs/common';
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

  async findById(id: string): Promise<UserEntity> {
    return this.prisma.user
      .findUniqueOrThrow({
        where: { id },
        select: this.userSelect,
      })
      .catch(() => {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
      });
  }

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

  async findAll(): Promise<UserEntity[]> {
    try {
      return this.prisma.user.findMany({ select: this.userSelect });
    } catch (err) {
      console.log(err.message);
    }
  }

  async findOne(id: string): Promise<UserEntity> {
    try {
      return this.findById(id);
    } catch (err) {
      console.log(err.message);
    }
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    try {
      await this.findById(id);

      if (dto.password) {
        dto.password = await bcrypt.hash(dto.password, 10);
      }
      const data = {
        ...dto,
      };

      return this.prisma.user.update({
        where: { id },
        data,
        select: this.userSelect,
      });
    } catch (err) {
      console.log(err.message);
    }
  }
  async remove(id: string) {
    try {
      await this.findById(id);
      await this.prisma.user.delete({ where: { id } });
    } catch (err) {
      console.log(err.message);
    }
  }
}
