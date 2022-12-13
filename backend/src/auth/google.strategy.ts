import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecrete: configService.get<string>('GOOGLE_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_OAUTH_REDIRECT_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
  ): Promise<any> {
    // Google OAuth 서버에서 유저 인증하고 난 뒤 전달해주는 callback
    // 우리가 필요한 user 정보를 가져올 수 있음. 여기서 가져온 정보를 request object에 넣는다.
    const { id, name, emails } = profile;
    return {
      provider: 'google',
      providerId: id,
      name: name.givenName,
      username: emails[0].value,
    };
  }
}
