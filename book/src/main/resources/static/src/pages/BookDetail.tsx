import React, { useEffect, useState } from 'react';
import { fetchBookDetail } from '../api/bookApi';
import { useParams } from 'react-router-dom';
import { Container, Button, Card, Loading } from '@bookstore/common-ui';

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

  if (loading) {
    return (
      <Container maxWidth="xl" style={{ paddingTop: 'var(--spacing-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <Loading size="lg" text="도서 정보를 불러오는 중..." />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" style={{ paddingTop: 'var(--spacing-6)' }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '400px', 
          gap: 'var(--spacing-4)' 
        }}>
          <p style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-lg)' }}>{error}</p>
          <Button variant="primary" onClick={() => window.history.back()}>
            뒤로 가기
          </Button>
        </div>
      </Container>
    );
  }

  if (!book) {
    return (
      <Container maxWidth="xl" style={{ paddingTop: 'var(--spacing-6)' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '400px' 
        }}>
          <p style={{ color: 'var(--color-neutral-600)', fontSize: 'var(--font-size-lg)' }}>
            도서 정보가 없습니다.
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" style={{ paddingTop: 'var(--spacing-6)', paddingBottom: 'var(--spacing-8)' }}>
      <div style={{ marginBottom: 'var(--spacing-4)' }}>
        <Button 
          onClick={() => window.history.back()} 
          variant="outline" 
          size="sm"
        >
          ← 뒤로 가기
        </Button>
      </div>

      <header style={{ marginBottom: 'var(--spacing-6)', textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: 'var(--font-size-3xl)', 
          fontWeight: 'var(--font-weight-bold)', 
          color: 'var(--color-neutral-900)', 
          margin: 0 
        }}>
          도서 상세
        </h1>
      </header>

      <Card>
        <div style={{ display: 'flex', gap: 'var(--spacing-6)', flexWrap: 'wrap' }}>
          {book.image && (
            <div style={{ flexShrink: 0 }}>
              <img 
                src={book.image} 
                alt={book.title} 
                style={{ 
                  width: '200px', 
                  height: 'auto', 
                  borderRadius: 'var(--radius-base)',
                  boxShadow: 'var(--shadow-sm)'
                }} 
              />
            </div>
          )}
          <div style={{ flex: 1, minWidth: '300px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
              <div>
                <strong style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>제목:</strong>
                <p style={{ 
                  margin: 'var(--spacing-1) 0 0 0', 
                  fontSize: 'var(--font-size-lg)', 
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)'
                }} dangerouslySetInnerHTML={{__html: book.title}} />
              </div>
              
              <div>
                <strong style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>저자:</strong>
                <p style={{ 
                  margin: 'var(--spacing-1) 0 0 0', 
                  color: 'var(--text-primary)'
                }} dangerouslySetInnerHTML={{__html: book.author}} />
              </div>
              
              <div>
                <strong style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>출판사:</strong>
                <p style={{ margin: 'var(--spacing-1) 0 0 0', color: 'var(--text-primary)' }}>{book.publisher}</p>
              </div>
              
              <div>
                <strong style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>출판일:</strong>
                <p style={{ margin: 'var(--spacing-1) 0 0 0', color: 'var(--text-primary)' }}>{book.pubdate}</p>
              </div>
              
              <div>
                <strong style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>ISBN:</strong>
                <p style={{ margin: 'var(--spacing-1) 0 0 0', color: 'var(--text-primary)' }}>{book.isbn}</p>
              </div>
              
              <div>
                <strong style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>정가:</strong>
                <p style={{ 
                  margin: 'var(--spacing-1) 0 0 0', 
                  color: 'var(--color-primary-600)',
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: 'var(--font-weight-semibold)'
                }}>
                  {book.discount ? `${Number(book.discount).toLocaleString()}원` : '-'}
                </p>
              </div>
            </div>
            
            {book.description && (
              <div style={{ marginTop: 'var(--spacing-6)' }}>
                <strong style={{ 
                  color: 'var(--text-secondary)', 
                  fontSize: 'var(--font-size-sm)',
                  display: 'block',
                  marginBottom: 'var(--spacing-2)'
                }}>
                  설명:
                </strong>
                <div 
                  dangerouslySetInnerHTML={{__html: book.description}} 
                  style={{ 
                    lineHeight: '1.6', 
                    color: 'var(--text-primary)',
                    padding: 'var(--spacing-3)',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-base)',
                    borderLeft: `4px solid var(--color-primary-500)`
                  }} 
                />
              </div>
            )}
            
            {book.link && (
              <div style={{ marginTop: 'var(--spacing-6)' }}>
                <Button 
                  as="a" 
                  href={book.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  variant="primary"
                >
                  네이버 도서 페이지 보기 →
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default BookDetail;
