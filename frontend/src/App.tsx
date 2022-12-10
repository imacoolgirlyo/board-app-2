import { useEffect, useState } from "react";

function App() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/boards", {
      method: "get",
    })
      .then((response) => response.json())
      .then((data) => setBoards(data));
  }, []);

  return <div className="App">hello</div>;
}

export default App;
