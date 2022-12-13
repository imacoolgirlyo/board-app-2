import { Module } from '@nestjs/common';
import { GoogleAuthController } from './google.auth.controller';
import { GoogleStrategy } from './google.strategy';
import { JwtAuthModule } from './jwt-auth.module';

@Module({
  imports: [JwtAuthModule],
  controllers: [GoogleAuthController],
  providers: [GoogleStrategy],
})
export class AuthModule {}
