import { IsString, MaxLength, MinLength, IsOptional } from 'class-validator';
import {
  ArticleUpdateInput,
  ArticleSectionUpdateInput,
} from '../graphql.schema.generated';

export class ArticleSectionUpdateDto extends ArticleSectionUpdateInput {
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(60)
  readonly title?: string;
}
