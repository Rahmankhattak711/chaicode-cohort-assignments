import { Suspense, useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import BrokenCup from "./BrokenCup";
import ErrorFallback from "./ErrorFallback";
import StopWatch from "./components/StopWatch";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/v1/public/randomproducts`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .then(() => console.log(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <StopWatch/>
      {/* <h1>React Crash Course</h1>
      <p>Count: {count}</p>
      <Button
        variant="default"
        size="default"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </Button>

      {data && (
        <div>
          <h2>Random Products</h2>
          <ul>
            {data.data.data.map((product) => (
              <li key={product.id}>
                {product.title} - ${product.price} ({product.brand})
              </li>
            ))}
          </ul>
        </div>
      )}

      <ErrorFallback fallbackComponent={ErrorFallback}>
        <BrokenCup />
      </ErrorFallback> */}
    </div>
  );
}

export default App;
