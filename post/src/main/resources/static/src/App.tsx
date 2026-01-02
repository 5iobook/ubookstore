import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AppLayout, AuthGuard } from '@bookstore/common-ui';

import PostList from './pages/PostList';
import PostForm from './pages/PostForm';
import './styles-common.css';
import './App.css';

function App() {
  const navItems = [
    { label: '게시글 목록', path: '/' },

    { label: '게시글 ?�성', path: '/new' }
  ];

  return (
    <AuthGuard serviceName="게시글 관�??�비??>
      <Router>
        <AppLayout 
          title="게시글 관�? 
          navItems={navItems}
          pageTitle="게시글 관�?
          pageDescription="커뮤니티 게시글을 작성하고 관리할 수 있습니다."
        >
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/new" element={<PostForm />} />
          </Routes>
        </AppLayout>
      </Router>
    </AuthGuard>

  );
}

export default App;
