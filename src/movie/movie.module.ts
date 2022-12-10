import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieRepository } from 'src/repositories/movie.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IsUniqueConstraint } from 'src/user/decorators/IsUnique.decorator';

@Module({
  imports: [PrismaModule],
  controllers: [MovieController],
  providers: [MovieService, MovieRepository, IsUniqueConstraint],
})
export class MovieModule {}
