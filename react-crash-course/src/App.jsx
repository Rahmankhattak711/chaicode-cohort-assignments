import { useState } from "react";
import {Button} from "./components/ui//button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>React Crash Course</h1>
      <p>Count: {count}</p>
      <Button
        variant="default"
        size="default"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </Button>
    </div>
  );
}

export default App;
