import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { IsUniqueConstraint } from './decorators/IsUnique.decorator';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, IsUniqueConstraint],
})
export class UserModule {}
