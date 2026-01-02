import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Container, Button, Card, Loading } from '@bookstore/common-ui';

import { fetchAlertDetail, markAlertAsRead, type Alert } from '../api/alertApi';
import './AlertDetail.css';

function AlertDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [alertData, setAlertData] = useState<Alert | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadAlert();
    }
  }, [id]);

  async function loadAlert() {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAlertDetail(Number(id));
      setAlertData(data);
    } catch (err) {
      console.error('?Œë¦¼ ?ì„¸ ì¡°íšŒ ?¤íŒ¨:', err);
      setError('?Œë¦¼ ?•ë³´ë¥?ë¶ˆëŸ¬?¤ëŠ”???¤íŒ¨?ˆìŠµ?ˆë‹¤.');
    } finally {
      setLoading(false);
    }
  }

  async function handleMarkAsRead() {
    if (!id || !alertData) return;
    setLoading(true);
    setError(null);
    try {
      const updatedAlert = await markAlertAsRead(Number(id));
      setAlertData(updatedAlert);
      window.alert('?Œë¦¼???½ìŒ ì²˜ë¦¬?ˆìŠµ?ˆë‹¤.');
    } catch (err) {
      console.error('?Œë¦¼ ?½ìŒ ì²˜ë¦¬ ?¤íŒ¨:', err);
      setError('?Œë¦¼ ?½ìŒ ì²˜ë¦¬???¤íŒ¨?ˆìŠµ?ˆë‹¤.');
    } finally {
      setLoading(false);
    }
  }

  if (loading && !alertData) {

    return (
      <Container maxWidth="xl" className="alert-detail">
        <div className="alert-detail__loading" role="status" aria-live="polite">
          <Loading size="lg" text="?Œë¦¼ ?•ë³´ë¥?ë¶ˆëŸ¬?¤ëŠ” ì¤?.." />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" className="alert-detail">
        <div className="alert-detail__error" role="alert" aria-live="assertive">
          <p className="alert-detail__error-message">{error}</p>
          <Button onClick={() => navigate('/')} variant="primary">
            ëª©ë¡?¼ë¡œ ?Œì•„ê°€ê¸?
          </Button>
        </div>
      </Container>
    );
  }

  if (!alertData) {
    return (
      <Container maxWidth="xl" className="alert-detail">
        <div className="alert-detail__empty" role="status">
          <p>?Œë¦¼??ì°¾ì„ ???†ìŠµ?ˆë‹¤.</p>
          <Button onClick={() => navigate('/')} variant="primary">
            ëª©ë¡?¼ë¡œ ?Œì•„ê°€ê¸?
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" className="alert-detail">
      <header className="alert-detail__header">
        <h1 className="alert-detail__title">?Œë¦¼ ?ì„¸</h1>
      </header>
      
      <Card className="alert-detail__content">
        <div className="alert-detail__fields">
          <div className="alert-detail__field">
            <span className="alert-detail__field-label">ID:</span>
            <span className="alert-detail__field-value">{alertData.id}</span>
          </div>
          
          <div className="alert-detail__field">
            <span className="alert-detail__field-label">?¬ìš©??ID:</span>
            <span className="alert-detail__field-value">{alertData.userId}</span>
          </div>
          
          <div className="alert-detail__field">
            <span className="alert-detail__field-label">ë©”ì‹œì§€:</span>
            <span className="alert-detail__field-value alert-detail__message">
              {alertData.message}
            </span>
          </div>
          
          <div className="alert-detail__field">
            <span className="alert-detail__field-label">?€??</span>
            <span className={`alert-type-badge alert-type-${alertData.type.toLowerCase()}`}>
              {alertData.type}
            </span>
          </div>
          
          <div className="alert-detail__field">
            <span className="alert-detail__field-label">?½ìŒ ?¬ë?:</span>
            <span className={`alert-read-status ${alertData.isRead ? 'read' : 'unread'}`}>
              {alertData.isRead ? '???½ìŒ' : '???ˆì½??}
            </span>
          </div>
          
          <div className="alert-detail__field">
            <span className="alert-detail__field-label">?ì„±??</span>
            <span className="alert-detail__field-value">
              {new Date(alertData.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
        
        <div className="alert-detail__actions">

          {!alertData.isRead && (
            <Button 
              onClick={handleMarkAsRead} 
              disabled={loading}
              variant="primary"
            >
              ?½ìŒ ì²˜ë¦¬
            </Button>
          )}
          <Button 
            onClick={() => navigate('/')}

            variant="ghost"
            size="sm"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            }
          >
            ëª©ë¡?¼ë¡œ
          </Button>
        </div>
      </Card>
    </Container>

  );
}

export default AlertDetail;
