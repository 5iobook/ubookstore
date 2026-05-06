import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Input, Card } from '@bookstore/common-ui';
import '../App.css';

const BookForm: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // 검색어를 URL 파라미터로 전달하여 목록 페이지로 이동
      navigate(`/?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <Container maxWidth="xl" style={{ paddingTop: 'var(--spacing-6)', paddingBottom: 'var(--spacing-8)' }}>
      <header style={{ marginBottom: 'var(--spacing-6)', textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: 'var(--font-size-3xl)', 
          fontWeight: 'var(--font-weight-bold)', 
          color: 'var(--color-neutral-900)', 
          margin: '0 0 var(--spacing-2) 0' 
        }}>
          도서 검색
        </h1>
        <p style={{ 
          fontSize: 'var(--font-size-base)', 
          color: 'var(--color-neutral-600)', 
          margin: 0 
        }}>
          Naver Book Search API를 사용하여 도서를 검색합니다.
        </p>
      </header>

      <Card style={{ maxWidth: '600px', margin: '0 auto var(--spacing-6) auto' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
          <Input
            label="검색어"
            type="text"
            value={query}
            onChange={setQuery}
            placeholder="책 제목, 저자, 출판사 등을 입력하세요"
            required
          />
          <Button type="submit" variant="primary" disabled={!query.trim()}>
            검색
          </Button>
        </form>
      </Card>

      <Card style={{ 
        backgroundColor: 'var(--color-primary-50)', 
        borderColor: 'var(--color-primary-200)',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h3 style={{ 
          marginTop: 0, 
          color: 'var(--color-primary-700)',
          fontSize: 'var(--font-size-lg)',
          fontWeight: 'var(--font-weight-semibold)'
        }}>
          💡 검색 팁
        </h3>
        <ul style={{ 
          lineHeight: '1.8', 
          color: 'var(--text-secondary)',
          paddingLeft: 'var(--spacing-5)',
          margin: 0
        }}>
          <li>책 제목, 저자명, 출판사명으로 검색할 수 있습니다</li>
          <li>여러 단어를 입력하면 AND 검색이 됩니다</li>
          <li>예: "스프링 부트", "이펙티브 자바", "마틴 파울러" 등</li>
        </ul>
      </Card>
    </Container>
  );
};

export default BookForm;
