import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthService } from './google.auth.service';
import { GoogleOauthGuard } from './google.oauth.guard';

@Controller('auth/google')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() req) {
    // Guard가 Redirect 함
  }

  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  googleAuthRedirect(@Req() req) {
    return this.googleAuthService.googleLogin(req);
  }
}
