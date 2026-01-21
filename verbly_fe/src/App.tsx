import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import ProgressIndicatorDemo from "./pages/ProgressIndicatorDemo";
import LoginPage from "./pages/LoginPage";
import SelectLangPage from "./pages/SelectLangPage";
import Correction_Main from "./pages/Correction/CorrectionMainPage";
import InboxPage from "./pages/Inbox/InboxPage";
import Home_Korean from "./pages/Home/Home_Korean";

function App() {
  return (
    <BrowserRouter>
      <nav className="p-2 bg-gray-100 mb-4 flex gap-4">
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
        <Link to="/inbox" className="text-blue-500 hover:underline">
          Inbox
        </Link>
      </nav>

      <Routes>
        <Route path="/progress-indicator" element={<ProgressIndicatorDemo />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/select-language" element={<SelectLangPage />} />
        <Route path="/correction" element={<Correction_Main />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/home-korean" element={<Home_Korean />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
