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
    const token = this.tokenRepository.create({
      access_token: accessToken,
      refresh_token: refreshToken,
      expiry_time,
    });

    const saved = await this.tokenRepository.save(token);

    return saved;
  }
}
