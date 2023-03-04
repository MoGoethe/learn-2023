import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { jwtSecrte } from './auth.module';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private auth: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecrte,
    });
  }

  async validate(payload: { userId: string }) {
    const user = await this.auth.validateUser(payload.userId);
    if (!user) {
      throw new UnauthorizedException('未登录');
    }
    return user;
  }
}
