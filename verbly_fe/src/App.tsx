import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/Onboarding/LoginPage";
import SelectLangPage from "./pages/Onboarding/SelectLangPage";
import Correction_Main from "./pages/Correction/CorrectionMainPage";
import InboxPage from "./pages/Inbox/InboxPage";
import Home_Korean from "./pages/Home/Home_Korean";
import Mypage from "./pages/My/MyPage";
import Correction_Write from "./pages/Correction/WriteCorrectionPage";
import ReviewPage from "./pages/Inbox/ReviewPage";
import ProfilePage from "./pages/Inbox/ProfilePage";
import Correction_NMain from "./pages/Correction/Native/CorrectionMainNativePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/select-language" element={<SelectLangPage />} />
        <Route path="/correction" element={<Correction_Main />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/home-korean" element={<Home_Korean />} />
        <Route path="/correction/write" element={<Correction_Write />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/review/:id" element={<ReviewPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/correction1" element={<Correction_NMain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
