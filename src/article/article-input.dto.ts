import { IsString, MaxLength, MinLength } from 'class-validator';
import { ArticleInput } from '../graphql.schema.generated';

export class ArticleInputDto extends ArticleInput {
  @IsString()
  @MinLength(6)
  @MaxLength(60)
  declare readonly title: string;
}
