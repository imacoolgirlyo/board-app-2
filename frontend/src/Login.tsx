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

  return (
    <div>
      <h2>Who are you?</h2>
      <div>
        <button onClick={handleGoogleLogin}>Google Login</button>
        <button onClick={handleFacebookLogin}>Facebook Login</button>
      </div>
    </div>
  );
};

export default Login;
