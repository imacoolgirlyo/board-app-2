import { Controller, Get, Query } from '@nestjs/common';

@Controller('auth/open-banking')
export class OpenBankingOAuthController {
  constructor() {}

  @Get()
  async openBankingAuth(@Query() query: { code: string }) {
    console.log(query.code);
  }
}
