import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { IsUniqueConstraint } from './decorators/IsUnique.decorator';
import { UserRepository } from 'src/repositories/user.repository';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, IsUniqueConstraint, UserRepository],
})
export class UserModule {}
