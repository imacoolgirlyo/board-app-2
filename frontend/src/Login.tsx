import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isUserValidated, setIsUserValidated] = useState(false);

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
      navigate("/");
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    const openBankAccessToken = searchParams.get("tmp_access_token");
    if (openBankAccessToken) {
      localStorage.setItem("tmp_access_token", openBankAccessToken);
      setIsUserValidated(true);
    }
  }, [searchParams]);

  const handleGoogleLogin = async () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const handleFacebookLogin = async () => {
    window.open("http://localhost:5000/auth/facebook", "_self");
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

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

  return (
    <div>
      <h2>Who are you?</h2>
      <div>
        <li>
          <button onClick={handleGoogleLogin}>Google Login</button>
        </li>
        <li>
          <button onClick={handleFacebookLogin}>Facebook Login</button>
        </li>
        <li style={{ backgroundColor: "beige" }}>
          계좌 내역을 확인하고 싶으시다면?
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
      </div>
    </div>
  );
};

export default Login;
