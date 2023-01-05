import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LocalAuthGuard } from '../guards/local.auth.guard';
import { JwtAuthGuard } from '../guards/jwt.auth.guard';
import { JwtAuthService } from '../services/jwt-auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  @Post('signIn')
  @UseGuards(JwtAuthGuard)
  async signInWithEmail(
    @Req() req,
    @Body() updateDto: { name: string; email: string; password: string },
  ): Promise<{ access_token: string }> {
    // TODO: usecase로 만드는게 좋겠군!
    const _user = await this.userService.findOne({ email: updateDto.email });

    if (_user) {
      throw new Error('Email exists');
    }

    const user = await this.userService.update({
      id: req.user.id,
      name: updateDto.name,
      email: updateDto.email,
      password: updateDto.password,
    });

    const { accessToken } = this.jwtAuthService.login(user);
    return { access_token: accessToken };
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async loginWithEmail(@Req() req): Promise<{ access_token: string }> {
    const { accessToken } = this.jwtAuthService.login(req.user);
    return { access_token: accessToken };
  }
}
