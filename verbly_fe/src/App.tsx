import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestPage from "./pages/Test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
