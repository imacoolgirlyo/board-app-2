import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
      navigate("/");
    }
  }, [searchParams, navigate]);

  const handleGoogleLogin = async () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const handleFacebookLogin = async () => {
    window.open("http://localhost:5000/auth/facebook", "_self");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <li>
          로그인 하기
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
        </li>
        <a href="/signIn">
          계좌 내역을 확인하고 싶으신데 아직 가입하지 않았다면?
        </a>
      </div>
    </div>
  );
};

export default Login;
