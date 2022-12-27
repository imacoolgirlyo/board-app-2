import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { JwtAuthModule } from './jwt-auth.module';
import { OpenBankingOAuthController } from './openbanking/openbanking.oauth.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './local/auth.controller';
import { OpenBankingStrategy } from './openbanking/openbanking.strategy';
import { AuthService } from './local/auth.service';
import { LocalAuthStrategy } from './local/local.auth.strategy';

@Module({
  imports: [JwtAuthModule, UserModule, HttpModule],
  controllers: [OpenBankingOAuthController, AuthController],
  providers: [OpenBankingStrategy, AuthService, LocalAuthStrategy],
})
export class AuthModule {}
