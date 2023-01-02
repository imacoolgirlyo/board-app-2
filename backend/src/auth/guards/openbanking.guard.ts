import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OpenBankingOauthGuard extends AuthGuard('open-banking') {}
