import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import GradientButtonTestPage from "./pages/GradientButtonTestPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/gradient-button-test" element={<GradientButtonTestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
