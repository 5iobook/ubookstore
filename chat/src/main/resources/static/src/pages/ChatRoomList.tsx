import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Input, Button, Loading, Pagination } from '@bookstore/common-ui';
import { fetchMyChatRooms, getOrCreateDirectChat, type ChatRoom } from '../api/chatApi';

function ChatRoomList() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId] = useState('user1');
  const [targetUserId, setTargetUserId] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const size = 10;

  useEffect(() => {
    loadChatRooms();
  }, [page]);

  async function loadChatRooms() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMyChatRooms(currentUserId);
      // 페이징 시뮬레이션 (실제로는 API에서 페이징된 데이터를 받아야 함)
      const startIndex = page * size;
      const endIndex = startIndex + size;
      const paginatedRooms = data.slice(startIndex, endIndex);
      setChatRooms(paginatedRooms);
      setTotalPages(Math.ceil(data.length / size));
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
      setPage(0);
      loadChatRooms();
    } catch (err) {
      console.error('채팅방 생성 실패:', err);
      setError('채팅방 생성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loading />;

  return (
    <Container>
      <h2>내 채팅방 목록</h2>
      
      <Card style={{ marginBottom: '2rem' }}>
        <h3>새 채팅 시작</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', marginTop: '1rem' }}>
          <Input
            label="상대방 ID"
            placeholder="상대방 ID 입력"
            value={targetUserId}
            onChange={(e) => setTargetUserId(e.target.value)}
          />
          <Button onClick={handleCreateDirectChat} disabled={loading}>
            채팅 시작
          </Button>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginTop: '1rem' }}>
          현재 사용자: {currentUserId}
        </p>
      </Card>

      {error && <div style={{ color: 'var(--color-error)', marginBottom: '1rem' }}>{error}</div>}
      
      {chatRooms.length === 0 ? (
        <Card>
          <p>참여 중인 채팅방이 없습니다.</p>
        </Card>
      ) : (
        <>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {chatRooms.map((room) => (
              <Card key={room.roomId} style={{ cursor: 'pointer' }} onClick={() => navigate(`/chat/${room.roomId}`)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: 0 }}>채팅방 ID: {room.roomId.substring(0, 8)}...</h4>
                    <p style={{ margin: '0.5rem 0 0', color: 'var(--color-text-secondary)' }}>
                      방장: {room.owner} | 생성일: {new Date(room.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <Button size="small">입장</Button>
                </div>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={page + 1}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage - 1)}
              showInfo={false}
            />
          )}
        </>
      )}
    </Container>
  );
}

export default ChatRoomList;
