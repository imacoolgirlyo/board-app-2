import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpenBankingToken, Token } from './token.entity';
import { TokenService } from './token.service';

@Module({
  imports: [TypeOrmModule.forFeature([Token, OpenBankingToken])],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
