import { IsEmail, MinLength } from 'class-validator';
import { SignUpInput } from '../graphql.schema.generated';

export class SignUpInputDto extends SignUpInput {
  @IsEmail()
  declare readonly email: string;

  @MinLength(6)
  declare readonly password: string;
}
