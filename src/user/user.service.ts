import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateUserDto) {
    throw new Error('Method not implemented.');
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
