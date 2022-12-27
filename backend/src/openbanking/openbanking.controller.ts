import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('open-banking')
export class OpenBankingController {
  constructor() {}

  @Get('me')
  @UseGuards(AuthGuard('jwt')) // 이걸 해주기 위해서 꼭 JwtModule을 import 해야하나?
  async getUser(@Req() req) {
    console.log('req: ', req.user);

    // const user = openBankingService.getUser(req.user)
    // 이 userInfo에 대한 interface 정의

    return '';
  }
}
