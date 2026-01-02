import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppLayout } from '@bookstore/common-ui';
import ChatRoomList from './pages/ChatRoomList';
import ChatRoom from './pages/ChatRoom';
import './styles-common.css';
import './App.css';

function App() {
  const navItems = [
    { label: '채팅방 목록', path: '/' }
  ];

  return (
    <Router>
      <AppLayout 
        title="채팅" 
        navItems={navItems}
        pageTitle="채팅"
        pageDescription="실시간 채팅을 통해 다른 사용자들과 소통하세요."
      >
        <Routes>
          <Route path="/" element={<ChatRoomList />} />
          <Route path="/chat/:id" element={<ChatRoom />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
