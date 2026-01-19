import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import GradientButtonTestPage from "./pages/GradientButtonTestPage";
import ButtonTestPage from "./pages/Test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/gradient-button-test" element={<GradientButtonTestPage />} />
        <Route path="/test" element={<ButtonTestPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
