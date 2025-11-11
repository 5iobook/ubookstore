import { useEffect, useState } from 'react';
import { fetchWishListPage, Wish } from '../api/wishApi';

function WishList() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const size = 10;

  useEffect(() => {
    loadWishes();
  }, [page]);

  async function loadWishes() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWishListPage(page, size);
      setWishes(data.items);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error('위시리스트 목록 조회 실패:', err);
      setError('위시리스트 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>위시리스트 목록</h2>
      {loading && <p>로딩 중...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>사용자 ID</th>
                <th>도서 ID</th>
                <th>생성일</th>
              </tr>
            </thead>
            <tbody>
              {wishes.map((wish) => (
                <tr key={wish.id}>
                  <td>{wish.id}</td>
                  <td>{wish.userId}</td>
                  <td>{wish.bookId}</td>
                  <td>{new Date(wish.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 20 }}>
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

export default WishList;
