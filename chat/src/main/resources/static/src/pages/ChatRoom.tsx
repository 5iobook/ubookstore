import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Loading } from '@bookstore/common-ui';
import { fetchChatRoomDetail, type ChatRoom as ChatRoomType } from '../api/chatApi';

function ChatRoom() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [chatRoom, setChatRoom] = useState<ChatRoomType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadChatRoom();
    }
  }, [id]);

  async function loadChatRoom() {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchChatRoomDetail(id);
      setChatRoom(data);
    } catch (err) {
      console.error('채팅방 상세 조회 실패:', err);
      setError('채팅방 정보를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Container maxWidth="md">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <Loading size="lg" text="채팅방을 불러오는 중..." />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', gap: 'var(--spacing-4)' }}>
          <p style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-lg)' }}>{error}</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            목록으로
          </Button>
        </div>
      </Container>
    );
  }

  if (!chatRoom) {
    return (
      <Container maxWidth="md">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', gap: 'var(--spacing-4)' }}>
          <p>채팅방을 찾을 수 없습니다.</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            목록으로
          </Button>
        </div>
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
            채팅방
          </h1>
        </header>

        <div style={{ display: 'grid', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-6)' }}>
          <div>
            <strong style={{ color: 'var(--text-primary)' }}>채팅방 ID:</strong>
            <div style={{ marginTop: 'var(--spacing-1)' }}>{chatRoom.roomId}</div>
          </div>
          <div>
            <strong style={{ color: 'var(--text-primary)' }}>방장:</strong>
            <div style={{ marginTop: 'var(--spacing-1)' }}>{chatRoom.owner}</div>
          </div>
          <div>
            <strong style={{ color: 'var(--text-primary)' }}>생성일:</strong>
            <div style={{ marginTop: 'var(--spacing-1)' }}>{new Date(chatRoom.createdAt).toLocaleString()}</div>
          </div>
        </div>
        
        <div style={{ 
          padding: 'var(--spacing-6)', 
          backgroundColor: 'var(--background-secondary)', 
          borderRadius: 'var(--radius-base)', 
          minHeight: '300px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 var(--spacing-4)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)' }}>
            채팅 메시지
          </h3>
          <p style={{ color: 'var(--text-secondary)', margin: '0 0 var(--spacing-2)' }}>
            WebSocket 채팅 기능은 추후 구현 예정입니다.
          </p>
          <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
            현재는 채팅방 생성 및 목록 조회 기능만 사용 가능합니다.
          </p>
        </div>
      </Card>
    </Container>
  );
}

export default ChatRoom;
