import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import GradientButtonTestPage from "./pages/GradientButtonTestPage";
import ProgressIndicatorDemo from "./pages/ProgressIndicatorDemo";
import LoginPage from "./pages/LoginPage";
import SelectLangPage from "./pages/SelectLangPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/gradient-button-test" element={<GradientButtonTestPage />} />
        <Route path="/progress-indicator" element={<ProgressIndicatorDemo />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/select-language" element={<SelectLangPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;