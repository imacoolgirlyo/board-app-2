import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { GoogleOauthGuard } from './google.oauth.guard';
import { JwtAuthService } from './jwt-auth.service';

@Controller('auth/google')
export class GoogleAuthController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() req) {
    // Guard가 Redirect 함
  }

  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  googleAuthRedirect(@Req() req, @Res() res: Response) {
    const { accessToken } = this.jwtAuthService.login(req.user);
    console.log('req.user: ', req.user);
    // TODO: save User Data
    res.cookie('jwt', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
    });

    // 근데 root로 보내는게 맞나?

    return res.redirect('http://localhost:3000/');
  }
}
