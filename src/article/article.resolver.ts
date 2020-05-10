import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { User } from '../../generated/prisma-client';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { GqlUser } from '../shared/decorators/decorators';
import { ArticleInputDto } from './article-input.dto';
import { ArticleUpdateInputDto } from './article-update.dto';
import { Post, Article } from '../graphql.schema.generated';

@Resolver('Article')
export class ArticleResolver {
  constructor(private readonly prisma: PrismaService) { }

  @Query()
  async article(@Args('id') id: string) {
    return this.prisma.client.article({ id });
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async articles() {
    console.log(this.prisma.client.articles());
    return this.prisma.client.articles();
  }

  @ResolveProperty()
  async section(@Parent() { id }: Article) {
    const data = await this.prisma.client.articleSections({
      where: { articles_some: { id } },
    });
    return data.length ? data[0] : null;
  }

  @ResolveProperty()
  async paragraphs(@Parent() { id }: Article) {
    return this.prisma.client.paragraphs({ where: { article: { id } } });
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async createArticle(
    @Args('articleInput') { title, paragraphs, active, section }: ArticleInputDto,
    @GqlUser() user: User,
  ) {

    console.log(section)

    let additional: any = {}

    if (section) {
      additional.section = {
        connect: { id: section }
      }
    }

    return this.prisma.client.createArticle({
      title,
      paragraphs: { create: paragraphs.map(e => ({ body: e })) },
      ...additional,
      active,
    });
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async updateArticle(
    @Args('articleUpdateInput')
    { title, paragraphs, newParagraphs, active, img, id, advanced, deleted }: ArticleUpdateInputDto,
    @GqlUser() user: User,
  ) {

    return this.prisma.client.updateArticle({
      data: {
        img,
        active,
        title,
        deleted,
        advanced,
        paragraphs: {
          create: (newParagraphs || []).map(it => ({ body: it })),
          updateMany: (paragraphs || []).map(it => ({
            where: { id: it.id },
            data: { body: it.body, deleted: it.deleted },
          })),
        },
      },
      where: { id: id },
    });
  }
}
