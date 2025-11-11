import React, { useEffect, useState } from 'react';
import { fetchBookDetail } from '../api/bookApi';
import { useParams } from 'react-router-dom';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchBookDetail(id)
      .then(setBook)
      .catch(() => setError('도서 상세 정보를 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!book) return <div>도서 정보가 없습니다.</div>;

  return (
    <div>
      <button onClick={() => window.history.back()} style={{marginBottom: 16, padding: '6px 16px', borderRadius: 4, border: '1px solid #1976d2', background: '#1976d2', color: '#fff', cursor: 'pointer'}}>← 뒤로 가기</button>
      <h2>도서 상세</h2>
      <p><strong>ID:</strong> {book.id}</p>
      <p><strong>제목:</strong> {book.title}</p>
      <p><strong>저자:</strong> {book.author}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>가격:</strong> {book.price?.toLocaleString()}원</p>
      <p><strong>재고:</strong> {book.stock}</p>
      <p><strong>등록일:</strong> {book.createdAt || '-'}</p>
    </div>
  );
};

export default BookDetail;
