import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { databaseProviders } from '../database/database.providers';
import { AuthService } from './auth.service';
import { UsersService } from './user.service';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 3600, // 1 hour
      },
    }),
  ],
  providers: [...databaseProviders, JwtStrategy, AuthService, UsersService, AuthResolver],
})
export class AuthModule {}
