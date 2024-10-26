import { useState } from "react";
import Weather from "./Weather.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App w-full">
        <Weather />
      </div>
    </>
  );
}

export default App;
