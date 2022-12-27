import { Module } from '@nestjs/common';
import { OpenBankingController } from './openbanking.controller';

@Module({
  controllers: [OpenBankingController],
  providers: [],
})
export class OpenBankingModule {}
