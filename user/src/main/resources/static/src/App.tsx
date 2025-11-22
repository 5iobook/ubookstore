import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserList from './pages/UserList';
import UserDetail from './pages/UserDetail';
import UserForm from './pages/UserForm';
import SignupForm from './pages/SignupForm';
import SigninForm from './pages/SigninForm';
import './App.css';

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: 20, padding: '10px', borderBottom: '1px solid #ddd' }}>
        <Link to="/" style={{ marginRight: 15 }}>사용자 목록</Link>
        <Link to="/new" style={{ marginRight: 15 }}>사용자 등록</Link>
        <Link to="/signup" style={{ marginRight: 15 }}>회원가입</Link>
        <Link to="/signin" style={{ marginRight: 15 }}>로그인</Link>
      </nav>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/new" element={<UserForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signin" element={<SigninForm />} />
      </Routes>
    </Router>
  );
}

export default App;
