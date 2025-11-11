import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SignupForm from './pages/SignupForm';
import SigninForm from './pages/SigninForm';
import MyPage from './pages/MyPage';
import './App.css';
import axios from 'axios';

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 로그인 상태 확인
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common['Authorization'];
    setIsLoggedIn(false);
    alert('로그아웃되었습니다.');
    navigate('/');
  };

  return (
    <nav style={{ 
      marginBottom: 20, 
      padding: '16px 24px',
      background: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <Link to="/" style={{ marginRight: 10, fontSize: '1.2rem', fontWeight: 'bold', color: '#1976d2' }}>
          User Service
        </Link>
      </div>
      <div>
        {isLoggedIn ? (
          <>
            <Link to="/mypage" style={{ marginRight: 10 }}>마이페이지</Link>
            <button 
              onClick={handleLogout}
              style={{
                background: '#f44336',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link to="/" style={{ marginRight: 10 }}>로그인</Link>
            <Link to="/signup" style={{ marginRight: 10 }}>
              <button style={{
                background: '#1976d2',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}>
                회원가입
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<SigninForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
