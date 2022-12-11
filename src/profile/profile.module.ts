import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MovieRepository } from 'src/repositories/movie.repository';
import { ProfileRepository } from 'src/repositories/profile.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProfileController],
  providers: [
    ProfileService,
    ProfileRepository,
    UserRepository,
    MovieRepository,
  ],
})
export class ProfileModule {}
