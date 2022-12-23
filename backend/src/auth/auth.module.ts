import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { FacebookOAuthController } from './facebook/facebook.oauth.controller';
import { FacebookStrategy } from './facebook/facebook.strategy';
import { GoogleAuthController } from './google.auth.controller';
import { GoogleStrategy } from './google.strategy';
import { JwtAuthModule } from './jwt-auth.module';
import { OpenBankingOAuthController } from './openbanking/openbanking.oauth.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [JwtAuthModule, UserModule, HttpModule],
  controllers: [
    GoogleAuthController,
    FacebookOAuthController,
    OpenBankingOAuthController,
  ],
  providers: [GoogleStrategy, FacebookStrategy],
})
export class AuthModule {}
