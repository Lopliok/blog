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
import { ArticleInputDto } from './article-input.dto';
import { ArticleUpdateInputDto } from './article-update.dto';
import { Post, Article } from '../graphql.schema.generated';

@Resolver(Article)
export class ArticleResolver {
  constructor(private readonly prisma: any) { }

  @Query(returns => Article)
  async article(@Args('id') id: string) {
    return this.prisma.client.article({ id });
  }

  @Query(returns => Article)
  @UseGuards(GqlAuthGuard)
  async articles() {
    console.log(this.prisma.client.articles());
    return this.prisma.client.articles();
  }

  @ResolveField()
  async section(@Parent() { id }: Article) {
    const data = await this.prisma.client.articleSections({
      where: { articles_some: { id } },
    });
    return data.length ? data[0] : null;
  }

  @ResolveField()
  async paragraphs(@Parent() { id }: Article) {
    return this.prisma.client.paragraphs({ where: { article: { id } } });
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async createArticle(
    @Args('articleInput') { title, paragraphs, active, section }: ArticleInputDto,
    @GqlUser() user: any,
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
    @GqlUser() user: any,
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
