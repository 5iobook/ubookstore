import React, { useEffect, useState } from 'react';
import { fetchTradeListPage } from '../api/tradeApi';
import { Link, useSearchParams } from 'react-router-dom';
import { Container, Button, Loading, Pagination } from '@bookstore/common-ui';
import '../App.css';
import './TradeList.css';

const PAGE_SIZE = 10;

// TradeStatus, TradeMethod 한글 매핑
const TRADE_STATUS_MAP: Record<string, string> = {
  REQUESTED: '요청됨',
  ACCEPTED: '수락됨',
  IN_PROGRESS: '진행중',
  COMPLETED: '완료됨',
  CANCELED: '취소됨',
};
const TRADE_METHOD_MAP: Record<string, string> = {
  DIRECT: '직거래',
  DELIVERY: '택배거래',
};

const TradeList: React.FC = () => {
  const [trades, setTrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 0;

  useEffect(() => {
    loadTrades();
  }, [page]);

  async function loadTrades() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchTradeListPage(page, PAGE_SIZE);
      setTrades(res.trades);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error('거래 목록 조회 실패:', err);
      setError('거래 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  const goToPage = (p: number) => {
    setSearchParams({ page: String(p) });
  };

  return (
    <Container maxWidth="xl" className="trade-list">
      <header className="trade-list__header">
        <h1 className="trade-list__title">거래 목록</h1>
        <p className="trade-list__subtitle" aria-live="polite">
          총 {totalPages > 0 ? (totalPages - 1) * PAGE_SIZE + trades.length : 0}건의 거래
        </p>
      </header>

      {loading && (
        <div className="trade-list__loading" role="status" aria-live="polite">
          <Loading size="lg" text="거래 목록을 불러오는 중..." />
        </div>
      )}

      {error && (
        <div className="trade-list__error" role="alert" aria-live="assertive">
          <p className="trade-list__error-message">{error}</p>
          <Button variant="primary" onClick={loadTrades}>
            다시 시도
          </Button>
        </div>
      )}

      {!loading && !error && trades.length === 0 && (
        <div className="trade-list__empty" role="status">
          <p>등록된 거래가 없습니다.</p>
        </div>
      )}

      {!loading && !error && trades.length > 0 && (
        <>
          <section aria-label="거래 목록 테이블" className="trade-list__table">
            <table>
              <thead>
                <tr>
                  <th>거래 ID</th>
                  <th>상태</th>
                  <th>거래 방법</th>
                  <th>완료일</th>
                </tr>
              </thead>
              <tbody>
                {trades.map(trade => (
                  <tr key={trade.id}>
                    <td>
                      <Link to={`/trade/${trade.id}${window.location.search}`} className="trade-link">
                        {trade.id.substring(0, 8)}...
                      </Link>
                    </td>
                    <td>
                      <span className={`status-badge status-${trade.status.toLowerCase()}`}>
                        {TRADE_STATUS_MAP[trade.status] ?? trade.status}
                      </span>
                    </td>
                    <td>{TRADE_METHOD_MAP[trade.method] ?? trade.method}</td>
                    <td>{trade.completedAt || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <Pagination
            currentPage={page + 1}
            totalPages={totalPages}
            totalItems={totalPages > 0 ? (totalPages - 1) * PAGE_SIZE + trades.length : 0}
            itemsPerPage={PAGE_SIZE}
            onPageChange={(newPage) => goToPage(newPage - 1)}
            showInfo={true}
          />
        </>
      )}
    </Container>
  );
};

export default TradeList; 