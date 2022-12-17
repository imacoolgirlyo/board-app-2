import React from "react";

const Login = () => {
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
