import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { OpenBankingOauthGuard } from './openbanking/openbanking.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('signIn')
  @UseGuards(OpenBankingOauthGuard)
  async signInWithEmail(
    @Req() req,
    @Body() updateDto: { email: string; password: string },
  ): Promise<{ access_token: string }> {
    const user = await this.userService.update({
      id: req.user.id,
      email: updateDto.email,
      password: updateDto.password,
    });

    const access_token = this.jwtService.sign(user);
    return { access_token };
  }
}
