import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export type JwtPayload = {
  id: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
};
// Bearer 안에 있는 jwt 토큰을 까서 유저 데이터를 가져온다. -> @nestjs/passport 에 잇을거같음 x, passport-jwt
// validate에서는 내부에서 사용하는 user 정보 반환
@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    return { id: payload.id, name: payload.name, email: payload.email };
  }
}
