export interface Account {
  fintech_use_num: string;
  account_alias: string;
  bank_name: string;
  account_holder_type: string;
  account_type: string;
  account_num_masked: string;
}

export interface BankUser {
  api_tran_id: string;
  user_name: string;
  res_cnt: string;
  res_list: Account[];
}

export class OpenBankAccount implements Account {
  public fintech_use_num: string;
  public account_alias: string;
  public bank_name: string;
  public account_holder_type: string;
  public account_type: string;
  public account_num_masked: string;

  constructor(data: {
    fintech_use_num: string;
    account_alias: string;
    bank_name: string;
    account_holder_type: string;
    account_type: string;
    account_num_masked: string;
  }) {
    this.fintech_use_num = data.fintech_use_num;
    this.account_alias = data.account_alias;
    this.bank_name = data.bank_name;
    this.account_holder_type = data.account_holder_type;
    this.account_type = data.account_type;
    this.account_num_masked = data.account_num_masked;
  }
}

class OpenBankingUser implements BankUser {
  public api_tran_id: string;
  public user_name: string;
  public res_cnt: string;
  public res_list: Account[];

  constructor(data: {
    api_tran_id: string;
    user_name: string;
    res_cnt: string;
    res_list: Account[];
  }) {
    this.api_tran_id = data.api_tran_id;
    this.user_name = data.user_name;
    this.res_cnt = data.res_cnt;
    this.res_list = data.res_list.map((item) => new OpenBankAccount(item));
  }
}

export default OpenBankingUser;
