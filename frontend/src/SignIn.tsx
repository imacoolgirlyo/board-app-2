import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SignIn = () => {
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [isUserValidated, setIsUserValidated] = useState(false);

  useEffect(() => {
    const openBankAccessToken = searchParams.get("tmp_access_token");
    if (openBankAccessToken) {
      localStorage.setItem("tmp_access_token", openBankAccessToken);
      setIsUserValidated(true);
    }
  }, [searchParams]);

  const handleSubmit = async () => {
    const tmpToken = localStorage.getItem("tmp_access_token");
    const res = await axios.post<{ access_token: string }>(
      "http://localhost:5000/auth/signIn",
      {
        name,
        email,
        password,
      },
      { headers: { authorization: `Bearer ${tmpToken}` } }
    );

    localStorage.removeItem("tmp_access_token");
    localStorage.setItem("bank_access_token", res.data.access_token);

    navigate("/");
  };

  const handleOpenBankingLogin = async () => {
    const url = new URL(
      "https://testapi.openbanking.or.kr/oauth/2.0/authorize"
    );
    url.searchParams.append("response_type", "code");
    url.searchParams.append(
      "client_id",
      "c60b06fb-1c0f-4d58-8d28-6fe4cca77f22"
    );
    url.searchParams.append(
      "redirect_uri",
      "http://localhost:5000/auth/open-banking"
    );
    url.searchParams.append("scope", "login inquiry transfer");
    url.searchParams.append("state", "12345678901234567890123456789012");
    url.searchParams.append("auth_type", "0");

    console.log("url.toString(): ", url.toString());
    window.open(url.toString(), "_self");
  };

  return (
    <li style={{ backgroundColor: "beige" }}>
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          {isUserValidated ? "✅ 유저 인증 완료" : "🚨 유저 인증 필요!!!!"}
          <button onClick={handleOpenBankingLogin}>공인 인증하기</button>
        </div>

        <button onClick={handleSubmit}>가입 하기</button>
      </div>
    </li>
  );
};

export default SignIn;
