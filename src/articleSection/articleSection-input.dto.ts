import { IsString, MaxLength, MinLength } from 'class-validator';
import { ArticleSectionInput } from '../graphql.schema.generated';

export class ArticleSectionInputDto extends ArticleSectionInput {
  @IsString()
  @MinLength(10)
  @MaxLength(60)
  readonly title: string;
}
