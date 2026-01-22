import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProgressIndicatorDemo from "./pages/ProgressIndicatorDemo";
import LoginPage from "./pages/Onboarding/LoginPage";
import SelectLangPage from "./pages/Onboarding/SelectLangPage";
import Correction_Main from "./pages/Correction/CorrectionMainPage";
import Mypage from "./pages/Mypage/MyPage";
import Correction_Write from "./pages/Correction/WriteCorrectionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/progress-indicator" element={<ProgressIndicatorDemo />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/select-language" element={<SelectLangPage />} />
        <Route path="/correction" element={<Correction_Main />} />
        <Route path="/correction/write" element={<Correction_Write />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
