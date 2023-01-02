import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { IUser } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { FacebookProfile, IFacebookProfile } from '../authProfile';

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
    profile: IFacebookProfile,
  ): Promise<IUser> {
    if (!profile) {
      return null;
    }
    const facebookProfile = new FacebookProfile(profile);

    const user = await this.userService._findOrCreate(
      facebookProfile.convertToOAuthProfile(accessToken, refreshToken),
    );

    return user;
  }
}
