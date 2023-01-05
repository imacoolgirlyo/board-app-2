import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { IUser } from 'src/user/user.model';
import { GoogleProfile, IGoogleProfile } from '../authProfile';
import { ValidateUserUseCase } from '../usecases/validateUser.usecase';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    configService: ConfigService,
    private validateUserUseCase: ValidateUserUseCase,
  ) {
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
    profile: IGoogleProfile,
  ): Promise<IUser> {
    const googleProfile = new GoogleProfile(profile);

    const user = await this.validateUserUseCase.execute(
      googleProfile.convertToOAuthProfile(accessToken, refreshToken),
    );

    return user;
  }
}
