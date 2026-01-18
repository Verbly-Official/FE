import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import TestPage from "./pages/Test";
import IconButtonTestPage from "./pages/IconButtonTestPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/test" element={<TestPage />} /> */}
        <Route path="/icon-button-test" element={<IconButtonTestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
