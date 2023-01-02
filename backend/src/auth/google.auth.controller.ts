import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { GoogleOauthGuard } from './guards/google.oauth.guard';
import { JwtAuthService } from './jwt-auth.service';

@Controller('auth/google')
export class GoogleAuthController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(GoogleOauthGuard) // ?: Strategy만 연결했는데 어떻게 google oauth server로 찾아가는거지?
  async googleAuth(@Req() req) {
    // Guard가 Redirect 함
  }

  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  googleAuthRedirect(@Req() req, @Res() res: Response) {
    const { accessToken } = this.jwtAuthService.login(req.user);

    return res.redirect(
      `http://localhost:3000/login?access_token=${accessToken}`, // TODO: 이렇게 url로 전달하는 방법말고 더 좋은 방법은 없을까? refresh token도 전달해야함
    );
  }
}
