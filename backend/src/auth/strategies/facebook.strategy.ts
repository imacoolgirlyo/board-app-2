import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { IUser } from 'src/user/user.model';
import { FacebookProfile, IFacebookProfile } from '../authProfile';
import { ValidateUserUseCase } from '../usecases/validateUser.usecase';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    configService: ConfigService,
    private validateUserUseCase: ValidateUserUseCase,
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

    const user = await this.validateUserUseCase.execute(
      facebookProfile.convertToOAuthProfile(accessToken, refreshToken),
    );

    return user;
  }
}
