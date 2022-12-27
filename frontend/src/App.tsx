import axios from "axios";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("bank_access_token");

    if (token) {
      axios
        .get("http://localhost:5000/open-banking/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
        });
    }
  }, []);

  return (
    <div className="App">
      <ul>
        <li>
          <a href="/login">Go to Login Page</a>
        </li>
        <li>
          <a href="/boards">Let me show my boards</a>
        </li>
      </ul>
    </div>
  );
}

export default App;
