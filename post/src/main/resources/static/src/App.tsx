import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import PostForm from './pages/PostForm';
import './App.css';

function App() {
  return (
    <Router>
      <nav style={{ 
        marginBottom: 20, 
        padding: '16px 24px',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <Link to="/" style={{ marginRight: 10, fontSize: '1.2rem', fontWeight: 'bold', color: '#1976d2' }}>
            Post Service
          </Link>
        </div>
        <div>
          <Link to="/" style={{ marginRight: 10 }}>게시글 목록</Link>
          <Link to="/post/new">
            <button style={{
              background: '#1976d2',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}>
              게시글 작성
            </button>
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/post/new" element={<PostForm />} />
      </Routes>
    </Router>
  );
}

export default App;
