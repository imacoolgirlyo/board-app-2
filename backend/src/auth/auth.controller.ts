import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { OpenBankingOauthGuard } from './openbanking/openbanking.guard';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('signIn')
  @UseGuards(OpenBankingOauthGuard)
  async signInWithEmail(@Req() req): Promise<{ access_token: string }> {
    console.log(req.user);
    // jwt token이 맞으면 기존 user를 반환
    // user에 이메일, pw 업데이트
    // const user = this.userService.update({ email, password: hashedPassword })
    // 성공시 jwt 반환
    // const accessToken = this.jwtService.signIn(user)
    return { access_token: '' };
  }
}
