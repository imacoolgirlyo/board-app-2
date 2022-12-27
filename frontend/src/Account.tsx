import styled from "styled-components";

const Account = ({
  fintechNum,
  accountName,
  bankName,
}: {
  fintechNum: string;
  accountName: string;
  bankName: string;
}) => {
  return (
    <AccountBox>
      <AccountInfo>
        <AccountName>{accountName}</AccountName>
        <AccountNum>{fintechNum}</AccountNum>
      </AccountInfo>
      <CheckBalanceButton>잔액 조회</CheckBalanceButton>
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
