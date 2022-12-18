import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";

interface DecodedToken {
  exp: number;
  iat: number;
  sub: number;
}

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("b_access_token");
    if (!accessToken) {
      return;
    }

    const decodedToken: DecodedToken = jwt_decode(accessToken);
    const currentDate = new Date();
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      console.log("Token Expired!");
    } else {
      console.log("Valid Token");
      setIsAuthenticated(true);
    }
  }, []);

  return <>{isAuthenticated ? { children } : <Navigate to="/login" />}</>;
};

export default AuthGuard;
