import * as bcryptjs from 'bcryptjs';
import { Response } from 'express';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput } from '../graphql.schema.generated';
import { ResGql } from '../shared/decorators/decorators';
import { JwtService } from '@nestjs/jwt';
import { SignUpInputDto } from './sign-up-input.dto';
import { AuthService } from './auth.service';
import { User } from '../user/user.model';
import { UsersService } from './user.service';
/* 
@Resolver(of => Author)
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService,
    private postsService: PostsService,
  ) {}

  @Query(returns => Author)
  async author(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.findOneById(id);
  }

  @ResolveField()
  async posts(@Parent() author: Author) {
    const { id } = author;
    return this.postsService.findAll({ authorId: id });
  }
} */

@Resolver(User)
export class AuthResolver {
  constructor(
    private readonly jwt: JwtService,
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Mutation(returns => User)
  async login(
    @Args('loginInput') { email, password }: LoginInput,
    @ResGql() res: Response,
  ) {
    const user = await this.authService.login(email, password);         //this.prisma.client.user({ email });
    if (!user) {
      throw Error('Email or password incorrect');
    }

    const valid = await bcryptjs.compare(password, user.password);
    if (!valid) {
      throw Error('Email or password incorrect');
    }

    const jwt = this.jwt.sign({ id: user.id });
    // @ts-ignore
    res.cookie('token', jwt, { httpOnly: true });
    // @ts-ignore
    console.log(jwt, res.cookie);
    return user;
  }

   @Mutation()
  async signup(
    @Args('signUpInput') signUpInputDto: SignUpInputDto,
    @ResGql() res: Response,
  ) {
    const emailExists = await this.userService.findOne(signUpInputDto.email);
    if (emailExists) {
      throw Error('Email is already in use');
    }
    const password = await bcryptjs.hash(signUpInputDto.password, 10);

    const user = await User.create({
      ...signUpInputDto,
      password,
    })

    const jwt = this.jwt.sign({ id: user.id });
    // @ts-ignore
    res.cookie('token', jwt, { httpOnly: true });
    console.log(jwt);
    return user;
  } 
}
