import axios from "axios";
import { useEffect, useState } from "react";
import Account from "./Account";

export interface BankUser {
  api_tran_id: string;
  user_name: string;
  res_cnt: string;
  res_list: IAccount[];
}

export interface IAccount {
  fintech_use_num: string;
  account_alias: string;
  bank_name: string;
  account_holder_type: string;
  account_type: string;
  account_num_masked: string;
}

function App() {
  const [bankUser, setBankUser] = useState<BankUser | undefined>();

  useEffect(() => {
    const token = localStorage.getItem("bank_access_token");

    if (token) {
      axios
        .get("http://localhost:5000/open-banking/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setBankUser(res.data);
        });
    }
  }, []);

  return (
    <div className="App">
      <ul>
        <li>
          <a href="/login">Go to Login Page</a>
        </li>
        <li>
          <a href="/boards">Let me show my boards</a>
        </li>
      </ul>
      {bankUser && `Hello ${bankUser?.user_name}`}
      <div>
        {(bankUser?.res_list.slice(0, 2) ?? []).map((account) => (
          <Account
            key={account.fintech_use_num}
            fintechNum={account.fintech_use_num}
            accountName={account.account_alias}
            bankName={account.bank_name}
            accountNum={account.account_num_masked}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
