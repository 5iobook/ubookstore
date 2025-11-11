import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPostListPage, Post } from '../api/postApi';

function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, [page]);

  async function loadPosts() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPostListPage(page, 10);
      setPosts(data.items);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error('게시글 목록 조회 실패:', err);
      setError('게시글 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 20 }}>
      <h2>게시글 목록</h2>
      
      {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
      
      {loading ? (
        <div>로딩 중...</div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>제목</th>
                <th>작성자 ID</th>
                <th>작성일</th>
                <th>상세</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.authorId}</td>
                  <td>{new Date(post.createdAt).toLocaleString('ko-KR')}</td>
                  <td>
                    <Link to={`/post/${post.id}`}>
                      <button>보기</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <button
              className="pagination-btn"
              onClick={() => setPage(0)}
              disabled={page === 0}
            >
              처음
            </button>
            <button
              className="pagination-btn"
              onClick={() => setPage(page - 1)}
              disabled={page === 0}
            >
              이전
            </button>
            <span style={{ margin: '0 10px' }}>
              {page + 1} / {totalPages || 1}
            </span>
            <button
              className="pagination-btn"
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages - 1}
            >
              다음
            </button>
            <button
              className="pagination-btn"
              onClick={() => setPage(totalPages - 1)}
              disabled={page >= totalPages - 1}
            >
              마지막
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default PostList;
