import { Module } from '@nestjs/common';
import { ArticleSectionResolver } from './articleSection.resolver';

@Module({
  providers: [ArticleSectionResolver],
  imports: [],
})
export class ArticleSectionModule {}
