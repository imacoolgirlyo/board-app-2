import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local/local.auth.guard';

@Controller('open-banking')
export class OpenBankingController {
  constructor() {}

  @Get('me')
  @UseGuards(LocalAuthGuard)
  async getUser(@Req() req) {
    console.log('req: ', req);

    // const user = openBankingService.getUser(req.user)
    // 이 userInfo에 대한 interface 정의

    return '';
  }
}
