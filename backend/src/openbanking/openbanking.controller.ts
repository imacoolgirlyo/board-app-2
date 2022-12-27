import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OpenBankingService } from './openbanking.service';

@Controller('open-banking')
export class OpenBankingController {
  constructor(private openBankingService: OpenBankingService) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getUser(@Req() req) {
    const user = await this.openBankingService.getUser(req.user);

    return user;
  }
}
