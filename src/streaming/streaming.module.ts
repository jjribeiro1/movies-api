import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StreamingRepository } from 'src/repositories/streaming.repository';
import { IsUniqueConstraint } from 'src/user/decorators/IsUnique.decorator';
import { StreamingController } from './streaming.controller';
import { StreamingService } from './streaming.service';

@Module({
  imports: [PrismaModule],
  controllers: [StreamingController],
  providers: [StreamingService, StreamingRepository, IsUniqueConstraint],
})
export class StreamingModule {}
