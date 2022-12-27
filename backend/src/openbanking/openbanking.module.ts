import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TokenModule } from 'src/token/token.module';
import { UserModule } from 'src/user/user.module';
import { OpenBankingController } from './openbanking.controller';
import { OpenBankingService } from './openbanking.service';

@Module({
  imports: [UserModule, HttpModule],
  controllers: [OpenBankingController],
  providers: [OpenBankingService],
})
export class OpenBankingModule {}
