import { useState, useEffect } from 'react';
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
      setPosts(data.postPage.content);
      setTotalPages(data.postPage.page.totalPages);
    } catch (err) {
      console.error('게시글 목록 조회 실패:', err);
      setError('게시글 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 20 }}>
      <h2>게시글 목록</h2>
      
      {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
      
      {loading ? (
        <div>로딩 중...</div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>제목</th>
                <th>가격</th>
                <th>상태</th>
                <th>조회수</th>
                <th>찜</th>
                <th>해시태그</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={index}>
                  <td>{post.title}</td>
                  <td>{post.price.amount.toLocaleString()} {post.price.currency}</td>
                  <td>{post.condition}</td>
                  <td>{post.viewCount}</td>
                  <td>{post.wishCount}</td>
                  <td>
                    {post.hashtagList.map((tag, i) => (
                      <span key={i} style={{ 
                        background: '#e3f2fd', 
                        padding: '2px 8px', 
                        borderRadius: 4, 
                        marginRight: 4,
                        fontSize: '0.85rem'
                      }}>
                        #{tag.name}
                      </span>
                    ))}
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
