import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AlertList from './pages/AlertList';
import AlertDetail from './pages/AlertDetail';
import './App.css';

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 10 }}>알림 목록</Link>
      </nav>
      <Routes>
        <Route path="/" element={<AlertList />} />
        <Route path="/alert/:id" element={<AlertDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
