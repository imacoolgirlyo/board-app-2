import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { FacebookOAuthController } from './facebook/facebook.oauth.controller';
import { FacebookStrategy } from './facebook/facebook.strategy';
import { GoogleAuthController } from './google.auth.controller';
import { GoogleStrategy } from './google.strategy';
import { JwtAuthModule } from './jwt-auth.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [JwtAuthModule, UserModule, TokenModule],
  controllers: [GoogleAuthController, FacebookOAuthController],
  providers: [GoogleStrategy, FacebookStrategy],
})
export class AuthModule {}
