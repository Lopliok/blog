import { Parent, ResolveProperty, Resolver, ResolveField } from '@nestjs/graphql';
import { User } from '../graphql.schema.generated';

@Resolver('User')
export class UserResolver {
  constructor(private readonly prisma: any) {}

  @ResolveField()
  async post(@Parent() { id }: User) {
    return this.prisma.client.user({ id }).post();
  }
}
