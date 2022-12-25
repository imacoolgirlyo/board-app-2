import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

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

    const data = {
      code: query.code,
      client_id: 'c60b06fb-1c0f-4d58-8d28-6fe4cca77f22',
      client_secret: '0f481f5f-7177-4d0b-a5ed-fbda542a07ba',
      redirect_uri: 'http://localhost:5000/auth/open-banking',
      grant_type: 'authorization_code',
    };

    const res = await this.httpService.axiosRef.post<OpenBankingUserData>(
      `${openBankingUrl}/oauth/2.0/token`,
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
      },
    );

    return response.redirect(
      `http://localhost:3000/login?open_b_userId=${res.data.user_seq_no}`,
    );
  }
}
