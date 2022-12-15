import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { UserService } from 'src/user/user.service';

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
    console.log('_accessToken: ', accessToken); // 여기서 반환한 토큰은 facebook 토큰

    if (!profile) {
      return null;
    }

    const facebookProfile = {
      id: profile.id,
      name: profile.username,
      provider: 'facebook' as const,
      accessToken,
      photo: profile.photos[0].value ?? undefined,
      email: profile.emails[0].value,
    };
    const user = this.userService.findOrCreate(facebookProfile);
    // TODO: cookie에 accessToken을 넣어놓음

    return user;
  }
}
