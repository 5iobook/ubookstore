import React, { useEffect, useState } from 'react';
import { Container, Button, Loading, Pagination } from '@bookstore/common-ui';
import './MyTrades.css';

const myMockTrades = [
  { id: 1, title: '자바의 정석', price: 12000, status: 'SELLING', createdAt: '2024-06-01' },
  { id: 3, title: '영어 회화책', price: 9000, status: 'SELLING', createdAt: '2024-05-30' },
  { id: 4, title: '리액트 완벽 가이드', price: 15000, status: 'COMPLETED', createdAt: '2024-05-28' },
  { id: 5, title: '파이썬 기초', price: 8000, status: 'CANCELED', createdAt: '2024-05-25' },
];

const TRADE_STATUS_MAP: Record<string, string> = {
  SELLING: '판매중',
  COMPLETED: '완료됨',
  CANCELED: '취소됨',
  RESERVED: '예약중',
};

const MyTrades: React.FC = () => {
  const [trades, setTrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadMyTrades();
  }, [page]);

  async function loadMyTrades() {
    setLoading(true);
    setError(null);
    try {
      // 실제 API 호출 대신 mock 데이터 사용
      await new Promise(resolve => setTimeout(resolve, 500)); // 로딩 시뮬레이션
      setTrades(myMockTrades);
      setTotalPages(1);
    } catch (err) {
      console.error('내 거래 목록 조회 실패:', err);
      setError('내 거래 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="xl" className="my-trades">
      <header className="my-trades__header">
        <h1 className="my-trades__title">내 거래 목록</h1>
        <p className="my-trades__subtitle" aria-live="polite">
          총 {trades.length}건의 거래
        </p>
      </header>

      {loading && (
        <div className="my-trades__loading" role="status" aria-live="polite">
          <Loading size="lg" text="내 거래 목록을 불러오는 중..." />
        </div>
      )}

      {error && (
        <div className="my-trades__error" role="alert" aria-live="assertive">
          <p className="my-trades__error-message">{error}</p>
          <Button variant="primary" onClick={loadMyTrades}>
            다시 시도
          </Button>
        </div>
      )}

      {!loading && !error && trades.length === 0 && (
        <div className="my-trades__empty" role="status">
          <p>등록된 거래가 없습니다.</p>
        </div>
      )}

      {!loading && !error && trades.length > 0 && (
        <>
          <section aria-label="내 거래 목록 테이블" className="my-trades__table">
            <table>
              <thead>
                <tr>
                  <th>제목</th>
                  <th>가격</th>
                  <th>상태</th>
                  <th>등록일</th>
                </tr>
              </thead>
              <tbody>
                {trades.map(trade => (
                  <tr key={trade.id}>
                    <td className="trade-title">{trade.title}</td>
                    <td className="trade-price">{trade.price.toLocaleString()}원</td>
                    <td>
                      <span className={`status-badge status-${trade.status.toLowerCase()}`}>
                        {TRADE_STATUS_MAP[trade.status] ?? trade.status}
                      </span>
                    </td>
                    <td>{trade.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default MyTrades; 