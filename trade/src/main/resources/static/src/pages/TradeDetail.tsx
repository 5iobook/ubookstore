import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Loading } from '@bookstore/common-ui';
import { fetchTradeDetail } from '../api/tradeApi';

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

const TradeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trade, setTrade] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchTradeDetail(id)
      .then(setTrade)
      .catch(() => setError('거래 상세 정보를 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="md">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <Loading size="lg" text="거래 정보를 불러오는 중..." />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Card>
          <div style={{ textAlign: 'center', padding: 'var(--spacing-6)' }}>
            <p style={{ color: 'var(--color-error)', marginBottom: 'var(--spacing-4)' }}>{error}</p>
            <Button variant="primary" onClick={() => navigate('/')}>
              목록으로 돌아가기
            </Button>
          </div>
        </Card>
      </Container>
    );
  }

  if (!trade) {
    return (
      <Container maxWidth="md">
        <Card>
          <div style={{ textAlign: 'center', padding: 'var(--spacing-6)' }}>
            <p style={{ marginBottom: 'var(--spacing-4)' }}>거래 정보가 없습니다.</p>
            <Button variant="primary" onClick={() => navigate('/')}>
              목록으로 돌아가기
            </Button>
          </div>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <div style={{ marginBottom: 'var(--spacing-4)' }}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          }
        >
          목록으로
        </Button>
      </div>

      <Card>
        <header style={{ marginBottom: 'var(--spacing-6)' }}>
          <h1 style={{ margin: 0, fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)' }}>
            거래 상세 정보
          </h1>
        </header>

        <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-3)', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-base)' }}>
            <span style={{ fontWeight: 'var(--font-weight-medium)' }}>거래 ID</span>
            <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: 'var(--font-size-sm)' }}>
              {trade.id}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-3)', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-base)' }}>
            <span style={{ fontWeight: 'var(--font-weight-medium)' }}>상태</span>
            <span className={`status-badge status-${trade.status.toLowerCase()}`}>
              {TRADE_STATUS_MAP[trade.status] ?? trade.status}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-3)', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-base)' }}>
            <span style={{ fontWeight: 'var(--font-weight-medium)' }}>거래 방법</span>
            <span>{TRADE_METHOD_MAP[trade.method] ?? trade.method}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-3)', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-base)' }}>
            <span style={{ fontWeight: 'var(--font-weight-medium)' }}>만남 장소</span>
            <span>{trade.meetUpLocation || '미정'}</span>
          </div>

          {trade.cancelReason && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-3)', backgroundColor: 'var(--color-error-50)', borderRadius: 'var(--radius-base)', border: '1px solid var(--color-error-200)' }}>
              <span style={{ fontWeight: 'var(--font-weight-medium)', color: 'var(--color-error-700)' }}>취소 사유</span>
              <span style={{ color: 'var(--color-error-700)' }}>{trade.cancelReason}</span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-3)', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-base)' }}>
            <span style={{ fontWeight: 'var(--font-weight-medium)' }}>완료일</span>
            <span>{trade.completedAt ? new Date(trade.completedAt).toLocaleString() : '미완료'}</span>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default TradeDetail; 