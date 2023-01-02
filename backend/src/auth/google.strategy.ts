import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { IdentityProvider } from './socialProfile.model';
import { IUser } from 'src/user/user.model';

interface GoogleProfile {
  id: string;
  displayName: string;
  provider: string; // 'google'
  name?: { familyName: string; givenName: string };
  emails?: { value: string; verified: boolean }[];
  photos?: { value: string }[];
  _raw: string;
  _json: {
    sub: string;
    name?: string;
    given_name?: string;
    family_name?: string;
    picture?: string;
    email?: string;
    email_verified?: boolean;
    locale?: string;
    hd?: string;
  };
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService, private userService: UserService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_OAUTH_REDIRECT_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile,
  ): Promise<IUser> {
    const user = await this.userService._findOrCreate({
      localId: profile.id,
      provider: IdentityProvider.GOOGLE,
      accessToken,
      refreshToken,
      email: profile.emails[0].value,
      name: `${profile.name.familyName ?? ''} ${profile.name.givenName ?? ''}`,
      photo: profile.photos[0].value,
    });

    return user;
  }
}
