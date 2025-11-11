import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignupForm from './pages/SignupForm';
import SigninForm from './pages/SigninForm';
import MyPage from './pages/MyPage';
import './App.css';

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 10 }}>로그인</Link>
        <Link to="/signup" style={{ marginRight: 10 }}>회원가입</Link>
        <Link to="/mypage" style={{ marginRight: 10 }}>마이페이지</Link>
      </nav>
      <Routes>
        <Route path="/" element={<SigninForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
