import React from "react";

function BrokenCup() {
  const [isBroken, setIsBroken] = React.useState(false);

  if (isBroken) {
    throw new Error("The cup is broken!");
  }
  
  return (
    <div>
      <h1>Broken Cup</h1>
      <button onClick={() => setIsBroken(true)}>Break the cup</button>
    </div>
  );
}

export default BrokenCup;
