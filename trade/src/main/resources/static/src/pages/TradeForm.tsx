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
      setError('?„ìˆ˜ ??ª©??ëª¨ë‘ ?…ë ¥?´ì£¼?¸ìš”.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createTrade({ buyerId, sellerId, postId, meetUpLocation });
      alert('ê±°ë˜ê°€ ?±ê³µ?ìœ¼ë¡??±ë¡?˜ì—ˆ?µë‹ˆ??');
      navigate('/');
    } catch (err) {
      console.error('ê±°ë˜ ?±ë¡ ?¤íŒ¨:', err);
      setError('ê±°ë˜ ?±ë¡???¤íŒ¨?ˆìŠµ?ˆë‹¤. ?¤ì‹œ ?œë„?´ì£¼?¸ìš”.');
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
          ëª©ë¡?¼ë¡œ
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
          ??ê±°ë˜ ?±ë¡
        </h1>
        <p style={{ 
          margin: 'var(--spacing-2) 0 0', 
          color: 'var(--text-secondary)',
          fontSize: 'var(--font-size-base)'
        }}>
          ê±°ë˜ ?•ë³´ë¥??…ë ¥?˜ì—¬ ?ˆë¡œ??ê±°ë˜ë¥??±ë¡?˜ì„¸??
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
              label="êµ¬ë§¤??ID"
              placeholder="êµ¬ë§¤??IDë¥??…ë ¥?˜ì„¸??
              value={buyerId}
              onChange={(value) => setBuyerId(value)}
              required
              disabled={loading}
            />

            <Input
              label="?ë§¤??ID"
              placeholder="?ë§¤??IDë¥??…ë ¥?˜ì„¸??
              value={sellerId}
              onChange={(value) => setSellerId(value)}
              required
              disabled={loading}
            />

            <Input
              label="ê²Œì‹œê¸€ ID"
              placeholder="ê±°ë˜??ê²Œì‹œê¸€ IDë¥??…ë ¥?˜ì„¸??
              value={postId}
              onChange={(value) => setPostId(value)}
              required
              disabled={loading}
            />

            <Input
              label="ë§Œë‚¨ ?¥ì†Œ (? íƒ?¬í•­)"
              placeholder="ê±°ë˜ ?¥ì†Œë¥??…ë ¥?˜ì„¸??(?? ê°•ë‚¨??2ë²?ì¶œêµ¬)"
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
              ì·¨ì†Œ
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? '?±ë¡ ì¤?..' : 'ê±°ë˜ ?±ë¡'}
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
            <Loading size="md" text="ê±°ë˜ë¥??±ë¡?˜ëŠ” ì¤?.." />
          </div>
        )}
      </Card>
    </Container>

  );
};

export default TradeForm; 