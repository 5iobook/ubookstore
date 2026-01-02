import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
import { AppLayout, AuthGuard } from '@bookstore/common-ui';
import MyBooks from './pages/MyBooks';
import BookSearch from './pages/BookSearch';
import BookDetail from './pages/BookDetail';
=======
import { AppLayout } from '@bookstore/common-ui';
import BookList from './pages/BookList';
import BookDetail from './pages/BookDetail';
import BookForm from './pages/BookForm';
>>>>>>> dev
import './styles-common.css';
import './App.css';

function App() {
  const navItems = [
<<<<<<< HEAD
    { label: '내 도서', path: '/' },
=======
    { label: '도서 목록', path: '/' },
>>>>>>> dev
    { label: '도서 검색', path: '/search' }
  ];

  return (
<<<<<<< HEAD
    <AuthGuard serviceName="도서 관리 서비스">
      <Router>
        <AppLayout 
          title="도서 관리" 
          navItems={navItems}
          pageTitle="도서 관리"
          pageDescription="도서 정보를 검색하고 관리할 수 있습니다."
        >
          <Routes>
            <Route path="/" element={<MyBooks />} />
            <Route path="/search" element={<BookSearch />} />
            <Route path="/book/:id" element={<BookDetail />} />
          </Routes>
        </AppLayout>
      </Router>
    </AuthGuard>
=======
    <Router basename="/book">
      <AppLayout 
        title="도서 관리" 
        navItems={navItems}
        pageTitle="도서 관리"
        pageDescription="도서 정보를 검색하고 관리할 수 있습니다."
      >
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/:id" element={<BookDetail />} />
          <Route path="/search" element={<BookForm />} />
        </Routes>
      </AppLayout>
    </Router>
>>>>>>> dev
  );
}

export default App;
