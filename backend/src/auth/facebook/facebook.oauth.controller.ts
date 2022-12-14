import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { FacebookOauthGuard } from './facebook.oauth.guard';
import { Response } from 'express';

@Controller('auth/facebook')
export class FacebookOAuthController {
  constructor() {
    //
  }

  @Get()
  @UseGuards(FacebookOauthGuard)
  async facebookAuth() {
    //
  }

  @Get('redirect')
  @UseGuards(FacebookOauthGuard)
  facebookAuthRedirect(@Req() req, @Res() res: Response) {
    console.log(req.user);

    return res.redirect('http://localhost:3000/');
  }
}
