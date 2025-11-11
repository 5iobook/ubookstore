import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookList from './pages/BookList';
import BookDetail from './pages/BookDetail';
import BookForm from './pages/BookForm';
import './App.css';

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 10 }}>도서 목록</Link>
        <Link to="/book/new" style={{ marginRight: 10 }}>도서 등록</Link>
      </nav>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/book/new" element={<BookForm />} />
      </Routes>
    </Router>
  );
}

export default App;
