import { Module } from '@nestjs/common';
import { ArticleSectionResolver } from './articleSection.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [ArticleSectionResolver],
  imports: [PrismaModule],
})
export class ArticleSectionModule {}
