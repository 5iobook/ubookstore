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
      // ?˜ì´ì§??œë??ˆì´??(?¤ì œë¡œëŠ” API?ì„œ ?˜ì´ì§•ëœ ?°ì´?°ë? ë°›ì•„????
      const startIndex = page * size;
      const endIndex = startIndex + size;
      const paginatedRooms = data.slice(startIndex, endIndex);
      setChatRooms(paginatedRooms);
      setTotalPages(Math.ceil(data.length / size));
    } catch (err) {
      console.error('ì±„íŒ…ë°?ëª©ë¡ ì¡°íšŒ ?¤íŒ¨:', err);
      setError('ì±„íŒ…ë°?ëª©ë¡??ë¶ˆëŸ¬?¤ëŠ”???¤íŒ¨?ˆìŠµ?ˆë‹¤.');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateDirectChat() {
    if (!targetUserId.trim()) {
      alert('?ë?ë°?IDë¥??…ë ¥?´ì£¼?¸ìš”.');
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const chatRoom = await getOrCreateDirectChat(currentUserId, targetUserId);
      alert(`ì±„íŒ…ë°©ì´ ?ì„±?˜ì—ˆ?µë‹ˆ?? ${chatRoom.roomId}`);
      setTargetUserId('');

      setPage(0);

      loadChatRooms();
    } catch (err) {
      console.error('ì±„íŒ…ë°??ì„± ?¤íŒ¨:', err);
      setError('ì±„íŒ…ë°??ì„±???¤íŒ¨?ˆìŠµ?ˆë‹¤.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loading />;

  return (
    <Container>
      <h2>??ì±„íŒ…ë°?ëª©ë¡</h2>
      
      <Card style={{ marginBottom: '2rem' }}>
        <h3>??ì±„íŒ… ?œì‘</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', marginTop: '1rem' }}>
          <Input
            label="?ë?ë°?ID"
            placeholder="?ë?ë°?ID ?…ë ¥"
            value={targetUserId}
            onChange={(e) => setTargetUserId(e.target.value)}
          />
          <Button onClick={handleCreateDirectChat} disabled={loading}>
            ì±„íŒ… ?œì‘
          </Button>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginTop: '1rem' }}>
          ?„ì¬ ?¬ìš©?? {currentUserId}
        </p>
      </Card>

      {error && <div style={{ color: 'var(--color-error)', marginBottom: '1rem' }}>{error}</div>}
      
      {chatRooms.length === 0 ? (
        <Card>
          <p>ì°¸ì—¬ ì¤‘ì¸ ì±„íŒ…ë°©ì´ ?†ìŠµ?ˆë‹¤.</p>
        </Card>
      ) : (

        <>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {chatRooms.map((room) => (
              <Card key={room.roomId} style={{ cursor: 'pointer' }} onClick={() => navigate(`/chat/${room.roomId}`)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: 0 }}>ì±„íŒ…ë°?ID: {room.roomId.substring(0, 8)}...</h4>
                    <p style={{ margin: '0.5rem 0 0', color: 'var(--color-text-secondary)' }}>
                      ë°©ì¥: {room.owner} | ?ì„±?? {new Date(room.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <Button size="small">?…ì¥</Button>
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
