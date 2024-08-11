import { Module, ValidationPipe } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphqlOptions } from './graphql.options';
import { AuthModule } from './auth/auth.module';
import { APP_PIPE } from '@nestjs/core';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { ArticleSectionModule } from './articleSection/articleSection.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';


@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useClass: GraphqlOptions,
    }),
    AuthModule,
    PostModule,
    ArticleModule,
    ArticleSectionModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}



