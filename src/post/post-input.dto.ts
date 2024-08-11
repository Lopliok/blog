import { IsString, MaxLength, MinLength } from 'class-validator';
import { PostInput } from '../graphql.schema.generated';

export class PostInputDto extends PostInput {
  @IsString()
  @MinLength(6)
  @MaxLength(60)
  declare readonly title: string;
}
