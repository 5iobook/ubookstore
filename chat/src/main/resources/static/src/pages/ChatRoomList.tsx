import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMyChatRooms, getOrCreateDirectChat, type ChatRoom } from '../api/chatApi';

function ChatRoomList() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId] = useState('user1'); // 임시 사용자 ID
  const [targetUserId, setTargetUserId] = useState('');

  useEffect(() => {
    loadChatRooms();
  }, []);

  async function loadChatRooms() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMyChatRooms(currentUserId);
      setChatRooms(data);
    } catch (err) {
      console.error('채팅방 목록 조회 실패:', err);
      setError('채팅방 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateDirectChat() {
    if (!targetUserId.trim()) {
      alert('상대방 ID를 입력해주세요.');
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const chatRoom = await getOrCreateDirectChat(currentUserId, targetUserId);
      alert(`채팅방이 생성되었습니다: ${chatRoom.roomId}`);
      setTargetUserId('');
      loadChatRooms(); // 목록 새로고침
    } catch (err) {
      console.error('채팅방 생성 실패:', err);
      setError('채팅방 생성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>내 채팅방 목록</h2>
      
      <div style={{ marginBottom: 20, padding: 20, background: '#f5f5f5', borderRadius: 8 }}>
        <h3>새 채팅 시작</h3>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <input
            type="text"
            placeholder="상대방 ID 입력"
            value={targetUserId}
            onChange={(e) => setTargetUserId(e.target.value)}
            style={{ flex: 1, padding: 8 }}
          />
          <button onClick={handleCreateDirectChat} disabled={loading}>
            채팅 시작
          </button>
        </div>
        <p style={{ fontSize: '0.9em', color: '#666', marginTop: 10 }}>
          현재 사용자: {currentUserId}
        </p>
      </div>

      {loading && <p>로딩 중...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <>
          {chatRooms.length === 0 ? (
            <p>참여 중인 채팅방이 없습니다.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>채팅방 ID</th>
                  <th>방장</th>
                  <th>생성일</th>
                  <th>액션</th>
                </tr>
              </thead>
              <tbody>
                {chatRooms.map((room) => (
                  <tr key={room.roomId}>
                    <td>{room.roomId.substring(0, 8)}...</td>
                    <td>{room.owner}</td>
                    <td>{new Date(room.createdAt).toLocaleString()}</td>
                    <td>
                      <Link to={`/chat/${room.roomId}`}>
                        <button>입장</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}

export default ChatRoomList;
