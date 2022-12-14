import { Module } from '@nestjs/common';
import { FacebookOAuthController } from './facebook/facebook.oauth.controller';
import { FacebookStrategy } from './facebook/facebook.strategy';
import { GoogleAuthController } from './google.auth.controller';
import { GoogleStrategy } from './google.strategy';
import { JwtAuthModule } from './jwt-auth.module';

@Module({
  imports: [JwtAuthModule],
  controllers: [GoogleAuthController, FacebookOAuthController],
  providers: [GoogleStrategy, FacebookStrategy],
})
export class AuthModule {}
