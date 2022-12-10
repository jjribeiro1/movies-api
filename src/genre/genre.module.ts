import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GenreRepository } from 'src/repositories/genre.repository';
import { IsUniqueConstraint } from 'src/user/decorators/IsUnique.decorator';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';

@Module({
  imports: [PrismaModule],
  controllers: [GenreController],
  providers: [GenreService, GenreRepository, IsUniqueConstraint],
})
export class GenreModule {}
