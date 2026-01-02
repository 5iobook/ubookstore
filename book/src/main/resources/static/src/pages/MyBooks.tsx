import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Loading, Button, Pagination } from '@bookstore/common-ui';
import './MyBooks.css';

const PAGE_SIZE = 10;

interface Book {
  id?: string;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  discount: number;
  image: string;
  addedAt?: string;
}

const MyBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);

  useEffect(() => {
    loadMyBooks();
  }, [page]);

  const loadMyBooks = () => {
    setLoading(true);
    setError(null);

    try {
      // 로컬 스토리지에서 내 도서 목록 불러오기
      const savedBooks = localStorage.getItem('myBooks');
      const bookList = savedBooks ? JSON.parse(savedBooks) : [];

      // 페이징 처리
      const totalElements = bookList.length;
      const totalPages = Math.ceil(totalElements / PAGE_SIZE);
      const startIndex = page * PAGE_SIZE;
      const endIndex = Math.min(startIndex + PAGE_SIZE, totalElements);

      const pagedBooks = bookList.slice(startIndex, endIndex);

      setBooks(pagedBooks);
      setTotalPages(totalPages);
    } catch (err) {
      console.error('내 도서 목록 조회 실패:', err);
      setError('내 도서 목록을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = (isbn: string) => {
    if (!confirm('이 도서를 내 도서에서 삭제하시겠습니까?')) {
      return;
    }

    try {
      // 로컬 스토리지에서 삭제
      const savedBooks = localStorage.getItem('myBooks');
      if (savedBooks) {
        const bookList = JSON.parse(savedBooks);
        const filteredBooks = bookList.filter((book: any) => book.isbn !== isbn);
        localStorage.setItem('myBooks', JSON.stringify(filteredBooks));

        alert('도서가 삭제되었습니다.');
        loadMyBooks(); // 목록 새로고침
      }
    } catch (error) {
      console.error('도서 삭제 실패:', error);
      alert('도서 삭제에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="xl" className="my-books">
        <div className="my-books__loading" role="status" aria-live="polite">
          <Loading size="lg" text="내 도서 목록을 불러오는 중..." />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" className="my-books">
        <div className="my-books__error" role="alert" aria-live="assertive">
          <p className="my-books__error-message">{error}</p>
          <Button variant="primary" onClick={loadMyBooks}>
            다시 시도
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" className="my-books">
      <header className="my-books__header">
        <h1 className="my-books__title">내 도서</h1>
        <p className="my-books__subtitle">내가 추가한 도서들을 관리하세요</p>
      </header>

      {books.length === 0 ? (
        <div className="my-books__empty" role="status" style={{
          textAlign: 'center',
          padding: 'var(--spacing-8)',
          color: 'var(--text-secondary)'
        }}>
          <p style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-4)' }}>
            아직 추가된 도서가 없습니다.
          </p>
          <Link to="/search">
            <Button variant="primary">
              도서 검색하러 가기
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <section aria-label="내 도서 목록" className="my-books__grid">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--spacing-4)' }}>
              {books.map((book, index) => (
                <Card key={book.isbn || index} hoverable>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                    {book.image && (
                      <img
                        src={book.image}
                        alt={book.title}
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: 'var(--radius-base)'
                        }}
                      />
                    )}
                    <div>
                      <h3 style={{
                        margin: 0,
                        fontSize: 'var(--font-size-lg)',
                        fontWeight: 'var(--font-weight-semibold)',
                        lineHeight: 'var(--line-height-tight)'
                      }}>
                        {book.title}
                      </h3>
                      <p style={{
                        margin: 'var(--spacing-1) 0',
                        color: 'var(--text-secondary)',
                        fontSize: 'var(--font-size-sm)'
                      }}>
                        {book.author}
                      </p>
                      <p style={{
                        margin: 'var(--spacing-1) 0',
                        color: 'var(--text-tertiary)',
                        fontSize: 'var(--font-size-xs)'
                      }}>
                        {book.publisher}
                      </p>
                      {book.discount && book.discount > 0 && (
                        <p style={{
                          margin: 'var(--spacing-2) 0',
                          fontSize: 'var(--font-size-lg)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: 'var(--color-primary-500)'
                        }}>
                          {Number(book.discount).toLocaleString()}원
                        </p>
                      )}
                      <div style={{
                        marginTop: 'var(--spacing-3)',
                        paddingTop: 'var(--spacing-3)',
                        borderTop: '1px solid var(--border-secondary)',
                        display: 'flex',
                        justifyContent: 'flex-end'
                      }}>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteBook(book.isbn)}
                        >
                          삭제
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {totalPages > 1 && (
            <Pagination
              currentPage={page + 1}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage - 1)}
              showInfo={true}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default MyBooks;