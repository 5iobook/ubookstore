import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createWish } from '../api/wishApi';

function WishForm() {
  const [userId, setUserId] = useState('');
  const [bookId, setBookId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createWish({ userId, bookId });
      alert('위시리스트에 추가되었습니다.');
      navigate('/');
    } catch (err) {
      console.error('위시리스트 추가 실패:', err);
      setError('위시리스트 추가에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>위시리스트 추가</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label className="form-label">사용자 ID:</label>
          <input
            className="form-input"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label className="form-label">도서 ID:</label>
          <input
            className="form-input"
            type="text"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? '추가 중...' : '추가'}
        </button>
        <button
          type="button"
          onClick={() => navigate('/')}
          style={{ marginLeft: 10 }}
        >
          취소
        </button>
      </form>
    </div>
  );
}

export default WishForm;
