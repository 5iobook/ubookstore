import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAlertDetail } from '../api/alertApi';

interface Alert {
  id: string;
  userId: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

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
      const data = await fetchAlertDetail(id);
      setAlert(data);
    } catch (err) {
      console.error('알림 상세 조회 실패:', err);
      setError('알림 정보를 불러오는데 실패했습니다.');
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
        
        <button onClick={() => navigate('/')} style={{ marginTop: 20 }}>
          목록으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default AlertDetail;
