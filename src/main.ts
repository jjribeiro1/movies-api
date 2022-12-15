import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors();
  app.set('trust proxy', 1);

  const config = new DocumentBuilder()
    .setTitle('Watch Movies')
    .setDescription(
      'Api para gerenciamento e avaliação de filmes de diferentes serviços de streaming',
    )
    .setVersion('1.0')
    .addTag('status')
    .addTag('auth')
    .addTag('user')
    .addTag('profile')
    .addTag('movie')
    .addTag('genre')
    .addTag('streaming')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
