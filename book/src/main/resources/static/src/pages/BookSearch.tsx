import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Card, Loading, Button, Pagination, Input, Checkbox } from '@bookstore/common-ui';
import './BookSearch.css';

const PAGE_SIZE = 10;

interface Book {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  discount: number;
  image: string;
  link?: string;
  description?: string;
}

const BookSearch: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [myBooks, setMyBooks] = useState<Set<string>>(new Set());
  const [processingBooks, setProcessingBooks] = useState<Set<string>>(new Set());
  const page = Number(searchParams.get('page')) || 0;
  const query = searchParams.get('query') || 'spring';

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  useEffect(() => {
    loadBooks();
  }, [page, query]);

  useEffect(() => {
    loadMyBooks();
  }, []);

  const loadBooks = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = `/v1/books?query=${encodeURIComponent(query)}&page=${page}&size=${PAGE_SIZE}`;
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (data.code === '0') {
        const bookPage = data.data.bookPage;
        const pageInfo = bookPage.page || {};
        setBooks(bookPage.content || []);
        setTotalPages(pageInfo.totalPages || 1);
      } else {
        setError('도서를 검색하지 못했습니다.');
      }
    } catch (err) {
      console.error('도서 검색 실패:', err);
      setError('도서를 검색하지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const loadMyBooks = () => {
    try {
      console.log('내 도서 목록 조회 시작...');
      
      // 로컬 스토리지에서 내 도서 목록 불러오기
      const savedBooks = localStorage.getItem('myBooks');
      if (savedBooks) {
        const bookList = JSON.parse(savedBooks);
        const myBookIsbns = new Set(bookList.map((book: any) => book.isbn as string));
        console.log('로컬 스토리지에서 불러온 내 도서 ISBN 목록:', myBookIsbns);
        setMyBooks(myBookIsbns);
      } else {
        console.log('저장된 도서가 없습니다.');
        setMyBooks(new Set());
      }
    } catch (err) {
      console.error('내 도서 목록 조회 실패:', err);
      setMyBooks(new Set());
    }
  };

  const goToPage = (p: number) => {
    const params: Record<string, string> = { page: String(p) };
    if (query) {
      params.query = query;
    }
    setSearchParams(params);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params: Record<string, string> = { page: '0' };
    if (searchQuery.trim()) {
      params.query = searchQuery.trim();
    }
    setSearchParams(params);
  };

  const handleBookToggle = (book: Book, isChecked: boolean) => {
    const isbn = book.isbn;
    console.log('=== 체크박스 클릭 ===');
    console.log('도서 토글:', isbn, isChecked ? '추가' : '삭제');
    console.log('현재 myBooks:', myBooks);

    if (processingBooks.has(isbn)) {
      console.log('이미 처리 중인 도서:', isbn);
      return;
    }

    setProcessingBooks(prev => new Set([...prev, isbn]));

    setTimeout(() => {
      try {
        if (isChecked) {
          // 도서 추가
          console.log('도서 추가 시작:', book);
          
          const savedBooks = localStorage.getItem('myBooks');
          const bookList = savedBooks ? JSON.parse(savedBooks) : [];
          const exists = bookList.some((savedBook: any) => savedBook.isbn === isbn);
          
          if (exists) {
            console.log('이미 존재하는 도서:', isbn);
            alert('이미 추가된 도서입니다.');
            return;
          }
          
          bookList.push(book);
          localStorage.setItem('myBooks', JSON.stringify(bookList));
          console.log('로컬 스토리지 저장 완료:', bookList.length, '권');
          
          setMyBooks(prev => {
            const newSet = new Set([...prev, isbn]);
            console.log('myBooks 상태 업데이트:', newSet);
            return newSet;
          });
          
        } else {
          // 도서 삭제
          console.log('도서 삭제 시작:', isbn);
          
          const savedBooks = localStorage.getItem('myBooks');
          if (savedBooks) {
            const bookList = JSON.parse(savedBooks);
            const filteredBooks = bookList.filter((book: any) => book.isbn !== isbn);
            localStorage.setItem('myBooks', JSON.stringify(filteredBooks));
            console.log('로컬 스토리지 삭제 완료:', filteredBooks.length, '권');
          }
          
          setMyBooks(prev => {
            const newSet = new Set(prev);
            newSet.delete(isbn);
            console.log('myBooks 상태 업데이트:', newSet);
            return newSet;
          });
        }
      } catch (error) {
        console.error('도서 처리 실패:', error);
        alert('도서 처리에 실패했습니다.');
      } finally {
        setProcessingBooks(prev => {
          const newSet = new Set(prev);
          newSet.delete(isbn);
          return newSet;
        });
      }
    }, 100);
  };

  if (loading) {
    return (
      <Container maxWidth="xl" className="book-search">
        <div className="book-search__loading" role="status" aria-live="polite">
          <Loading size="lg" text="도서를 검색하는 중..." />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" className="book-search">
        <div className="book-search__error" role="alert" aria-live="assertive">
          <p className="book-search__error-message">{error}</p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            다시 시도
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" className="book-search">
      <header className="book-search__header">
        <h1 className="book-search__title">도서 검색</h1>
        <p className="book-search__subtitle">원하는 도서를 검색하고 내 도서에 추가하세요</p>
      </header>

      <div style={{ marginBottom: 'var(--spacing-6)' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: 'var(--spacing-3)', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ flex: 1 }}>
            <Input
              placeholder="도서명, 저자명으로 검색하세요"
              value={searchQuery}
              onChange={(value) => setSearchQuery(value)}
            />
          </div>
          <Button type="submit" variant="primary">
            검색
          </Button>
        </form>
      </div>

      {myBooks.size > 0 && (
        <div style={{
          marginBottom: 'var(--spacing-4)',
          padding: 'var(--spacing-4)',
          backgroundColor: 'var(--color-primary-50)',
          borderRadius: 'var(--radius-base)',
          textAlign: 'center'
        }}>
          <span>내 도서에 {myBooks.size}권이 추가되어 있습니다.</span>
        </div>
      )}

      {books.length === 0 ? (
        <div className="book-search__empty" role="status">
          <p>검색 결과가 없습니다.</p>
        </div>
      ) : (
        <>
          <section aria-label="도서 검색 결과" className="book-search__grid">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--spacing-4)' }}>
              {books.map((book, index) => (
                <Card key={book.isbn || index} hoverable>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                        <input
                          type="checkbox"
                          id={`book-${book.isbn || index}`}
                          checked={myBooks.has(book.isbn)}
                          onChange={(e) => {
                            console.log('네이티브 체크박스 클릭:', e.target.checked);
                            handleBookToggle(book, e.target.checked);
                          }}
                          disabled={processingBooks.has(book.isbn)}
                          style={{ 
                            width: '16px', 
                            height: '16px',
                            cursor: processingBooks.has(book.isbn) ? 'not-allowed' : 'pointer'
                          }}
                        />
                        <span style={{ fontSize: 'var(--font-size-sm)' }}>
                          {myBooks.has(book.isbn) ? '내 도서에 추가됨' : '내 도서에 추가'}
                        </span>
                      </label>
                      {processingBooks.has(book.isbn) && (
                        <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
                          처리 중...
                        </div>
                      )}
                    </div>

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
                          margin: 'var(--spacing-2) 0 0',
                          fontSize: 'var(--font-size-lg)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: 'var(--color-primary-500)'
                        }}>
                          {Number(book.discount).toLocaleString()}원
                        </p>
                      )}
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
              onPageChange={(newPage) => goToPage(newPage - 1)}
              showInfo={false}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default BookSearch;
