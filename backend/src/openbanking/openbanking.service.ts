import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import OpenBankingUser, { BankUser } from './openBankingUser';
// 얘를 써야지
@Injectable()
export class OpenBankingService {
  constructor(
    private userService: UserService,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getUser(user: { id: string; name: string; email: string }) {
    const _user = await this.userService.findOne({ id: user.id });

    const res = await this.httpService.axiosRef.get<BankUser>(
      `${this.configService.get<string>(
        'OPEN_BANKING_TEST_API',
      )}/v2.0/user/me?user_seq_no=${_user.localId}`,
      { headers: { Authorization: `Bearer ${_user.token.access_token}` } },
    );

    const data = new OpenBankingUser(res.data);

    return data;
  }
}
