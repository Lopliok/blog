import { IsString, MaxLength, MinLength } from 'class-validator';
import { ArticleInput } from '../graphql.schema.generated';

export class ArticleInputDto extends ArticleInput {
  @IsString()
  @MinLength(10)
  @MaxLength(60)
  readonly title: string;
}
