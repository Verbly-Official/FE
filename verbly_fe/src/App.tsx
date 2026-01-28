import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/Onboarding/LoginPage";
import SelectLangPage from "./pages/Onboarding/SelectLangPage";
import Correction_Main from "./pages/Correction/CorrectionMainPage";
import Correction_Write from "./pages/Correction/WriteCorrectionPage";

import Home_Korean from "./pages/Home/Home_Korean";
import Home_Native from "./pages/Home/Home_Native";
import Home_Notification from "./pages/Home/Home_Notification";

import InboxPage from "./pages/Inbox/InboxPage";
import InboxReviewPage from "./pages/Inbox/ReviewPage";
import ProfilePage from "./pages/Inbox/ProfilePage";

import MyPage_Korean from "./pages/My/MyPage/My_Korean";
import MyPage_Foreigner from "./pages/My/MyPage/My_Foreigner";
import EditProfilePage from "./pages/My/EditProfilePage/EditProfilePage";
import PaymentPage from "./pages/My/PaymentPage/PaymentPage";

import Correction_NMain from "./pages/Correction/Native/CorrectionMainNativePage";
import Home_Search from "./pages/Home/Home_Search";

import LibraryPage from "./pages/Library/LibraryPage";
import LibraryReviewPage from "./pages/Library/Review/ReviewPage";
import { ReviewResultPage } from "./pages/Library/Review/ReviewResultPage";
import { WordDetailPage } from "./pages/Library/WordDetailPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/select-language" element={<SelectLangPage />} />

        <Route path="/home-korean" element={<Home_Korean />} />
        <Route path="/home-native" element={<Home_Native />} />
        <Route path="/home-notification" element={<Home_Notification />} />

        <Route path="/correction" element={<Correction_Main />} />
        <Route path="/correction/write" element={<Correction_Write />} />
        <Route path="/correction1" element={<Correction_NMain />} />

        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/review/:id" element={<InboxReviewPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />

        <Route path="/my-korean" element={<MyPage_Korean />} />
        <Route path="/my-foreigner" element={<MyPage_Foreigner />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/my-korean/payment" element={<PaymentPage />} />

        <Route path="/home-search" element={<Home_Search />} />

        <Route path="/library" element={<LibraryPage />} />
        <Route path="/library/word/:word" element={<WordDetailPage />} />
        <Route path="/review" element={<LibraryReviewPage />} />
        <Route path="/review/result" element={<ReviewResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
