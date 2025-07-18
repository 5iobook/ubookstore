import React, { useEffect, useState } from 'react';
import { fetchTradeListPage } from '../api/tradeApi';
import { Link, useSearchParams } from 'react-router-dom';
import '../App.css';

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
    setLoading(true);
    fetchTradeListPage(page, PAGE_SIZE)
      .then(res => {
        setTrades(res.trades);
        setTotalPages(res.totalPages);
      })
      .catch(() => setError('거래 목록을 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [page]);

  const goToPage = (p: number) => {
    setSearchParams({ page: String(p) });
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>거래 목록</h2>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>상태</th>
            <th>방법</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          {trades.map(trade => (
            <tr key={trade.id}>
              <td>
                <Link to={`/trade/${trade.id}${window.location.search}`}>{trade.id}</Link>
              </td>
              <td>{TRADE_STATUS_MAP[trade.status] ?? trade.status}</td>
              <td>{TRADE_METHOD_MAP[trade.method] ?? trade.method}</td>
              <td>{trade.completedAt || '-'}</td>
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

export default TradeList; 