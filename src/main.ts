import { NestFactory, PartialGraphHost } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import fs from 'fs';
const PORT = process.env.PORT || '5000';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {

  });
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
