import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveProperty,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { GqlUser } from '../shared/decorators/decorators';
import { ArticleSectionInputDto } from './articleSection-input.dto';
import { Post, Article } from '../graphql.schema.generated';
import { ArticleUpdateInputDto } from '../article/article-update.dto';
import { ArticleSectionUpdateDto } from './articleSection-update.dto';

@Resolver('ArticleSection')
export class ArticleSectionResolver {
  constructor(private readonly prisma: any) { }

  @Query()
  @UseGuards(GqlAuthGuard)
  async articleSections() {
    return this.prisma.client.articleSections();
  }

  @ResolveField()
  async articles(@Parent() { id }: Article) {
    return this.prisma.client.articles({ where: { section: { id } } });
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async createArticleSection(
    @Args('articleSectionInput') { title }: ArticleSectionInputDto,
    @GqlUser() user: any,
  ) {
    return this.prisma.client.createArticleSection({
      title,
    });
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async updateArticleSection(
    @Args('articleSectionUpdateInput')
    { title, articles, id, active, deleted, }: ArticleSectionUpdateDto,
    @GqlUser() user: any,
  ) {
    return this.prisma.client.updateArticleSection({
      data: {
        title,
        active,
        deleted,
        articles: { connect: (articles || []).map(it => ({ id: it.id })) },
      },
      where: { id },
    });
  }
}
