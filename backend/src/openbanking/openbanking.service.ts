import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import OpenBankingUser, { BankUser } from './openBankingUser';

interface Balance {
  balance_amt: string;
  available_amt: string;
  // api_tran_id: '3bf7c09a-f96b-4ff2-933a-4b13857e4e22',
  // rsp_code: 'A0000',
  // rsp_message: '',
  // api_tran_dtm: '20221227225144939',
  // bank_tran_id: 'M202202483U135581899',
  // bank_tran_date: '20190101',
  // bank_code_tran: '097',
  // bank_rsp_code: '000',
  // bank_rsp_message: '',
  // fintech_use_num: '120220248388941226641178',
  // balance_amt: '50000000',
  // available_amt: '10000000',
  // account_type: '1',
  // product_name: '알뜰자유적립',
  // bank_name: '오픈은행',
  // savings_bank_name: '',
  // account_issue_date: '00000000',
  // maturity_date: '00000000',
  // last_tran_date: '00000000'
}

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

  async getBalance(id: string, accountId: string) {
    const user = await this.userService.findOne({ id });

    const url = new URL(
      `${this.configService.get<string>(
        'OPEN_BANKING_TEST_API',
      )}/v2.0/account/balance/fin_num`,
    );

    const randomNum = Math.random().toString().slice(2, 11);

    url.searchParams.set('bank_tran_id', `M202202483U${randomNum}`);
    url.searchParams.set('fintech_use_num', accountId);
    url.searchParams.set('tran_dtime', '20221227101921');

    const res = await this.httpService.axiosRef.get<Balance>(url.toString(), {
      headers: { Authorization: `Bearer ${user.token.access_token}` },
    });

    return {
      amount: res.data.balance_amt,
      availableAmount: res.data.available_amt,
    };
  }
}
