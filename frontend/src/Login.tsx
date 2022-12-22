import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    if (accessToken) {
      localStorage.setItem("b_access_token", accessToken);
      navigate("/");
    }
  }, [searchParams, navigate]);

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
    url.searchParams.append("redirect_uri", "http://localhost:3000/login");
    url.searchParams.append("scope", "login inquiry transfer");
    url.searchParams.append("state", "12345678901234567890123456789012");
    url.searchParams.append("auth_type", "0");

    window.open(url.toString(), "_self");
  };

  return (
    <div>
      <h2>Who are you?</h2>
      <div>
        <button onClick={handleGoogleLogin}>Google Login</button>
        <button onClick={handleFacebookLogin}>Facebook Login</button>
        <button onClick={handleOpenBankingLogin}>
          Open Banking 사용자 인증
        </button>
      </div>
    </div>
  );
};

export default Login;
