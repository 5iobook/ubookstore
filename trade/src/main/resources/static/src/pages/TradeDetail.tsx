import React, { useEffect, useState } from 'react';
import { fetchTradeDetail } from '../api/tradeApi';
import { useParams } from 'react-router-dom';

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

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!trade) return <div>거래 정보가 없습니다.</div>;

  return (
    <div>
      <button onClick={() => window.history.back()} style={{marginBottom: 16, padding: '6px 16px', borderRadius: 4, border: '1px solid #1976d2', background: '#1976d2', color: '#fff', cursor: 'pointer'}}>← 뒤로 가기</button>
      <h2>거래 상세</h2>
      <p><strong>id:</strong> {trade.id}</p>
      <p><strong>상태:</strong> {TRADE_STATUS_MAP[trade.status] ?? trade.status}</p>
      <p><strong>방법:</strong> {TRADE_METHOD_MAP[trade.method] ?? trade.method}</p>
      <p><strong>만남 장소:</strong> {trade.meetUpLocation || '-'}</p>
      <p><strong>취소 사유:</strong> {trade.cancelReason || '-'}</p>
      <p><strong>완료일:</strong> {trade.completedAt || '-'}</p>
    </div>
  );
};

export default TradeDetail; 