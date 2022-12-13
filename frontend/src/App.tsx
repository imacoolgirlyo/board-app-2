import { FormEvent, useEffect, useState } from "react";
import { Board } from "./model/Board";

function App() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [title, setTitle] = useState<string | undefined>();

  useEffect(() => {
    fetch("http://localhost:5000/boards", {
      method: "get",
    })
      .then((response) => response.json())
      .then((data) => setBoards(data));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const body = JSON.stringify({ title, description: "description" });

    const response = await fetch("http://localhost:5000/boards", {
      method: "post",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const newBoard = await response.json();

    setBoards((boards) => [...boards, newBoard]);
  };

  const handleGoogleLogin = async () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div className="App">
      <button onClick={handleGoogleLogin}>Google Login</button>
      {boards.map((board) => (
        <div>{board.title}</div>
      ))}
      <form onSubmit={handleSubmit}>
        <input src={title} onChange={(e) => setTitle(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
