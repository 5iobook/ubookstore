import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AppLayout, AuthGuard } from '@bookstore/common-ui';
import MyBooks from './pages/MyBooks';
import BookSearch from './pages/BookSearch';
import BookDetail from './pages/BookDetail';

import './styles-common.css';
import './App.css';

function App() {
  const navItems = [

    { label: '???„ì„œ', path: '/' },

    { label: '?„ì„œ ê²€??, path: '/search' }
  ];

  return (

    <AuthGuard serviceName="?„ì„œ ê´€ë¦??œë¹„??>
      <Router>
        <AppLayout 
          title="?„ì„œ ê´€ë¦? 
          navItems={navItems}
          pageTitle="?„ì„œ ê´€ë¦?
          pageDescription="?„ì„œ ?•ë³´ë¥?ê²€?‰í•˜ê³?ê´€ë¦¬í•  ???ˆìŠµ?ˆë‹¤."
        >
          <Routes>
            <Route path="/" element={<MyBooks />} />
            <Route path="/search" element={<BookSearch />} />
            <Route path="/book/:id" element={<BookDetail />} />
          </Routes>
        </AppLayout>
      </Router>
    </AuthGuard>

  );
}

export default App;
