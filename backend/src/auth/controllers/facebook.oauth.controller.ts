import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { FacebookOauthGuard } from '../guards/facebook.oauth.guard';
import { Response } from 'express';
import { JwtAuthService } from '../services/jwt-auth.service';

@Controller('auth/facebook')
export class FacebookOAuthController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(FacebookOauthGuard)
  async facebookAuth() {}

  @Get('redirect')
  @UseGuards(FacebookOauthGuard)
  facebookAuthRedirect(@Req() req, @Res() res: Response) {
    const { accessToken } = this.jwtAuthService.login(req.user);

    return res.redirect(
      `http://localhost:3000/login?access_token=${accessToken}`,
    );
  }
}
