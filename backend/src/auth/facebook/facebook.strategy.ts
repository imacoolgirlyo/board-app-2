import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { UserService } from 'src/user/user.service';
import { IdentityProvider, SocialProfile } from '../socialProfile.model';

type Name = string | undefined;
type Email = { value: string };
type Photo = Email;

interface FacebookProfile {
  id: string;
  username: Name;
  name: { familyName: Name; givenName: Name; middleName: Name };
  gender: Name;
  profileUrl: Name;
  emails: Email[];
  photos: Photo[];
  provider: 'facebook';
  _raw: string;
}

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: configService.get<string>('FACEBOOK_CLIENT_ID'),
      clientSecret: configService.get<string>('FACEBOOK_CLIENT_SECRET'),
      callbackURL: configService.get<string>('FACEBOOK_OAUTH_REDIRECT_URL'),
      profileFields: ['id', 'displayName', 'email', 'name', 'photos'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: FacebookProfile,
  ) {
    if (!profile) {
      return null;
    }

    const _name = [
      profile.name.familyName ?? '',
      profile.name.givenName ?? '',
      profile.name.middleName ?? '',
    ].join(' ');

    const user = await this.userService._findOrCreate({
      localId: profile.id,
      provider: IdentityProvider.FACEBOOK,
      accessToken,
      refreshToken,
      email: profile.emails[0].value,
      name: profile.username ?? _name,
      photo: profile.photos[0].value ?? undefined,
    });

    return user;
  }
}
