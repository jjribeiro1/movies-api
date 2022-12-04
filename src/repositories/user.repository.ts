import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { Exception } from 'src/exceptions/newException';
import { ExceptionsType } from 'src/exceptions/newException';

@Injectable()
export class UserRepository {
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
      const data = { ...dto };
      const createdUser = await this.prisma.user.create({
        data,
        select: this.userSelect,
      });

      return createdUser;
    } catch (error) {
      throw new Exception(ExceptionsType.INVALIDDATA, 'Error creating user');
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      const users = await this.prisma.user.findMany({
        select: this.userSelect,
      });

      return users;
    } catch (error) {
      throw new Exception(ExceptionsType.DATABASE);
    }
  }

  async findById(id: string): Promise<UserEntity> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id },
        select: this.userSelect,
      });

      return user;
    } catch (error) {
      throw new Exception(ExceptionsType.NOTFOUND, error.message);
    }
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    try {
      await this.findById(id);
      const data = { ...dto };
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data,
        select: this.userSelect,
      });
      return updatedUser;
    } catch (error) {
      throw new Exception(ExceptionsType.INVALIDDATA, 'Error updating user');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.findById(id);
      await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      throw new Exception(ExceptionsType.INVALIDDATA, 'Error deleting user');
    }
  }
}
