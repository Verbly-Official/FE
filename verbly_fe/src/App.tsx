import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProgressIndicatorDemo from "./pages/ProgressIndicatorDemo";
import LoginPage from "./pages/Onboarding/LoginPage";
import SelectLangPage from "./pages/Onboarding/SelectLangPage";
import Correction_Main from "./pages/Correction/CorrectionMainPage";
import InboxPage from "./pages/Inbox/InboxPage";
import Home_Korean from "./pages/Home/Home_Korean";
import Mypage from "./pages/My/MyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/progress-indicator" element={<ProgressIndicatorDemo />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/select-language" element={<SelectLangPage />} />
        <Route path="/correction" element={<Correction_Main />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/home-korean" element={<Home_Korean />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
