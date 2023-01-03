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

  // async create(token) {
  //   const date = new Date();
  //   const expires_in_days = token.expires_in / (60 * 60 * 24);
  //   const expire_date = date.setDate(date.getDate() + expires_in_days);

  //   const openBankingToken = this.openBankingTokenRepository.create({
  //     access_token: token.access_token,
  //     refresh_token: token.refresh_token,
  //     expiry_time: new Date(expire_date),
  //     metadata: {
  //       scope: token.scope,
  //       token_type: token.token_type,
  //     },
  //   });

  //   const saved = await this.openBankingTokenRepository.save(openBankingToken);

  //   return saved;
  // }
}
