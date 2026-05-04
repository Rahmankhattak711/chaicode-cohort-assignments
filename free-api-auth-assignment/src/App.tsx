import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import GetUser from "./components/GetUser";
import Login from "./components/login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
      <GetUser />
    </>
  );
}

export default App;
