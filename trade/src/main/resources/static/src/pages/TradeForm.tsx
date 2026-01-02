import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Input, Button, Loading } from '@bookstore/common-ui';
import { createTrade } from '../api/tradeApi';

const TradeForm: React.FC = () => {
  const navigate = useNavigate();
  const [buyerId, setBuyerId] = useState('');
  const [sellerId, setSellerId] = useState('');
  const [postId, setPostId] = useState('');
  const [meetUpLocation, setMeetUpLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!buyerId.trim() || !sellerId.trim() || !postId.trim()) {
      setError('필수 항목을 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createTrade({ buyerId, sellerId, postId, meetUpLocation });
      alert('거래가 성공적으로 등록되었습니다!');
      navigate('/');
    } catch (err) {
      console.error('거래 등록 실패:', err);
      setError('거래 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

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

      <header style={{
        marginBottom: 'var(--spacing-6)',
        textAlign: 'center'
      }}>
        <h1 style={{
          margin: 0,
          fontSize: 'var(--font-size-3xl)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--color-neutral-900)'
        }}>
          새 거래 등록
        </h1>
        <p style={{ 
          margin: 'var(--spacing-2) 0 0', 
          color: 'var(--text-secondary)',
          fontSize: 'var(--font-size-base)'
        }}>
          거래 정보를 입력하여 새로운 거래를 등록하세요
        </p>
      </header>

      <Card>
        {error && (
          <div style={{
            padding: 'var(--spacing-3)',
            backgroundColor: 'var(--color-error-50)',
            border: '1px solid var(--color-error-200)',
            borderRadius: 'var(--radius-base)',
            marginBottom: 'var(--spacing-4)',
            color: 'var(--color-error-700)'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
            <Input
              label="구매자 ID"
              placeholder="구매자 ID를 입력하세요"
              value={buyerId}
              onChange={(value) => setBuyerId(value)}
              required
              disabled={loading}
            />

            <Input
              label="판매자 ID"
              placeholder="판매자 ID를 입력하세요"
              value={sellerId}
              onChange={(value) => setSellerId(value)}
              required
              disabled={loading}
            />

            <Input
              label="게시글 ID"
              placeholder="거래할 게시글 ID를 입력하세요"
              value={postId}
              onChange={(value) => setPostId(value)}
              required
              disabled={loading}
            />

            <Input
              label="만남 장소 (선택사항)"
              placeholder="거래 장소를 입력하세요 (예: 강남역 2번 출구)"
              value={meetUpLocation}
              onChange={(value) => setMeetUpLocation(value)}
              disabled={loading}
            />
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 'var(--spacing-3)',
            marginTop: 'var(--spacing-6)',
            paddingTop: 'var(--spacing-4)',
            borderTop: '1px solid var(--border-secondary)'
          }}>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              disabled={loading}
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? '등록 중...' : '거래 등록'}
            </Button>
          </div>
        </form>

        {loading && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 'var(--spacing-4)',
            marginTop: 'var(--spacing-4)'
          }}>
            <Loading size="md" text="거래를 등록하는 중..." />
          </div>
        )}
      </Card>
    </Container>
  );
};

export default TradeForm; 