import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { IdentityProvider } from '../authProfile';

interface JwtPayload {
  id: string;
  provider: IdentityProvider;
}

@Injectable()
export class OpenBankingStrategy extends PassportStrategy(
  Strategy,
  'open-banking',
) {
  constructor(
    configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findById(payload.id);

    if (user) {
      return user;
    }

    // payload에서 id 뽑아낸 후, User 데이터 찾고
    // User Model 반환
    return null;
  }
}
