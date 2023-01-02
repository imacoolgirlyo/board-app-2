import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { IdentityProvider, SocialProfile } from '../socialProfile.model';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

interface OpenBankingUserData {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  user_seq_no: string;
}

@Controller('auth/open-banking')
export class OpenBankingOAuthController {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
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

    const { data } = await this.httpService.axiosRef.post<OpenBankingUserData>(
      `${openBankingUrl}/oauth/2.0/token`,
      config,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
      },
    );

    const openBankingProfile = {
      id: data.user_seq_no,
      name: '',
      email: '',
      provider: IdentityProvider.OPEN_BANKING,
      token: {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_in: data.expires_in,
        scope: data.scope,
        token_type: data.token_type,
      },
    };

    // const user = await this.userService.create(openBankingProfile);
    // const temporaryJwt = await this.jwtService.sign(user);

    return response.redirect(`http://localhost:3000/signIn?tmp_access_token=`);
  }
}
