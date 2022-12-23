import { Controller, Get, Query } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import * as FormData from 'form-data';

@Controller('auth/open-banking')
export class OpenBankingOAuthController {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  async openBankingAuth(@Query() query: { code: string }) {
    console.log(query.code);
    const openBankingUrl = this.configService.get<string>(
      'OPEN_BANKING_TEST_API',
    );

    const formData = new FormData();
    formData.append('code', query.code);
    formData.append(
      'client_id',
      this.configService.get<string>('OPEN_BANKING_CLINET_ID'),
    );
    formData.append(
      'client_secret',
      this.configService.get<string>('OPEN_BANKING_SECERT'),
    );
    formData.append('redirect_uri', 'http://localhost:3000/login');
    formData.append('grant_type', 'authorization_code');

    const data = {
      code: query.code,
      client_id: this.configService.get<string>('OPEN_BANKING_CLINET_ID'),
      client_secret: this.configService.get<string>('OPEN_BANKING_SECERT'),
      redirect_uri: 'http://localhost:3000/login',
      grant_type: 'authorization_code',
    };

    const response = await firstValueFrom(
      this.httpService.post(openBankingUrl, JSON.stringify(data), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }),
    );

    console.log(response);
  }
}
