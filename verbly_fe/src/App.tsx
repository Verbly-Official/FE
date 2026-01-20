import { BrowserRouter, Routes, Route } from 'react-router-dom';
// 기존 import 유지...
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 기존 라우트 유지 */}
        <Route path="/login" element={<LoginPage />} />
        {/* 필요시 메인 경로를 로그인으로 변경 */}
        {/* <Route path="/" element={<LoginPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;