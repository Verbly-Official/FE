import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import TestPage from "./pages/Test";
import InteractionTestPage from "./pages/InteractionTestPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/test" element={<TestPage />} /> */}
        <Route path="/interaction-test" element={<InteractionTestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
