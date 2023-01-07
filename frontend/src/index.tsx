import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import AuthGuard from "./AuthGuard";
import Board from "./Board";
import Login from "./Login";
import Mart from "./Mart";
import reportWebVitals from "./reportWebVitals";
import SignIn from "./SignIn";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "/boards",
    element: (
      <AuthGuard>
        <Board />
      </AuthGuard>
    ),
  },
  { path: "/login", element: <Login /> },
  { path: "/signIn", element: <SignIn /> },
  { path: "/mart", element: <Mart /> },
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
