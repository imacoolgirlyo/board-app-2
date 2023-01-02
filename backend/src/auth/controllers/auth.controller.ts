import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LocalAuthGuard } from '../guards/local.auth.guard';
import { JwtAuthGuard } from '../guards/jwt.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('signIn')
  @UseGuards(JwtAuthGuard)
  async signInWithEmail(
    @Req() req,
    @Body() updateDto: { name: string; email: string; password: string },
  ): Promise<{ access_token: string }> {
    const user = await this.userService.update({
      id: req.user.id,
      name: updateDto.name,
      email: updateDto.email,
      password: updateDto.password,
    });

    const access_token = this.jwtService.sign(user);
    return { access_token };
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async loginWithEmail(@Req() req): Promise<{ access_token: string }> {
    const access_token = this.jwtService.sign(req.user);
    return { access_token };
  }
}
