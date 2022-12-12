import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserRepository } from 'src/repositories/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
})
export class AuthModule {}
