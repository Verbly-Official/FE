import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/Onboarding/LoginPage";
import SelectLangPage from "./pages/Onboarding/SelectLangPage";
import Correction_Main from "./pages/Correction/CorrectionMainPage";
import InboxPage from "./pages/Inbox/InboxPage";
import Home_Korean from "./pages/Home/Home_Korean";
import MyPage_Korean from "./pages/My/My_Korean";
import MyPage_Foreigner from "./pages/My/My_Foreigner";
import Correction_Write from "./pages/Correction/WriteCorrectionPage";
import EditProfilePage from "./pages/My/EditProfilePage";
import InboxReviewPage from "./pages/Inbox/ReviewPage";
import ProfilePage from "./pages/Inbox/ProfilePage";
import PaymentPage from "./pages/My/PaymentPage";
import Correction_NMain from "./pages/Correction/Native/CorrectionMainNativePage";
import LibraryPage from "./pages/Library/LibraryPage";
import ReviewPage from "./pages/Library/Review/ReviewPage";
import { ReviewResultPage } from "./pages/Library/Review/ReviewResultPage";
import { WordDetailPage } from "./pages/Library/WordDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/select-language" element={<SelectLangPage />} />
        <Route path="/correction" element={<Correction_Main />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/home-korean" element={<Home_Korean />} />
        <Route path="/correction/write" element={<Correction_Write />} />
        <Route path="/my-korean" element={<MyPage_Korean />} />
        <Route path="/my-foreigner" element={<MyPage_Foreigner />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/my-korean/payment" element={<PaymentPage />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/review/:id" element={<ReviewPage />} />
        <Route path="/review/:id" element={<InboxReviewPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/correction1" element={<Correction_NMain />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/library/word/:word" element={<WordDetailPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/review/result" element={<ReviewResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
