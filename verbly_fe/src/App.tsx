import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import GradientButtonTestPage from "./pages/GradientButtonTestPage";
import ProgressIndicatorDemo from "./pages/ProgressIndicatorDemo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/gradient-button-test" element={<GradientButtonTestPage />} />
        <Route path="/progress-indicator" element={<ProgressIndicatorDemo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
