import { Injectable } from '@nestjs/common';
import { TokenService } from 'src/token/token.service';
import { IUser, OAuthProfile } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ValidateUserUseCase {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  async execute(
    profile: OAuthProfile,
    accessToken: string,
    refreshToken: string,
  ): Promise<IUser> {
    const user = await this.userService.findOne({ localId: profile.localId });

    if (user) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    }

    const savedToken = await this.tokenService.save(accessToken, refreshToken);
    const savedUser = await this.userService.createUser(profile, savedToken);

    return savedUser;
  }
}
