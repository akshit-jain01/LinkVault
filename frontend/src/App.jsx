import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import View from "./View";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/view/:id" element={<View />} />
    </Routes>
  );
}
