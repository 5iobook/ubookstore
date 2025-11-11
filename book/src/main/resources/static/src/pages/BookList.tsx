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

  useEffect(() => {
    setLoading(true);
    fetchBookListPage(page, PAGE_SIZE)
      .then(res => {
        setBooks(res.books);
        setTotalPages(res.totalPages);
      })
      .catch(() => setError('도서 목록을 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [page]);

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
            <th>ID</th>
            <th>제목</th>
            <th>저자</th>
            <th>ISBN</th>
            <th>가격</th>
            <th>재고</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>
                <Link to={`/book/${book.id}${window.location.search}`}>{book.id}</Link>
              </td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>{book.price?.toLocaleString()}원</td>
              <td>{book.stock}</td>
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
