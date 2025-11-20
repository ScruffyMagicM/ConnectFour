import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  dotenv.config();
  app.enableCors({
    origin: process.env.CORS_ORIGINS,
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
