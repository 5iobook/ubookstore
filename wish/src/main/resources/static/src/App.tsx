import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WishList from './pages/WishList';
import WishForm from './pages/WishForm';
import './App.css';

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 10 }}>위시리스트 목록</Link>
        <Link to="/new" style={{ marginRight: 10 }}>위시리스트 추가</Link>
      </nav>
      <Routes>
        <Route path="/" element={<WishList />} />
        <Route path="/new" element={<WishForm />} />
      </Routes>
    </Router>
  );
}

export default App;
