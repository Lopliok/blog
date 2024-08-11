import { Module } from '@nestjs/common';
import { PostResolver } from './post.resolver';

@Module({
  providers: [PostResolver],
  imports: [],
})
export class PostModule {}
