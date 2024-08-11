import { IsString, MaxLength, MinLength, IsOptional } from 'class-validator';
import { ArticleUpdateInput } from '../graphql.schema.generated';

export class ArticleUpdateInputDto extends ArticleUpdateInput {
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(60)
  declare readonly title?: string;
}
