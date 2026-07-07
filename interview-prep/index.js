// 1. Define the generator function
function* numberGenerator() {
  console.log("Start");
  yield 1; // Pauses here on the first next()
  console.log("Middle");
  yield 2; // Pauses here on the second next()
  console.log("End");
  return 3;
}

// 2. Initialize the generator to get the iterator object
const gen = numberGenerator();

// 3. Step through the execution
console.log(gen.next()); // Logs: "Start" -> Outputs: { value: 1, done: false }
console.log(gen.next()); // Logs: "Middle" -> Outputs: { value: 2, done: false }
console.log(gen.next()); // Logs: "End" -> Outputs: { value: 3, done: true }
