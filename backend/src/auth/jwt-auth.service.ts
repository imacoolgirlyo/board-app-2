import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-auth.strategy';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  login(user: JwtPayload) {
    const payload: JwtPayload = { name: user.name, id: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
