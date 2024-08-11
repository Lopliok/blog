import { Injectable } from '@nestjs/common';
import { User } from '../graphql.schema.generated';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: any) {}

  async validate({ id }: any): Promise<User> {
    const user = await this.prisma.client.user({ id });
    if (!user) {
      throw Error('Authenticate validation error');
    }
    return user;
  }
}
