import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token) private tokenRepository: Repository<Token>,
  ) {}

  async save(accessToken: string, refreshToken?: string, expiry_time?: number) {
    await this.tokenRepository.save({
      access_token: accessToken,
      refreshToken: refreshToken,
      expiry_time,
    });
  }
}
