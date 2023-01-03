import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { IOpenBankingProfile, OpenBankingProfile } from '../authProfile';
import { JwtAuthService } from '../services/jwt-auth.service';
import { ValidateUserUseCase } from '../usecases/validateUser.usecase';

@Controller('auth/open-banking')
export class OpenBankingOAuthController {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly jwtAuthService: JwtAuthService,
    private validateUserUseCase: ValidateUserUseCase,
  ) {}

  @Get()
  async getAccessToken(
    @Req() req,
    @Res() response: Response,
    @Query() query: { code: string },
  ) {
    const openBankingUrl = this.configService.get<string>(
      'OPEN_BANKING_TEST_API',
    );

    const config = {
      code: query.code,
      client_id: this.configService.get<string>('OPEN_BANKING_CLINET_ID'),
      client_secret: this.configService.get<string>('OPEN_BANKING_SECERT'),
      redirect_uri: 'http://localhost:5000/auth/open-banking',
      grant_type: 'authorization_code',
    };

    const { data } = await this.httpService.axiosRef.post<IOpenBankingProfile>(
      `${openBankingUrl}/oauth/2.0/token`,
      config,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
      },
    );

    // signUp시에는 이 jwtAuthGuard로 막아놓으면 됨.

    const openBankingProfile = new OpenBankingProfile(data);
    const oauthProfile = openBankingProfile.convertToOAuthProfile();
    const user = await this.validateUserUseCase.execute(
      oauthProfile,
      oauthProfile.accessToken,
      oauthProfile.refreshToken,
    );

    const { accessToken } = await this.jwtAuthService.login({
      id: user.id,
      name: user.name,
    });

    return response.redirect(
      `http://localhost:3000/signIn?tmp_access_token=${accessToken}`,
    );
  }
}
