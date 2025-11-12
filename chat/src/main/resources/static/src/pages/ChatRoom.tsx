import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchChatRoomDetail, ChatRoom as ChatRoomType } from '../api/chatApi';

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

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!chatRoom) return <p>채팅방을 찾을 수 없습니다.</p>;

  return (
    <div>
      <h2>채팅방: {chatRoom.name}</h2>
      <div style={{ textAlign: 'left', maxWidth: 600, margin: '0 auto' }}>
        <p><strong>채팅방 ID:</strong> {chatRoom.id}</p>
        <p><strong>채팅방 이름:</strong> {chatRoom.name}</p>
        <p><strong>참여자:</strong></p>
        <ul>
          {chatRoom.participants.map((participant, index) => (
            <li key={index}>{participant}</li>
          ))}
        </ul>
        <p><strong>생성일:</strong> {new Date(chatRoom.createdAt).toLocaleString()}</p>
        <div style={{ marginTop: 30, padding: 20, background: '#f5f5f5', borderRadius: 8 }}>
          <p style={{ color: '#666' }}>채팅 기능은 추후 구현 예정입니다.</p>
        </div>
        <button onClick={() => navigate('/')} style={{ marginTop: 20 }}>
          목록으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default ChatRoom;
