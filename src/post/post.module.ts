import { Module } from '@nestjs/common';
import { PostResolver } from './post.resolver';
import { databaseProviders } from '../database/database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders]
})
export class PostModule {}
