import { Module } from '@nestjs/common';
import { ArticleResolver } from './article.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [ArticleResolver],
  imports: [PrismaModule],
})
export class ArticleModule {}
