import { IsString, MaxLength, MinLength, IsOptional } from 'class-validator';
import {
  ArticleSectionUpdateInput,
} from '../graphql.schema.generated';

export class ArticleSectionUpdateDto extends ArticleSectionUpdateInput {
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(60)
  declare readonly title?: string;
}
