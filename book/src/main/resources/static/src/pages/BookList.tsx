import React, { useEffect, useState } from 'react';
import { fetchBookListPage } from '../api/bookApi';
import { Link, useSearchParams } from 'react-router-dom';
import '../App.css';

const PAGE_SIZE = 10;

const BookList: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 0;
  const query = searchParams.get('query') || 'spring';

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // query 파라미터를 API에 전달
    const apiUrl = `http://localhost:8087/v1/books?query=${encodeURIComponent(query)}&page=${page}&size=${PAGE_SIZE}`;
    
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const bookPage = data.data.bookPage;
        const pageInfo = bookPage.page || {};
        setBooks(bookPage.content || []);
        setTotalPages(pageInfo.totalPages || 1);
      })
      .catch(() => setError('도서 목록을 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [page, query]);

  const goToPage = (p: number) => {
    setSearchParams({ page: String(p) });
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>도서 목록</h2>
      <table>
        <thead>
          <tr>
            <th>이미지</th>
            <th>제목</th>
            <th>저자</th>
            <th>출판사</th>
            <th>가격</th>
            <th>ISBN</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.isbn || index}>
              <td>
                {book.image && <img src={book.image} alt={book.title} style={{width: '50px', height: '70px', objectFit: 'cover'}} />}
              </td>
              <td>
                <Link to={`/book/${book.isbn}${window.location.search}`} dangerouslySetInnerHTML={{__html: book.title}} />
              </td>
              <td dangerouslySetInnerHTML={{__html: book.author}} />
              <td>{book.publisher}</td>
              <td>{book.discount ? `${Number(book.discount).toLocaleString()}원` : '-'}</td>
              <td>{book.isbn}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 페이지네이션 UI */}
      <div style={{ marginTop: 16 }}>
        <button className="pagination-btn" onClick={() => goToPage(0)} disabled={page === 0}>처음</button>
        <button className="pagination-btn" onClick={() => goToPage(Math.max(0, page - 1))} disabled={page === 0}>이전</button>
        <span style={{ margin: '0 8px' }}>{page + 1} / {totalPages}</span>
        <button className="pagination-btn" onClick={() => goToPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1}>다음</button>
        <button className="pagination-btn" onClick={() => goToPage(totalPages - 1)} disabled={page >= totalPages - 1}>마지막</button>
      </div>
    </div>
  );
};

export default BookList;
