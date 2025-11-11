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
      <div style={{display: 'flex', gap: '20px', marginTop: '20px'}}>
        {book.image && (
          <div>
            <img src={book.image} alt={book.title} style={{width: '200px', height: 'auto', border: '1px solid #ddd', borderRadius: '8px'}} />
          </div>
        )}
        <div style={{flex: 1}}>
          <p><strong>제목:</strong> <span dangerouslySetInnerHTML={{__html: book.title}} /></p>
          <p><strong>저자:</strong> <span dangerouslySetInnerHTML={{__html: book.author}} /></p>
          <p><strong>출판사:</strong> {book.publisher}</p>
          <p><strong>출판일:</strong> {book.pubdate}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p><strong>정가:</strong> {book.discount ? `${Number(book.discount).toLocaleString()}원` : '-'}</p>
          {book.description && (
            <div style={{marginTop: '20px'}}>
              <strong>설명:</strong>
              <p dangerouslySetInnerHTML={{__html: book.description}} style={{marginTop: '8px', lineHeight: '1.6'}} />
            </div>
          )}
          {book.link && (
            <p style={{marginTop: '20px'}}>
              <a href={book.link} target="_blank" rel="noopener noreferrer" style={{color: '#1976d2', textDecoration: 'underline'}}>
                네이버 도서 페이지 보기 →
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
