import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Grid, BookCard, Loading, Button } from '@bookstore/common-ui';
import './BookList.css';

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

  if (loading) return <div className="book-list__loading"><Loading /></div>;
  if (error) return <Container><div className="book-list__error-message">{error}</div></Container>;

  return (
    <Container>
      <div className="book-list">
        <div className="book-list__header">
          <h2 className="book-list__title">도서 목록</h2>
          <p className="book-list__subtitle">다양한 도서를 검색하고 찾아보세요</p>
        </div>
        
        <div className="book-list__grid">
          <Grid columns={{ mobile: 1, tablet: 2, desktop: 3 }} gap="1.5rem">
            {books.map((book, index) => (
              <BookCard
                key={book.isbn || index}
                title={book.title}
                author={book.author}
                publisher={book.publisher}
                price={book.discount ? `${Number(book.discount).toLocaleString()}원` : '-'}
                image={book.image}
                isbn={book.isbn}
              />
            ))}
          </Grid>
        </div>

        <div className="book-list__pagination">
          <Button onClick={() => goToPage(0)} disabled={page === 0} variant="secondary" size="small">처음</Button>
          <Button onClick={() => goToPage(Math.max(0, page - 1))} disabled={page === 0} variant="secondary" size="small">이전</Button>
          <div className="book-list__pagination-info">
            {page + 1} / {totalPages}
          </div>
          <Button onClick={() => goToPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1} variant="secondary" size="small">다음</Button>
          <Button onClick={() => goToPage(totalPages - 1)} disabled={page >= totalPages - 1} variant="secondary" size="small">마지막</Button>
        </div>
      </div>
    </Container>
  );
};

export default BookList;
