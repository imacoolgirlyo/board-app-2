import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Account = ({
  fintechNum,
  accountName,
  bankName,
  accountNum,
}: {
  fintechNum: string;
  accountName: string;
  bankName: string;
  accountNum: string;
}) => {
  const [balance, setBalance] = useState<
    { amount: string; availableAmount: string } | undefined
  >();

  useEffect(() => {
    const token = localStorage.getItem("bank_access_token");
    if (token) {
      axios
        .get(`http://localhost:5000/open-banking/${fintechNum}/balance`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setBalance(res.data);
        });
    }
  }, []);

  const addComma = (amount: string) =>
    amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <AccountBox>
      <AccountInfo>
        <AccountBank>{bankName}</AccountBank>
        <AccountName>{accountName}</AccountName>
        <AccountNum>{accountNum}</AccountNum>
      </AccountInfo>
      <CheckBalanceButton>
        잔액: {addComma(balance?.amount ?? "")}
      </CheckBalanceButton>
    </AccountBox>
  );
};

const AccountBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  background-color: #3699f5;
  margin-bottom: 20px;
  padding: 5px;
  border-radius: 5px;
`;

const AccountInfo = styled.div``;

const AccountBank = styled.div`
  color: white;
  font-size: 15px;
`;

const AccountName = styled.div`
  color: white;
  margin-bottom: 5px;
  font-size: 18px;
`;

const AccountNum = styled.div`
  color: white;
  font-size: 11px;
`;

const CheckBalanceButton = styled.button`
  color: gray;
  /* border: 0; */
  height: fit-content;
`;

export default Account;
