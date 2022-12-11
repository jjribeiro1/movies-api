import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { ProfileModule } from 'src/profile/profile.module';
import { MovieModule } from 'src/movie/movie.module';
import { GenreModule } from 'src/genre/genre.module';
import { StreamingModule } from 'src/streaming/streaming.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    ProfileModule,
    MovieModule,
    GenreModule,
    StreamingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
