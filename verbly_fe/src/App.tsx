import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import TestPage from "./pages/Test";
import TextButtonTestPage from "./pages/TextButtonTestPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/test" element={<TestPage />} /> */}
        <Route path="/text-button-test" element={<TextButtonTestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
