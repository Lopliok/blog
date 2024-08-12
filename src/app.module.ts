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
import { databaseProviders } from './database/database.providers';
import { DevtoolsModule } from "@nestjs/devtools-integration";


@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
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
    ...databaseProviders,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}



