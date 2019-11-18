import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import * as cors from 'cors'

var corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true, // <-- REQUIRED backend setting
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })
  app.use(cookieParser())

  await app.listen(3001)
}
bootstrap()
