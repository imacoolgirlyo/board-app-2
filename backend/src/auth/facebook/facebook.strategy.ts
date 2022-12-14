import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('FACEBOOK_CLIENT_ID'),
      clientSecret: configService.get<string>('FACEBOOK_CLIENT_SECRET'),
      callbackURL: configService.get<string>('FACEBOOK_OAUTH_REDIRECT_URL'),
      profileFields: ['id', 'displayName', 'email', 'name', 'photos'],
    });
  }

  async validate(
    _accessToken: string,
    refreshToken: string,
    profile: any,
    // cb: any,
  ) {
    console.log(profile);
    return profile;
  }
}
