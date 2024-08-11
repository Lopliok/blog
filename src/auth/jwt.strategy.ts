import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from './auth.service';

const cookieExtractor = (req: Request<any>): string | null => {
  let token = null;
  // @ts-ignore
  if (req && req?.cookies) {
    // @ts-ignore
    token = req?.cookies?.token || req?.headers?.['cookie-value'];
  }
  //console.log(token, req.headers);
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(payload: any) {
    return this.authService.validate(payload);
  }
}
