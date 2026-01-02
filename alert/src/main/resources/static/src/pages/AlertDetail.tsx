import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Loading } from '@bookstore/common-ui';
import { fetchAlertDetail, markAlertAsRead, type Alert } from '../api/alertApi';

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
      console.error('알림 상세 조회 실패:', err);
      setError('알림 정보를 불러오는데 실패했습니다.');
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
      window.alert('알림을 읽음 처리했습니다.');
    } catch (err) {
      console.error('알림 읽음 처리 실패:', err);
      setError('알림 읽음 처리에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  if (loading && !alertData) {
    return <Loading size="lg" text="알림 정보를 불러오는 중..." />;
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-container" role="alert">
          {error}
        </div>
        <div style={{ marginTop: '20px' }}>
          <Button onClick={() => navigate('/')} variant="secondary">
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  if (!alertData) {
    return (
      <div className="container">
        <Card>
          <p style={{ textAlign: 'center', color: '#666' }}>알림을 찾을 수 없습니다.</p>
        </Card>
        <div style={{ marginTop: '20px' }}>
          <Button onClick={() => navigate('/')} variant="secondary">
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>알림 상세</h2>
      <Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <strong style={{ display: 'block', marginBottom: '5px', color: '#666' }}>
              ID:
            </strong>
            <span>{alertData.id}</span>
          </div>
          
          <div>
            <strong style={{ display: 'block', marginBottom: '5px', color: '#666' }}>
              사용자 ID:
            </strong>
            <span>{alertData.userId}</span>
          </div>
          
          <div>
            <strong style={{ display: 'block', marginBottom: '5px', color: '#666' }}>
              메시지:
            </strong>
            <span>{alertData.message}</span>
          </div>
          
          <div>
            <strong style={{ display: 'block', marginBottom: '5px', color: '#666' }}>
              타입:
            </strong>
            <span style={{
              padding: '4px 12px',
              borderRadius: '4px',
              fontSize: '14px',
              display: 'inline-block',
              backgroundColor: 
                alertData.type === 'ERROR' ? '#fee' :
                alertData.type === 'WARNING' ? '#ffeaa7' :
                alertData.type === 'SUCCESS' ? '#dfe6e9' :
                '#e3f2fd'
            }}>
              {alertData.type}
            </span>
          </div>
          
          <div>
            <strong style={{ display: 'block', marginBottom: '5px', color: '#666' }}>
              읽음 여부:
            </strong>
            <span style={{
              color: alertData.isRead ? '#27ae60' : '#e74c3c',
              fontWeight: 'bold'
            }}>
              {alertData.isRead ? '✓ 읽음' : '✗ 안읽음'}
            </span>
          </div>
          
          <div>
            <strong style={{ display: 'block', marginBottom: '5px', color: '#666' }}>
              생성일:
            </strong>
            <span>{new Date(alertData.createdAt).toLocaleString()}</span>
          </div>
        </div>
        
        <div style={{ marginTop: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {!alertData.isRead && (
            <Button 
              onClick={handleMarkAsRead} 
              disabled={loading}
              variant="primary"
            >
              읽음 처리
            </Button>
          )}
          <Button 
            onClick={() => navigate('/')}
            variant="secondary"
          >
            목록으로 돌아가기
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default AlertDetail;
