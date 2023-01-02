import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { JwtAuthModule } from './jwt-auth.module';
import { OpenBankingOAuthController } from './openbanking/openbanking.oauth.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './local/auth.controller';
import { OpenBankingStrategy } from './strategies/openbanking.strategy';
import { AuthService } from './local/auth.service';
import { LocalAuthStrategy } from './strategies/local.auth.strategy';
import { GoogleAuthController } from './google.auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { FacebookOAuthController } from './facebook/facebook.oauth.controller';
import { FacebookStrategy } from './strategies/facebook.strategy';

@Module({
  imports: [JwtAuthModule, UserModule, HttpModule],
  controllers: [
    OpenBankingOAuthController,
    AuthController,
    GoogleAuthController,
    FacebookOAuthController,
  ],
  providers: [
    OpenBankingStrategy,
    AuthService,
    LocalAuthStrategy,
    GoogleStrategy,
    FacebookStrategy,
  ],
})
export class AuthModule {}
