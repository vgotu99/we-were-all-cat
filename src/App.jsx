import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/result/:type" element={<Result />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
