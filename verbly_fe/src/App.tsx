import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import LoginPage from "./pages/Onboarding/LoginPage";
import SelectLangPage from "./pages/Onboarding/SelectLangPage";
import Correction_Main from "./pages/Correction/CorrectionMainPage";
import Mypage from "./pages/Mypage/MyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/select-language" element={<SelectLangPage />} />
        <Route path="/correction" element={<Correction_Main />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
