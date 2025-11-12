import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ChatRoomList from './pages/ChatRoomList';
import ChatRoom from './pages/ChatRoom';
import './App.css';

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 10 }}>채팅방 목록</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ChatRoomList />} />
        <Route path="/chat/:id" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
