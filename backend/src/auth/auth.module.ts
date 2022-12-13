import { Module } from '@nestjs/common';
import { GoogleAuthController } from './google.auth.controller';
import { GoogleAuthService } from './google.auth.service';
import { GoogleOauthGuard } from './google.oauth.guard';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [],
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService, GoogleStrategy, GoogleOauthGuard],
})
export class AuthModule {}
