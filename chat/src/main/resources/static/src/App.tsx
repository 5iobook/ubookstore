import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AppLayout, AuthGuard } from '@bookstore/common-ui';

import ChatRoomList from './pages/ChatRoomList';
import ChatRoom from './pages/ChatRoom';
import './styles-common.css';
import './App.css';

function App() {
  const navItems = [
    { label: 'Ï±ÑÌåÖÎ∞?Î™©Î°ù', path: '/' }
  ];

  return (

    <AuthGuard serviceName="Ï±ÑÌåÖ ?úÎπÑ??>
      <Router>
        <AppLayout
          title="Ï±ÑÌåÖ"
          navItems={navItems}
          pageTitle="Ï±ÑÌåÖ"
          pageDescription="?§ÏãúÍ∞?Ï±ÑÌåÖ???µÌï¥ ?§Î•∏ ?¨Ïö©?êÎì§Í≥??åÌÜµ?òÏÑ∏??"
        >
          <Routes>
            <Route path="/" element={<ChatRoomList />} />
            <Route path="/chat/:id" element={<ChatRoom />} />
          </Routes>
        </AppLayout>
      </Router>
    </AuthGuard>

  );
}

export default App;
