import { Module } from '@nestjs/common';
import { GoogleAuthController } from './google.auth.controller';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [],
  controllers: [GoogleAuthController],
  providers: [GoogleStrategy],
})
export class AuthModule {}
