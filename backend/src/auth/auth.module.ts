import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { JwtAuthModule } from './jwt-auth.module';
import { OpenBankingOAuthController } from './openbanking/openbanking.oauth.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './auth.controller';
import { OpenBankingStrategy } from './openbanking/openbanking.strategy';

@Module({
  imports: [JwtAuthModule, UserModule, HttpModule],
  controllers: [OpenBankingOAuthController, AuthController],
  providers: [OpenBankingStrategy],
})
export class AuthModule {}
