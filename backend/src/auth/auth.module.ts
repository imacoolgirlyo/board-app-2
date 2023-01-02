import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { JwtAuthModule } from './jwt-auth.module';
import { OpenBankingOAuthController } from './controllers/openbanking.oauth.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './controllers/auth.controller';
import { LocalAuthService } from './services/local-auth.service';
import { LocalAuthStrategy } from './strategies/local.auth.strategy';
import { GoogleAuthController } from './controllers/google.auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { FacebookOAuthController } from './controllers/facebook.oauth.controller';
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
    LocalAuthService,
    LocalAuthStrategy,
    GoogleStrategy,
    FacebookStrategy,
  ],
})
export class AuthModule {}
