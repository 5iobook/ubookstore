import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAlertDetail, markAlertAsRead, type Alert } from '../api/alertApi';

function AlertDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [alert, setAlert] = useState<Alert | null>(null);
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
      setAlert(data);
    } catch (err) {
      console.error('알림 상세 조회 실패:', err);
      setError('알림 정보를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  async function handleMarkAsRead() {
    if (!id || !alert) return;
    setLoading(true);
    setError(null);
    try {
      const updatedAlert = await markAlertAsRead(Number(id));
      setAlert(updatedAlert);
      alert('알림을 읽음 처리했습니다.');
    } catch (err) {
      console.error('알림 읽음 처리 실패:', err);
      setError('알림 읽음 처리에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!alert) return <p>알림을 찾을 수 없습니다.</p>;

  return (
    <div>
      <h2>알림 상세</h2>
      <div style={{ textAlign: 'left', maxWidth: 600, margin: '0 auto' }}>
        <p><strong>ID:</strong> {alert.id}</p>
        <p><strong>사용자 ID:</strong> {alert.userId}</p>
        <p><strong>메시지:</strong> {alert.message}</p>
        <p><strong>타입:</strong> {alert.type}</p>
        <p><strong>읽음 여부:</strong> {alert.isRead ? '읽음' : '안읽음'}</p>
        <p><strong>생성일:</strong> {new Date(alert.createdAt).toLocaleString()}</p>
        
        <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
          {!alert.isRead && (
            <button onClick={handleMarkAsRead} disabled={loading}>
              읽음 처리
            </button>
          )}
          <button onClick={() => navigate('/')}>
            목록으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlertDetail;
