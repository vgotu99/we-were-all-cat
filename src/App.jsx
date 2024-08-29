import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Feedback from "./pages/Feedback";
import Update from "./pages/Update";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/result/:type" element={<Result />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/update" element={<Update />} />
    </Routes>
  );
}

export default App;
