import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import TestPage from "./pages/Test";
import TestComment from "./pages/TestComment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/test" element={<TestPage />} /> */}
        <Route path="/test-comment" element={<TestComment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
