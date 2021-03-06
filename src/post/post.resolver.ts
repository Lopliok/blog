import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { Post } from '../graphql.schema.generated';
import { GqlUser } from '../shared/decorators/decorators';
import { User } from '../../generated/prisma-client';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { PostInputDto } from './post-input.dto';

@Resolver('Post')
export class PostResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query()
  async post(@Args('id') id: string) {
    return this.prisma.client.post({ id });
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async posts() {
    return this.prisma.client.posts();
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async myPosts(@GqlUser() user: User) {
    return this.prisma.client.posts({ where: { author: user } });
  }

  @ResolveProperty()
  async author(@Parent() { id }: Post) {
    return this.prisma.client.post({ id }).author();
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async createPost(
    @Args('postInput') { title, body, active }: PostInputDto,
    @GqlUser() user: User,
  ) {
    console.log('test');
    return this.prisma.client.createPost({
      title,
      body,
      active,
      author: { connect: { id: user.id } },
    });
  }
}
